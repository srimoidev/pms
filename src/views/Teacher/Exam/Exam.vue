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
          <v-toolbar-title> กรรมการสอบ </v-toolbar-title>
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
        <router-link :to="`project?pid=` + item.ProjectID" class="text-none">{{ item.ProjectNameTH }}</router-link>
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
      <template v-slot:[`item.Exam.Project_Committees`]="{ item }">
        <ul>
          <li v-for="committee in item.Exam.Project_Committees" :key="committee.UserID">
            {{ committee.Firstname + " " + committee.Lastname + (committee.IsAdvisor ? " (ที่ปรึกษา)" : "") }}
          </li>
          <!-- <li</li> -->
        </ul>
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <project-status :status="item.Project_Status.ProjectStatusID"></project-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip v-if="!item.isAdviserThisProject && !item.isCommittee" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="JoinCommittee(item)">
              mdi-account-arrow-right-outline
            </v-icon>
          </template>
          <span>เข้าร่วมเป็นกรรมการสอบ</span>
        </v-tooltip>
        <v-tooltip v-if="item.isCommittee" bottom>
          <template v-slot:activator="{ on, attrs }">
            <router-link :to="{ path: '/teacher/exam_score', query: { pid: item.ProjectID } }" class="text-none" :disabled="!item.isPassOnDate" :event="item.isPassOnDate ? 'click' : ''">
              <v-icon v-bind="attrs" v-on="on" class="mr-2">
                mdi-checkbox-marked-outline
              </v-icon>
            </router-link>
          </template>
          <span v-if="item.isPassOnDate" >กรอกคะแนนผลการสอบ</span>
          <span v-else >ยังไม่ถึงวันที่นัดหมายสอบ</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>
_

<script>
import { mapGetters } from "vuex";
// import ModalContainer from "@/components/ModalContainer";
// import ProjectStatus from "@/components/ProjectStatus";
// import NewTopic from "@/components/NewTopic";
// import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    // ModalContainer,
    // ProjectStatus,
    // NewTopic
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

        // { text: "Section", value: "Project_Section" },
        { text: "วันที่ขอสอบ", value: "Exam.OnDate" },
        // { text: "สถานะ", value: "Project_Status" },
        { text: "รายชื่อกรรมการสอบ", value: "Exam.Project_Committees" },
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
        this.allStudent = await this.User.StudentsNoGroup();
        this.allSection = await this.Section.All(1); //ดึงแค่ sec ของ Pre-Project
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
        this.allProject = await this.Project.GetAllRequestExam();

        this.allProject.map(item => {
          // item.Project_Advisors.map(teacher => {
          //   if (teacher.UserID == this.user.UserID) {
          //     item.isAdviserThisProject = true;
          //   } else {
          //     item.isAdviserThisProject = false;
          //   }
          //   let committee = JSON.parse(JSON.stringify(teacher));
          //   committee.IsAdvisor = true;
          //   item.Exam.Project_Committees.push(committee);
          // });
          const projectAdvisorIDs = item.Project_Advisors.map(item => item.UserID);
          item.Exam.Project_Committees.map(item => {
            if (projectAdvisorIDs.includes(item.UserID)) {
              item.IsAdvisor = true;
            }
          });

          if (item.Exam.Project_Committees.some(com => com.UserID == this.user.UserID)) {
            item.isCommittee = true;
          } else {
            item.isCommittee = false;
          }
          
          item.Exam.Project_Committees.sort(function(a) {
            return a?.IsAdvisor == null ? 1 : -1;
          });
          if (new Date().getDate() >= new Date(item.Exam.OnDate).getDate()) {
            
            item.isPassOnDate = true;
          } else {
            item.isPassOnDate = false;
          }
        });
        this.loading = false;
      });
    },
    JoinCommittee(item) {
      this.$swal
        .fire({
          title: "เข้าร่วมเป็นกรรมการสอบ",
          html: 'คุณยืนยันที่จะเข้าร่วมเป็นกรรมการสอบกลุ่ม<br />"' + item.ProjectNameTH + '"<br />หรือไม่?',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.JoinCommittee(item.Exam.ExamID, this.user.UserID).then(() => {
              this.loadData();
            });
          }
        });
    },
    hideModalProposal() {
      this.allStudent.map(async item => {
        URL.revokeObjectURL(item.ProfileImage);
      });
      this.allteacher.map(async item => {
        URL.revokeObjectURL(item.ProfileImage);
      });
      this.proposal_modal = false;
    },
    hideModalDetail() {
      this.selectedProject.Project_Members.map(async item => {
        URL.revokeObjectURL(item.ProfileImage);
      });
      this.selectedProject.Project_Advisors.map(async item => {
        URL.revokeObjectURL(item.ProfileImage);
      });
      this.joinProjectModal = false;
    },
    async showProposalModal() {
      await Promise.all(
        this.allStudent.map(async item => {
          item.ProfileImage = await this.User.ProfileImage(item.UserID);
        })
      )
        .then(async () => {
          await Promise.all(
            this.allTeacher.map(async item => {
              item.ProfileImage = await this.User.ProfileImage(item.UserID);
            })
          );
        })
        .then(() => {
          this.proposal_modal = true;
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
