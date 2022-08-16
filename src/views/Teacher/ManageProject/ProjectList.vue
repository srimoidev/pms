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
          <v-toolbar-title>
            จัดการกลุ่ม
          </v-toolbar-title>
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
            style="width:1%"
          ></v-select>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.ProjectNameTH`]="{ item }">
        <router-link :to="'/teacher/project?pid=' + item.ProjectID" class="text-none">{{
          item.ProjectNameTH + "(" + item.ProjectNameEN + ")"
        }}</router-link>
      </template>
      <template v-slot:[`item.MaxMember`]="{ item }">
        {{ item.Project_Members.length }}
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class=" white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
          {{ item.Project_Type.ProjectTypeNameTH }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        {{ item.Project_Section.Section_Name }}
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <project-status :status="item.Project_Status.ProjectStatusID"></project-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="projectModal(item)" size="20">
              mdi-open-in-new
            </v-icon>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
        <router-link :to="'/teacher/documents?MenuID=105&pid=' + item.ProjectID" class="text-none">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="mr-2" size="20">
                mdi-pencil
              </v-icon>
            </template>
            <span>ตรวจสอบเอกสาร</span>
          </v-tooltip>
        </router-link>
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
import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ProjectModalDetail,
    ModalContainer,
    ProjectStatus
  },
  data() {
    return {
      searchText: "",
      loading: true,
      typeFilter: 0,
      detailModal: false,
      GroupData: [],
      selfGroup: {},
      allType: [],
      projectType: null,
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
        { text: "ประเภท", value: "Project_Type", sortable: false },
        { text: "สมาชิก", value: "MaxMember", sortable: false },
        { text: "ปีการศึกษา", value: "Project_Section" },
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
      return this.allProject.filter(item => {
        return !this.typeFilter || item.Project_TypeID == this.typeFilter;
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
      this.allTeacher = await this.User.UserTeacher();
      this.allStudent = await this.User.UserStudent();
      this.projectType = type.slice();
      this.allType = type.slice();
      this.projectType.push({
        ProjectTypeID: 0,
        ProjectTypeNameTH: "ทั้งหมด"
      });
      this.allProject = await this.Project.GetProjectByAdvisor(this.user.UserID);
      this.loading = false;
    },
    projectModal(pProject) {
      this.selectedProject = pProject;
      this.detailModal = true;
    },
    hideModal() {
      this.proposal_modal = false;
      this.detailModal = false;
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
