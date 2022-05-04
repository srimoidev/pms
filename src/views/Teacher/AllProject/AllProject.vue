<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-data-table
      :headers="allProjectHeaders"
      :items="filteredItems"
      :loading="loading"
      :item-class="rowStyle"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> จัดการกลุ่ม </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-10"></v-text-field>
          <v-select
            v-model="typeFilter"
            :items="projectType"
            item-text="ProjectTypeNameTH"
            item-value="ProjectTypeID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width: 1%"
          ></v-select>
          <v-select
            v-model="statusFilter"
            :items="allStatus"
            item-text="ProjectStatusName"
            item-value="ProjectStatusID"
            hide-details
            outlined
            dense
            label="Status"
            style="width: 2%"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn class="primary white--text" @click="showProposalModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เสนอหัวข้อใหม่
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.MaxMember`]="{ item }">
        {{ item.Project_Members.length + " / " + item.MaxMember }}
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class="white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
          {{ item.Project_Type.ProjectTypeNameTH }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_NameTH`]="{ item }">
        {{ `${item.ProjectNameTH} (${item.ProjectNameEN})` }}
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        {{ item.Project_Section.Detail }}
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <project-status :status="item.Project_Status.ProjectStatusID"></project-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="projectModal(item)" size="20"> mdi-open-in-new </v-icon>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.Project_StatusID`]="{ item }">
        <group-status :status="item.Project_StatusID"></group-status>
      </template>
    </v-data-table>
    <template>
      <modal-container :active="proposal_modal" :cancellable="1" @close="hideModal">
        <new-topic
          @close="hideModal"
          @newProject="newProject"
          :teachers="allTeacher"
          :alltype="allType"
          :students="allStudent"
          :createUser="user"
          teacher
        ></new-topic>
      </modal-container>
    </template>
    <template>
      <modal-container :active="detailModal" :cancellable="1">
        <project-modal-detail @close="detailModal = !detailModal" :data="selectedProject"> </project-modal-detail>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import ProjectStatus from "@/components/ProjectStatus";
import NewTopic from "@/components/NewTopic";
import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ProjectModalDetail,
    ModalContainer,
    ProjectStatus,
    NewTopic
  },
  data() {
    return {
      searchText: "",
      loading: true,
      typeFilter: 0,
      proposal_modal: false,
      detailModal: false,
      statusFilter: 0,
      GroupData: [],
      selfGroup: {},
      allType: [],
      projectType: null,
      allStatus: [],
      allProject: [],
      allTeacher: [],
      allStudent: [],
      selectedProject: {},
      windowHeight: 0,
      data: {},
      allProjectHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "ProjectNameTH",
          width: 500
        },
        // { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "Project_Type", sortable: false },
        { text: "สมาชิก", value: "MaxMember", sortable: false },
        // { text: "รายละเอียด", value: "Project_Detail", sortable: false },
        // { text: "ปีการศึกษา", value: "Section" },
        { text: "สถานะ", value: "Project_Status" },
        { text: "Action", value: "actions" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    filteredItems() {
      return this.allProject
        .filter(item => {
          return !this.typeFilter || item.ProjectTypeID == this.typeFilter;
        })
        .filter(item => {
          return !this.statusFilter || item.ProjectStatusID == this.statusFilter;
        });
    }
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    user() {
      this.loadData(); //จับตอน reload
    }
  },
  methods: {
    async loadData() {
      const type = await this.Project.AllType();
      this.allStatus = await this.Project.AllStatus();
      this.allTeacher = await this.User.UserTeacher();
      this.allStudent = await this.User.UserStudent();
      this.projectType = type.slice();
      this.allType = type.slice();
      this.projectType.push({
        ProjectTypeID: 0,
        ProjectTypeNameTH: "ทั้งหมด"
      });
      this.allStatus.push({
        ProjectStatusID: 0,
        ProjectStatusName: "ทั้งหมด"
      });
      this.allProject = await this.Project.GetAll();
      this.loading = false;
    },
    async newProject(project, advisors, members) {
      project.CreatedBy = this.user.UserID;
      project.UpdatedBy = this.user.UserID;
      await this.Project.New(project, advisors, members).then(() => {
        this.loadData();
      });
    },
    async projectModal(pProject) {
      this.selectedProject = pProject;
      await Promise.all(
        this.selectedProject.Project_Members.map(async item => {
          item.ProfileImage = await this.User.ProfileImage(item.UserID);
        })
      )
        .then(async () => {
          await Promise.all(
            this.selectedProject.Project_Advisors.map(async item => {
              item.ProfileImage = await this.User.ProfileImage(item.UserID);
            })
          );
        })
        .then(() => {
          this.detailModal = true;
        });
    },
    hideModal() {
      this.proposal_modal = false;
      this.detailModal = false;
    },
    showProposalModal() {
      // this.getAllTeacher();
      this.proposal_modal = true;
    },
    showJoinGroupModal(Group) {
      this.selectedGroup = Group;
      this.joinGroup_modal = true;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    },
    rowStyle() {
      return "tb-row";
    }
  }
};
</script>
<style scoped>
.tb-row {
  height: calc(100% / 20);
}
</style>
