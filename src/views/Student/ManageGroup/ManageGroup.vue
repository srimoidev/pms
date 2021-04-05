<template>
  <div v-if="!user.pID">
    <v-card class="ma-2 elevation-1" tile v-resize="onResize">
      <v-data-table
        :headers="allProjectHeaders"
        :items="filteredItems"
        :loading="loading"
        :item-class="rowStyle"
        :search="searchText"
        loading-text="Loading... Please wait"
        :height="windowHeight"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              จัดการกลุ่ม
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="searchText"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              class="mr-10"
            ></v-text-field>
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
        <template v-slot:[`item.Project_MaxMember`]="{ item }">
          {{ item.Project_Members.length + " / " + item.Project_MaxMember }}
        </template>
        <template v-slot:[`item.Project_TypeID`]="{ item }">
          <v-chip
            class=" white--text"
            :class="`type-${item.Project_TypeID}`"
            small
          >
            {{ allType[item.Project_TypeID - 1].ProjectType_Name }}
          </v-chip>
        </template>
        <template v-slot:[`item.Project_NameTH`]="{ item }">
          {{ `${item.Project_NameTH} (${item.Project_NameEN})` }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                class="mr-2"
                @click="joinProject(item)"
              >
                mdi-account-arrow-right-outline
              </v-icon>
            </template>
            <span>เข้าร่วมกลุ่ม</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.Project_StatusID`]="{ item }">
          <group-status :status="item.Project_StatusID"></group-status>
        </template>
      </v-data-table>
      <template>
        <modal-container
          :active="proposal_modal"
          :cancellable="1"
          @close="hideModal"
        >
          <new-topic
            @close="hideModal"
            @newProject="newProject"
            :teacher="allTeacher"
            :alltype="allType"
          ></new-topic>
        </modal-container>
      </template>
      <template>
        <modal-container
          :active="joinGroup_modal"
          :cancellable="1"
          @close="hideModal"
        >
          <join-project
            @submit="joinProject"
            @close="hideModal"
            :data="selectedGroup"
          >
          </join-project>
        </modal-container>
      </template>
    </v-card>
  </div>
  <div v-else class="d-flex ma-2">
    <v-card class="elevation-1 mr-2" style="width:70%; min-height:89vh" tile>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          {{
            "Manage Group - " + (data.Project_NameTH ? data.Project_NameTH : "")
          }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="error white--text" @click="leaveProject">
          <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
          ออกจากกลุ่ม
        </v-btn>
      </v-toolbar>
    </v-card>
    <div style="width:30%">
      <v-card class="elevation-1 mb-2" tile>
        <v-card-text>{{ "Member" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Members">
            <v-list-item :key="item.Member_Info.User_ID">
              <v-list-item-content>
                <v-list-item-title>{{
                  item.Member_Info.User_Firstname +
                    " " +
                    item.Member_Info.User_Lastname
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  `รหัส : ${item.Member_Info.User_StudentID} ปีการศึกษา : ${item.Member_Info.User_AcademicYear}`
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider
              v-if="index != data.Members.length - 1"
              class="mx-2"
              :key="item"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card tile class="elevation-1"
        ><v-card-text>{{ "Teacher" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Advisor">
            <v-list-item :key="item.Advisor_Info.User_ID">
              <v-list-item-content
                ><v-list-item-title>{{
                  item.Advisor_Info.User_Firstname +
                    " " +
                    item.Advisor_Info.User_Firstname
                }}</v-list-item-title
                ><v-list-item-subtitle
                  >asdasdasd</v-list-item-subtitle
                ></v-list-item-content
              >
            </v-list-item>
            <v-divider
              v-if="index != ['a', 'b'].length - 1"
              class="mx-2"
              :key="item"
            ></v-divider>
          </template>
        </v-list>
        <!-- <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{
                data.Teacher_Firstname + " " + data.Teacher_Lastname
              }}</v-list-item-title>
              <v-list-item-subtitle>asdadadsadzxc</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list> -->
      </v-card>
    </div>
  </div>
</template>

<script>
// import ProjectDataTable from "@/components/ProjectDataTable";
import ModalContainer from "@/components/ModalContainer";
// import ProjectDetail from "@/components/ProjectDetail";
import GroupStatus from "@/components/GroupStatus";
import NewTopic from "@/components/NewTopic";
import JoinProject from "@/components/JoinProject";
export default {
  components: {
    // ProjectDataTable,
    ModalContainer,
    // ProjectDetail,
    GroupStatus,
    NewTopic,
    JoinProject
  },
  data() {
    return {
      user: {},
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
          width: 500
        },
        // { text: "อาจารย์ที่ปรึกษา", value: "GROUP_ADVISOR" },
        { text: "ประเภท", value: "Project_TypeID", sortable: false },
        { text: "สมาชิก", value: "Project_MaxMember", sortable: false },
        { text: "รายละเอียด", value: "Project_Detail", sortable: false },
        { text: "ปีการศึกษา", value: "Section_Year" },
        { text: "สถานะ", value: "Project_StatusID" },
        { text: "Action", value: "actions" }
      ]
    };
  },
  methods: {
    async loadData() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.user.pID =
        (await this.Project.SelfProject(this.user.User_ID)) || null;
      if (!this.user.pID) {
        const type = await this.Project.AllType();
        this.allStatus = await this.Project.AllStatus();
        this.allTeacher = await this.User.UserTeacher();
        this.projectType = type.slice();
        this.allType = type.slice();
        console.log(this.allType);
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
        let temp = {};
        temp = await this.Project.GetSelf(this.user.pID);
        temp.Members = await this.Project.ProjectMember(this.user.pID);
        // temp.Advisor = await this.Group.GetAdvisor(this.user.pID);
        this.data = temp;
        console.log(temp);
      }

      // this.allProject.map(async item => item.Members = await this.Project.GroupMember(item.Project_ID))
      console.log(this.allProject);
      this.loading = false;
    },
    async newProject(val) {
      await this.Project.New(val).then(() => {
        this.loadData();
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
            this.Project.Join(pProject.Project_ID, this.user.User_ID).then(
              () => {
                location.reload();
              }
            );
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
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    rowStyle() {
      return "tb-row";
    }
  },
  computed: {
    filteredItems() {
      return this.allProject
        .filter(item => {
          return !this.typeFilter || item.Project_TypeID == this.typeFilter;
        })
        .filter(item => {
          return (
            !this.statusFilter || item.Project_StatusID == this.statusFilter
          );
        });
    }
  },
  beforeMount() {
    this.loadData();
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
