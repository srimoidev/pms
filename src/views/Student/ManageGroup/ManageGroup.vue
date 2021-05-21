<template>
  <div v-if="!user.User_ProjectID">
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
            <v-btn class="primary white--text" @click="showProposalModal">
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
        <!-- <template v-slot:[`item.Project_Detail`]="{ item }">
          <div class="ellipsis-2">
            {{ item.Project_Detail }}
          </div>
        </template> -->
        <template v-slot:[`item.Project_Advisors`]="{ item }">
          <div v-for="(advs, index) in item.Project_Advisors" :key="advs.User_ID">
            {{ index + 1 + ". " + advs.User_Firstname + " " + advs.User_Lastname }}
          </div>
        </template>
        <template v-slot:[`item.Project_Section`]="{ item }">
          {{ item.Project_Section.Section_Name }}
        </template>
        <template v-slot:[`item.Project_Status`]="{ item }">
          <group-status :status="item.Project_Status.ProjectStatus_ID"></group-status>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip v-if="item.Project_Members.length < item.Project_MaxMember" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="joinProject(item)">
                mdi-account-arrow-right-outline
              </v-icon>
            </template>
            <span>เข้าร่วมกลุ่ม</span>
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
        <modal-container :active="joinGroup_modal" :cancellable="1" @close="hideModal">
          <join-project @submit="joinProject" @close="hideModal" :data="selectedGroup"> </join-project>
        </modal-container>
      </template>
    </v-card>
  </div>
  <div v-else class="d-flex ma-2">
    <v-card class="elevation-1 mr-2" style="width:70%; min-height:89vh" tile :height="windowHeight">
      <v-toolbar flat color="white">
        <v-toolbar-title>
          {{ "Manage Group - " + (data.Project_NameTH ? data.Project_NameTH : "") }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-chip v-if="!data.isAdvisorsConfirm" label color="orange" text-color="white" small>รอการรับรองเป็นอาจารยที่ปรึกษา</v-chip>
        <v-spacer></v-spacer>
        <v-btn class="error white--text" @click="leaveProject">
          <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
          ออกจากกลุ่ม
        </v-btn>
      </v-toolbar>
    </v-card>
    <div style="width:30%">
      <v-card class="elevation-1 mb-2" tile>
        <v-card-text>{{ "สมาชิก" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Project_Members">
            <v-list-item :key="item.User_ID">
              <v-list-item-content>
                <v-list-item-title>{{ item.User_Firstname + " " + item.User_Lastname }}</v-list-item-title>
                <v-list-item-subtitle>{{ `รหัส : ${item.User_StudentID} ปีการศึกษา : ${item.User_AcademicYear}` }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index != data.Project_Members.length - 1" class="mx-2" :key="item"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card tile class="elevation-1"
        ><v-card-text v-if="data.isAdvisorsConfirm">{{ "อาจารย์ที่ปรึกษา" }}</v-card-text>
        <v-card-text v-else>{{ "ว่าที่อาจารย์ที่ปรึกษา" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Project_Advisors">
            <v-list-item :key="item.User_ID">
              {{ item.User_Firstname + " " + item.User_Lastname }}
            </v-list-item>
            <v-divider v-if="index != data.Project_Advisors.length - 1" class="mx-2" :key="item"></v-divider>
          </template>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import GroupStatus from "@/components/GroupStatus";
import NewTopic from "@/components/NewTopic";
import JoinProject from "@/components/JoinProject";
export default {
  components: {
    ModalContainer,
    GroupStatus,
    NewTopic,
    JoinProject
  },
  data() {
    return {
      searchText: "",
      loading: true,
      typeFilter: 0,
      proposal_modal: false,
      joinGroup_modal: false,
      statusFilter: 0,
      GroupData: [],
      selfGroup: {},
      allType: [],
      projectType: null,
      allStatus: [],
      allProject: [],
      allTeacher: [],
      selectedGroup: {},
      windowHeight: 0,
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
        { text: "อาจารย์ที่ปรึกษา", value: "Project_Advisors" },
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
    user() {
      this.loadData(); //จับตอน reload
    }
  },
  methods: {
    async loadData() {
      if (!this.user.User_ProjectID) {
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
      } else {
        this.data = await this.Project.GetSelf(this.user.User_ProjectID);
        console.log(this.data);
      }
      console.log(this.data);
      this.loading = false;
    },
    async newProject(project, advisors, members) {
      console.log(advisors, members);
      await this.Project.New(project, advisors, members).then(() => {
        // this.loadData();
        location.reload();
      });
    },
    joinProject(pProject) {
      console.log(pProject);
      this.$swal
        .fire({
          html: `<div><p>ยืนยันที่จะร่วมกลุ่ม</p></div><div><h2>"${pProject.Project_NameTH} ?"</h2></div>`,
          text: "You won't be able to revert this! aaaaaaa",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.Join(pProject.Project_ID, this.user.User_ID).then(() => {
              location.reload();
            });
          }
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
      this.joinGroup_modal = false;
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
/* Hardware */
.type-1 {
  background-color: #69f0ae !important;
}
/* Software */
.type-2 {
  background-color: #ffd54f !important;
}
/* Sofware and Hardware */
.type-3 {
  background-color: #b388ff !important;
}
.tb-row {
  height: calc(100% / 20);
}
</style>
