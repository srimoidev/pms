<template>
  <v-card class="ma-2" tile style="height:inherit" v-resize="onResize">
    <v-data-table
      v-model="selectedList"
      :headers="headers"
      :items="data"
      :loading="loading"
      :search="searchText"
      loading-text="Loading... Please wait"
      class="elevation-1"
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
          <v-btn class="mr-2" color="success" small @click="approveSelectedList">อนุมัติรายการที่เลือก</v-btn>
          <v-btn color="error" small @click="rejectSelectedList">ไม่อนุมัติรายการที่เลือก</v-btn>
        </v-toolbar>
      </template>
      <!-- <template v-slot:[`item.Form_StatusID`]="{ item }">
        <div>
          <form-status :status="item.Form_StatusID"></form-status>
        </div>
      </template> -->
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn small outlined color="primary" @click="showDetail(item)">รายละเอียด</v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
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
          text: "รายละเอียด",
          value: "Project_Detail",
          sortable: true
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
        console.log(this.user);
        this.data = await this.Project.WaitAdviserConfirmProject(this.user.User_ID);
        console.log(this.data);
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
    async showDetail(project) {
      //TODO ส่ง UserID กับ array Project_ID ไป
      const advisor = await this.Project.Advisor(project.Project_ID, this.user.User_ID);
      console.log(advisor);
      await this.Project.ConfirmProjectAdviser(advisor[0].Advisor_ID).then(() => {
        this.loadData();
        console.log(this.data);
      });
      this.loadData();
      console.log(this.data);
    },
    approveSelectedList() {
      if (this.selectedList.length > 0) {
        this.selectedList.forEach(item => {
          console.log(item);
          this.showDetail(item).then(() => {
            this.loadData();
          });
        });
        alert("c" + this.selectedList.length);
      } else {
        this.$swal.fire({
          icon: "error",
          text: "คุณไม่ได้เลือกรายการใด ๆ"
        });
      }
    },
    rejectSelectedList() {
      if (this.selectedList.length > 0) {
        alert("c" + this.selectedList.length);
      } else {
        this.$swal.fire({
          icon: "error",
          text: "คุณไม่ได้เลือกรายการใด ๆ"
        });
      }
    }
  }
};
</script>

<style></style>
