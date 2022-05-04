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
          <v-toolbar-title>ขออนุมัติสอบ</v-toolbar-title>
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.ProjectNameTH`]="{ item }">
        {{ `${item.ProjectNameTH} (${item.ProjectNameEN})` }}
      </template>
      <template v-slot:[`item.IsProject`]="{ item }">
        <span v-if="item.IsProject">
          <v-chip small style="width:100px" class="deep-purple darken-2 white--text justify-center">Project</v-chip>
        </span>
        <span v-else>
          <v-chip small style="width:100px" class="teal accent-4 white--text justify-center">Pre-Project</v-chip>
        </span>
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class="white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
          {{ allType[item.Project_Type.ProjectTypeID - 1].ProjectTypeNameTH }}
        </v-chip>
      </template>
      <template v-slot:[`item.Exam.OnDate`]="{ item }">
        {{ new Date(item.Exam.OnDate).toLocaleString("th-TH") }}
      </template>
      <template v-slot:[`item.MaxMember`]="{ item }">
        {{ item.Project_Members.length }}
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        {{ item.Project_Section.Sequence }}
      </template>
      <template v-slot:[`item.Exam.ExamStatus`]="{ item }">
        <exam-status :status="item.Exam.ExamStatusID"></exam-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="light-green accent-4" class="mr-2" @click="Approve(item)">
              mdi-check
            </v-icon>
          </template>
          <span>อนุมัติ</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="red darken-1" class="mr-2" @click="NotApprove(item)">
              mdi-close
            </v-icon>
          </template>
          <span>ไม่อนุมัติ</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>
_

<script>
import { mapGetters } from "vuex";
// import ModalContainer from "@/components/ModalContainer";
import ExamStatus from "@/components/RequestExamStatus";
// import NewTopic from "@/components/NewTopic";
// import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    // ModalContainer,
    // NewTopic,
    ExamStatus
    // ProjectModalDetail
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
      allSection: [],
      allProjectHeaders: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "ProjectNameTH",
          width: 300
        },
        { text: "วิชา", value: "IsProject", sortable: true },
        { text: "ประเภท", value: "Project_Type", sortable: false },
        // { text: "สมาชิก", value: "MaxMember", sortable: false },
        // { text: "Section", value: "Project_Section" },
        { text: "วัน เวลาที่ขอสอบ", value: "Exam.OnDate" },
        { text: "สถานะ", value: "Exam.ExamStatus" },
        // { text: "รายชื่อกรรมการสอบ", value: "Committees" },
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
          return !this.typeFilter || item.Project_Type.ProjectTypeID == this.typeFilter;
        })
        .filter(item => {
          return !this.statusFilter || item.Project_Status.ProjectStatusID == this.statusFilter;
        });
    },
    isAdvisor() {
      return this.$route.query.MenuID == 103 ? true : false;
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
        // this.allTeacher = await this.User.UserTeacher();
        // this.allStudent = await this.User.StudentsNoGroup();
        // this.allSection = await this.Section.All(1); //ดึงแค่ sec ของ Pre-Project
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
        if (this.isAdvisor) {
          this.allProject = await this.Project.GetAllRequestExamByAdvisor(this.user.UserID);
        } else {
          this.allProject = await this.Project.GetAllRequestExamByInstructor(this.user.UserTypeID,2);
        }
        this.loading = false;
      });
    },
    Approve(item) {
      this.$swal
        .fire({
          title: "ยืนยันที่จะอนุมัติใช่หรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.UpdateExam(item.Exam.ExamID, this.user.UserID, this.isAdvisor ? 2 : 3).then(() => {
              this.loadData();
            });
          }
        });
    },
    NotApprove(item) {
      this.$swal
        .fire({
          title: "ยืนยันที่จะไม่อนุมัติใช่หรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.UpdateExam(item.Exam.ExamID, this.user.UserID, 4).then(() => {
              this.loadData();
            });
          }
        });
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
