<template>
  <div v-if="!gID">
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
          {{ 1 + " / " + item.Project_MaxMember }}
        </template>
        <template v-slot:[`item.Project_TypeID`]="{ item }">
          <v-chip
            class=" white--text"
            :class="`type-${item.Project_TypeID}`"
            small
          >
            {{ item.Project_TypeID }}
          </v-chip>
        </template>
        <template v-slot:[`item.Project_NameTH`]="{ item }">
          {{ `${item.Project_NameTH} (${item.Project_NameEN})` }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showJoinGroupModal(item)">
            mdi-magnify
          </v-icon>
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
      <!-- <template>
        <modal-container
          :active="joinGroup_modal"
          :cancellable="1"
          @close="hideModal"
        >
          <join-group @submit="join" @close="hideModal" :data="selectedGroup">
          </join-group>
        </modal-container>
      </template> -->
    </v-card>
  </div>
  <div v-else>
    <project-detail :data="selfGroup"></project-detail>
  </div>
</template>

<script>
// import ProjectDataTable from "@/components/ProjectDataTable";
import ModalContainer from "@/components/ModalContainer";
import ProjectDetail from "@/components/ProjectDetail";
import GroupStatus from "@/components/GroupStatus";
import NewTopic from "@/components/NewTopic";
export default {
  components: {
    // ProjectDataTable,
    ModalContainer,
    ProjectDetail,
    GroupStatus,
    NewTopic
  },
  data() {
    return {
      user: {},
      // gID: 28,
      gID:null,
      searchText: "",
      loading: true,
      typeFilter: 0,
      proposal_modal: false,
      joinGroup_modal: false,
      statusFilter: 0,
      GroupData: [],
      selfGroup: {},
      allType: [],
      projectType:null,
      allStatus: [],
      allProject: [],
      allTeacher: [],
      windowHeight: 0,
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
      if (this.gID) {
        let temp = {};
        temp = await this.Project.GetSelf(this.gID);
        temp.Members = await this.Group.GetSelfGroupMember(this.gID);
        temp.Advisor = await this.Group.GetAdvisor(this.gID);
        this.selfGroup = temp;
      } else {
        const type = await this.Project.AllType();
        this.allStatus = await this.Project.AllStatus();
        this.allTeacher = await this.User.UserTeacher();
        this.projectType = type.slice()
        this.allType = type.slice()
        this.projectType.push({ ProjectType_ID: 0, ProjectType_Name: "ทั้งหมด" });
        this.allStatus.push({
          ProjectStatus_ID: 0,
          ProjectStatus_Name: "ทั้งหมด"
        });
        this.allProject = await this.Project.GetAll();
        // this.allProject.map(async item => item.Members = await this.Project.GroupMember(item.Project_ID))
        console.log(this.allProject);
      }
      this.loading = false;
    },
    async newProject(val) {
      await this.Project.New(val).then(()=>{
        this.loadData()
      })
    },
    joinProject() {
      //
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
    },
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
