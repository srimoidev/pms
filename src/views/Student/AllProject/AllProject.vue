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
            item-text="ProjectType_Name"
            item-value="ProjectType_ID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width:1%"
          ></v-select>
          <v-select
            v-model="statusFilter"
            :items="allStatus"
            item-text="ProjectStatus_Name"
            item-value="ProjectStatus_ID"
            hide-details
            outlined
            dense
            label="Status"
            style="width:2%"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn v-if="!user.User_ProjectID" class="primary white--text" @click="showProposalModal">
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เสนอหัวข้อใหม่
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Project_NameTH`]="{ item }">
        {{ `${item.Project_NameTH} (${item.Project_NameEN})` }}
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class=" white--text" :class="`type-${item.Project_Type.ProjectType_ID}`" small label>
          {{ allType[item.Project_Type.ProjectType_ID - 1].ProjectType_Name }}
        </v-chip>
      </template>
      <template v-slot:[`item.Project_MaxMember`]="{ item }">
        {{ item.Project_Members.length + " / " + item.Project_MaxMember }}
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        {{ item.Project_Section.Section_Name }}
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <group-status :status="item.Project_Status.ProjectStatus_ID"></group-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip v-if="!user.User_ProjectID" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.Project_Members.length < item.Project_MaxMember && [1, 2].includes(item.Project_Status.ProjectStatus_ID)"
              v-bind="attrs"
              v-on="on"
              class="mr-2"
              @click="projectModal(item)"
            >
              mdi-account-arrow-right-outline
            </v-icon>
            <v-icon v-else v-bind="attrs" v-on="on" class="mr-2" @click="projectModal(item)" size="20">
              mdi-open-in-new
            </v-icon>
          </template>
          <span v-if="item.Project_Members.length < item.Project_MaxMember">เข้าร่วมกลุ่ม</span>
          <span v-else>ดูรายละเอียด</span>
        </v-tooltip>
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="projectModal(item)" size="20">
              mdi-open-in-new
            </v-icon>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
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
        ></new-topic>
      </modal-container>
    </template>
    <template>
      <modal-container :active="joinProjectModal" :cancellable="1" @close="hideModal">
        <project-modal-detail @submit="joinProject" @close="hideModal" :data="selectedProject" :join="isJoinable"> </project-modal-detail>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import GroupStatus from "@/components/GroupStatus";
import NewTopic from "@/components/NewTopic";
import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ModalContainer,
    GroupStatus,
    NewTopic,
    ProjectModalDetail
  },
  data() {
    return {
      searchText: "",
      loading: true,
      typeFilter: 0,
      proposal_modal: false,
      joinProjectModal: false,
      statusFilter: 0,
      allType: [],
      selectedProject: {},
      projectType: null,
      allStudent: [],
      allStatus: [],
      allProject: [],
      allTeacher: [],
      selectedGroup: {},
      windowHeight: 0,
      isJoinable: true,
      data: {},
      allProjectHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_NameTH",
          width: 300
        },

        { text: "ประเภท", value: "Project_Type", sortable: false },
        { text: "สมาชิก", value: "Project_MaxMember", sortable: false },
        { text: "Section", value: "Project_Section" },
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
          return !this.typeFilter || item.Project_Type.ProjectType_ID == this.typeFilter;
        })
        .filter(item => {
          return !this.statusFilter || item.Project_Status.ProjectStatus_ID == this.statusFilter;
        });
    }
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    // user() {
    //   this.loadData(); //จับตอน reload
    // }
  },
  methods: {
    async loadData() {
      this.$store.dispatch("user/getLoggedInUserData").then(async () => {
        const type = await this.Project.AllType();
        this.allStatus = await this.Project.AllStatus();
        this.allTeacher = await this.User.UserTeacher();
        this.allStudent = await this.User.UserStudent();
        // this.allStudent = this.allStudent.filter(item => item.User_ID != this.user.User_ID);
        this.projectType = type.slice();
        this.allType = type.slice();
        this.projectType.push({
          ProjectType_ID: 0,
          ProjectType_Name: "ทั้งหมด"
        });
        this.allStatus.push({
          ProjectStatus_ID: 0,
          ProjectStatus_Name: "ทั้งหมด"
        });
        this.allProject = await this.Project.GetAll();
        this.loading = false;
      });
    },
    async newProject(project, advisors, members) {
      project.createBy = this.user.User_ID;
      await this.Project.New(project, advisors, members).then(() => {
        // this.loadData();
        // location.reload();
        this.$router.push("/student/project");
      });
    },
    projectModal(pProject) {
      this.selectedProject = pProject;
      //ถ้ามีกลุ่มแล้ว หรือ สมาชิกกลุ่มนั้นๆเต็มแล้ว หรือ สถานะ != 1(Draft) จะไม่สามารถเข้าร่วมกลุ่มได้
      if (
        !!this.user.User_ProjectID ||
        pProject.Project_Members.length == pProject.Project_MaxMember ||
        pProject.Project_Status.ProjectStatus_ID != 1
      ) {
        this.isJoinable = false;
      } else {
        this.isJoinable = true;
      }
      this.joinProjectModal = true;
    },
    joinProject(pProjectID) {
      this.Project.Join(pProjectID, this.user.User_ID).then(() => {
        // location.reload();
        this.$router.push("/student/project");
      });
    },
    leaveProject() {
      this.$swal
        .fire({
          title: "ยืนยันที่จะออกจากกลุ่มหรือไม่?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.Leave(this.user.User_ID).then(() => {
              location.reload();
            });
          }
        });
    },
    hideModal() {
      this.proposal_modal = false;
      this.joinProjectModal = false;
    },
    showProposalModal() {
      // this.getAllTeacher();
      this.proposal_modal = true;
    },
    showJoinGroupModal(Group) {
      this.selectedGroup = Group;
      this.joinProjectModal = true;
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
