<template>
  <v-card class="ma-2 elevation-1" tile style="height:inherit" v-resize="onResize">
    <v-data-table
      v-model="selectedList"
      :headers="headers"
      :items="data"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      :height="windowHeight"
      show-select
      item-key="Project_ID"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            คำขออนุมัติเป็นที่ปรึกษาโปรเจ็ค
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-2"></v-text-field>
          <v-spacer></v-spacer>
          <!-- <v-btn class="mr-2" color="success" small @click="approveSelectedList">อนุมัติรายการที่เลือก</v-btn>
          <v-btn color="error" small @click="rejectSelectedList">ไม่อนุมัติรายการที่เลือก</v-btn> -->
        </v-toolbar>
      </template>
      <template v-slot:[`item.Project_Type`]="{ item }">
        <v-chip class=" white--text" :class="`type-${item.Project_Type.ProjectType_ID}`" small label>
          {{ allType[item.Project_Type.ProjectType_ID - 1].ProjectType_Name }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn small outlined color="primary" @click="showDetail(item)">รายละเอียด</v-btn>
        </div>
      </template>
    </v-data-table>
    <template>
      <modal-container :active="modal" :cancellable="1">
        <project-modal-detail @submit="Confirm" @close="modal = !modal" confirm :data="selectedProject"></project-modal-detail>
      </modal-container>
    </template>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";
import ProjectModalDetail from "@/components/ProjectModalDetail";
export default {
  components: {
    ModalContainer,
    ProjectModalDetail
  },
  data() {
    return {
      selectedProject: {},
      allType: [],
      modal: false,
      windowHeight: 0,
      searchText: "",
      loading: true,
      headers: [
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Project_NameTH",
          width: 500
        },
        {
          text: "ประเภท",
          value: "Project_Type"
        },
        {
          text: "จำนวนนักศึกษา",
          value: "Project_MaxMember",
          sortable: true
        },
        {
          text: "คาบเรียน",
          value: "Project_Section.Section_Name"
        },
        {
          value: "actions",
          sortable: false
        }
      ],
      data: [],
      selectedList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID"
    })
  },
  beforeMount() {
    this.loadData();
  },
  watch: {
    user() {
      this.loadData(); //จับตอน reload
    }
  },
  methods: {
    async loadData() {
      if (this.user.User_ID) {
        this.allType = await this.Project.AllType();
        this.data = await this.Project.WaitAdviserConfirmProject(this.user.User_ID);
      }
      this.loading = false;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    showDetail(project) {
      this.selectedProject = project;
      this.modal = true;
    },
    async Confirm(pProjectID, pStatus) {
      //TODO ส่ง UserID กับ array Project_ID ไป
      const advisor = await this.Project.Advisor(pProjectID, this.user.User_ID);
      await this.Project.ConfirmOrRejectProject(advisor[0].Advisor_ID, pStatus).then(() => {
        this.$swal.fire({
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
          toast: true,
          icon: "success",
          title: "Success"
        });
        this.loadData();
        this.modal = false;
      });
    }
    // approveSelectedList() {
    //   if (this.selectedList.length > 0) {
    //     this.selectedList.forEach(item => {
    //       this.Confirm(item).then(() => {
    //         this.loadData();
    //       });
    //     });
    //     alert("c" + this.selectedList.length);
    //   } else {
    //     this.$swal.fire({
    //       icon: "error",
    //       text: "คุณไม่ได้เลือกรายการใด ๆ"
    //     });
    //   }
    // },
    // rejectSelectedList() {
    //   if (this.selectedList.length > 0) {
    //     alert("c" + this.selectedList.length);
    //   } else {
    //     this.$swal.fire({
    //       icon: "error",
    //       text: "คุณไม่ได้เลือกรายการใด ๆ"
    //     });
    //   }
    // }
  }
};
</script>

<style></style>
