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
        {{ `${item.ProjectNameTH} (${item.ProjectNameEN})` }}
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class="white--text" :class="`type-${item.Project_Type.ProjectTypeID}`" small label>
          {{ allType[item.Project_Type.ProjectTypeID - 1].ProjectTypeNameTH }}
        </v-chip>
      </template>
      <template v-slot:[`item.MaxMember`]="{ item }">
        {{ item.Project_Members.length }}
      </template>
      <template v-slot:[`item.Project_Section`]="{ item }">
        {{ item.Project_Section.Sequence }}
      </template>
      <template v-slot:[`item.Project_Status`]="{ item }">
        <project-status :status="item.Project_Status.ProjectStatusID"></project-status>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="projectModal(item)">
              mdi-account-arrow-right-outline
            </v-icon>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <template>
      <modal-container :active="proposal_modal" :cancellable="1" @close="hideModalProposal" :width="1000">
        <new-topic
          @close="hideModalProposal"
          @newProject="newProject"
          :teachers="allTeacher"
          :alltype="allType"
          :students="allStudent"
          :createUser="user"
          :sections="allSection"
        ></new-topic>
      </modal-container>
    </template>
    <template>
      <modal-container :active="joinProjectModal" :cancellable="1">
        <v-card width="1000">
          <v-card-title>
            รายละเอียดโครงงาน<v-spacer></v-spacer>
            <v-btn icon @click="hideModalDetail">
              <v-icon>mdi-close</v-icon>
            </v-btn></v-card-title
          >
          <v-divider> </v-divider>
          <v-container>
            <v-card class="ma-2 px-4 pa-2 elevation-0" outlined>
              <v-row dense>
                <v-col cols="3"><label for="">ชื่อภาษาไทย</label></v-col>
                <v-col cols="9">{{ selectedProject.ProjectNameTH }}</v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><label for="">ชื่ออังกฤษ</label></v-col>
                <v-col cols="9">{{ selectedProject.ProjectNameEN }}</v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><label for="">รายละเอียด</label></v-col>
                <v-col cols="9">{{ selectedProject.projectDetail }}</v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><label for="">สมาชิก</label></v-col>
                <v-col cols="9">
                  <template v-for="i in selectedProject.Project_Members">
                    <div :key="i.UserID">
                      <v-chip label class="mb-2">
                        <v-avatar v-if="i.ProfileImage" left class="d-flex justify-center" color="blue">
                          <v-img :src="i.ProfileImage" max-width="25"></v-img>
                        </v-avatar>
                        <v-avatar v-else left class="d-flex justify-center" color="blue">
                          <v-icon color="white" small>mdi-account</v-icon>
                        </v-avatar>
                        <span class="grey--text text--darken-1">{{ i.Firstname + " " + i.Lastname }}</span>
                      </v-chip>
                    </div>
                  </template>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="3"><label for="">อาจารย์ที่ปรึกษา</label></v-col>
                <v-col cols="9"
                  ><template v-for="i in selectedProject.Project_Advisors">
                    <div :key="i.UserID">
                      <v-chip label class="mb-2">
                        <v-avatar v-if="i.ProfileImage" left class="d-flex justify-center" color="blue">
                          <v-img :src="i.ProfileImage" max-width="25"></v-img>
                        </v-avatar>
                        <v-avatar v-else left class="d-flex justify-center" color="blue">
                          <v-icon color="white" small>mdi-account</v-icon>
                        </v-avatar>
                        <span class="grey--text text--darken-1">{{ i.Firstname + " " + i.Lastname }}</span>
                      </v-chip>
                    </div>
                  </template></v-col
                >
              </v-row>
              <v-row dense>
                <v-col cols="3"><label for="">Section</label></v-col>
                <!-- <v-col cols="9">

                  {{selectedProject.Project_Section}}
                  <div>{{ `Sec : ${selectedProject.Project_Section.Sequence}/${selectedProject.Project_Section.Year}` }}</div>
                  <div>{{ `อาจารย์ : ${selectedProject.Project_Section.Section_Instructor.Fullname}` }}</div>
                  <div>
                    {{
                      `คาบเรียน : ${selectedProject.Project_Section.DayOfWeek - 1].text} ${selectedProject.Project_Section.StartTime.slice(0, 5)} - ${data[
                        item.name
                      ].EndTime.slice(0, 5)}`
                    }}
                  </div>
                </v-col> -->
              </v-row>
            </v-card>
            <div class="text-right">
              <v-btn class="mr-2" color="success" small>เลือกเป็นกรรมการสอบ</v-btn>
              <v-btn color="white elevation-0" small @click="hideModalDetail">Close</v-btn>
            </div>
          </v-container>
        </v-card>
      </modal-container>
    </template>
  </v-card>
</template>
_

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import ProjectStatus from "@/components/ProjectStatus";
import NewTopic from "@/components/NewTopic";
// import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ModalContainer,
    ProjectStatus,
    NewTopic
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

        { text: "ประเภท", value: "Project_Type", sortable: false },
        { text: "สมาชิก", value: "MaxMember", sortable: false },
        { text: "Section", value: "Project_Section" },
        { text: "สถานะ", value: "Project_Status" },
        { text: "รายชื่อกรรมการสอบ", value: "Committees" },
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
        this.allProject = await this.Project.GetAll();
        this.loading = false;
      });
    },
    async newProject(project, advisors, members) {
      project.CreatedBy = this.user.UserID;
      project.UpdatedBy = this.user.UserID;
      await this.Project.New(project, advisors, members).then(() => {
        this.$router.push("/student/project");
      });
    },
    async projectModal(pProject) {
      this.selectedProject = pProject;
      await Promise.all(
        this.selectedProject.Project_Members.map(async item => {
          item.ProfileImage = await this.User.ProfileImage(item.UserID);
        })
      ).then(async () => {
        await Promise.all(
          this.selectedProject.Project_Advisors.map(async item => {
            item.ProfileImage = await this.User.ProfileImage(item.UserID);
          })
        ).then(() => {
          //ถ้ามีกลุ่มแล้ว หรือ สมาชิกกลุ่มนั้นๆเต็มแล้ว หรือ สถานะ != 1(Draft) จะไม่สามารถเข้าร่วมกลุ่มได้
          if (!!this.user.ProjectID || ![1, 2].includes(pProject.Project_Status.ProjectStatusID)) {
            this.isJoinable = false;
          } else {
            this.isJoinable = true;
          }
          this.joinProjectModal = true;
        });
      });
    },
    joinProject(pProjectID) {
      this.Project.Join(pProjectID, this.user.UserID).then(() => {
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
            this.Project.Leave(this.user.UserID).then(() => {
              location.reload();
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
