<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-data-table
      :headers="allProjectHeaders"
      :items="filteredItems"
      class="elevation-1"
      show-expand
      single-expand
      item-key="SectionID"
      :loading="sec_loading"
      loading-text="Loading... Please wait"
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title> ผลการสอบ </v-toolbar-title>
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="align-center">
          <v-container>
            <v-row>
              <v-col cols="4">ผลการสอบ</v-col>
              <v-col cols="8">
                <v-data-table
                  :headers="projectScoreHeader"
                  :items="item.Exam.Project_Committees"
                  :loading="loading"
                  loading-text="Loading... Please wait"
                  hide-default-footer
                >
                  <template v-slot:[`item.Firstname`]="{ item }">
                    {{ item.Firstname + " " + item.Lastname }}
                  </template>
                  <template slot="body.append">
                    <tr class="">
                      <th class="">รวม</th>
                      <th class="">{{ sumField(item.Exam.Project_Committees, "PresentScore") }}</th>
                      <th class="">{{ sumField(item.Exam.Project_Committees, "DocumentScore") }}</th>
                      <th class="">
                        รวมทั้งสิ้น
                        {{ sumField(item.Exam.Project_Committees, "PresentScore") + sumField(item.Exam.Project_Committees, "DocumentScore") }}
                      </th>
                    </tr>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">เกรด</v-col>
              <v-col cols="8">
                <span v-html="calculateGrade(item.Exam.Project_Committees)"></span>
                <!-- <p class="title green--text">{{}}</p> -->
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn color="success" class="mr-2" small @click="submit(item)">สอบผ่าน</v-btn>
              <v-btn class="elevation-0" color="white" small @click="cancelEdit(item)">Cancel</v-btn>
            </div>
          </v-container>
        </td>
      </template>
      <template v-slot:[`item.data-table-expand`]="{ item, expand, isExpanded }">
        <v-icon :ref="'collapse_s_' + item.SectionID" @click="expandItem(expand, isExpanded, item.ProjectID)">mdi-square-edit-outline</v-icon>
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
      committeeScore: [],
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
        // { text: "Action", value: "actions" }
        { text: "", value: "data-table-expand" }
      ],
      projectScoreHeader: [
        {
          text: "ชื่อ",
          align: "start",
          sortable: true,
          value: "Firstname"
        },
        { text: "คะแนนการนำเสนอ", value: "Committee.PresentScore", sortable: false },
        { text: "คะแนนการรูปเล่ม", value: "Committee.DocumentScore", sortable: false },
        { text: "คอมเมนต์เพิ่มเติม", value: "Committee.Comment" }
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
        this.allProject = await this.Project.GetAllRequestExamByInstructor(this.user.UserTypeID, 3);
        this.loading = false;
        console.log(this.allProject);
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
    },
    sumField(data, key) {
      console.log(
        data[0].Committee["PresentScore"],
        data.reduce((a, b) => a + (b.Committee[key] || 0), 0)
      );
      // sum data in give key (property)
      return data.reduce((a, b) => a + (b.Committee[key] || 0), 0);
    },
    async expandItem(expand, isExpanded) {
      expand(!isExpanded);
      // await this.Project.Project(ProjectID).then(res => {
      //   // console.log(res)
      //   this.committeeScore = res.Exam.Project_Score;

      // });
    },
    cancelEdit(item) {
      // this.edited_section = JSON.parse(JSON.stringify(this.sections));
      this.$refs["collapse_s_" + item.SectionID].$el.click();
    },
    calculateGrade(data) {
      var score = this.sumField(data, "DocumentScore") + this.sumField(data, "PresentScore");
      var result = this.Utils.calculateGrade(score);
      return '<p class="title grade-' + result.type + '">' + result.grade + "</p>";
    },
    submit(item) {
      this.$swal
        .fire({
          title: "ยืนยันให้สอบผ่าน",
          html: 'ยืนยันให้กลุ่ม<br />"' + item.ProjectNameTH + '"<br />สอบผ่านหรือไม่?',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.Update(this.user.UserID, item.ProjectID, { IsProject: true }, [], [])
              .then(async () => {
                console.log(item);
                await this.Project.UpdateProjectExamStatus(item.ProjectID, item.IsProject ? 7 : item.ProjectStatusID, item.Exam.ExamID, 5);
              })
              .then(() => {
                this.loadData();
              });
            // this.Project.SubmitScore(this.committee.CommitteeID, this.user.UserID, this.data[0].Score,this.data[1].Score,this.data[2].Score).then(() => {
            // this.loadData();
            // });
          }
        });
    }
  }
};
</script>
<style>
.tb-row {
  height: calc(100% / 20);
}
.grade-a {
  color: #b2ff59;
}
.grade-bp {
  color: #eeff41;
}
.grade-b {
  color: #ffff00;
}
.grade-cp {
  color: #ffd740;
}
.grade-c {
  color: #ffab40;
}
.grade-dp {
  color: #ff6e40;
}
.grade-d {
  color: #ff5252;
}
.grade-f {
  color: #d50000;
}
</style>
