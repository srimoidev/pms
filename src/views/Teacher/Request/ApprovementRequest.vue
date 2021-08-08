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
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            คำขออนุมัติเอกสาร
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-2"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" color="success" small @click="approveSelectedList">อนุมัติรายการที่เลือก</v-btn>
          <v-btn color="error" small @click="rejectSelectedList">ไม่อนุมัติรายการที่เลือก</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.CreatedTime`]="{ item }">
        <div>
          {{ new Date(item.CreatedTime).toLocaleString("th-TH") }}
        </div>
      </template>
      <template v-slot:[`item.Form_Status.Form_Status`]="{ item }">
        <div>
          <form-status :formStatus="formStatus" :status="item.Form_Status"></form-status>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn small outlined color="primary" @click="showDetail(item)">แสดงรายละเอียด</v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import FormStatus from "@/components/FormStatus";
export default {
  components: {
    FormStatus
  },
  data() {
    return {
      windowHeight: 0,
      searchText: "",
      headers: [
        // { text: "#", value: "no", sortable: true },
        {
          text: "ชื่อโครงงาน",
          align: "start",
          sortable: true,
          value: "Form_Project.ProjectNameTH"
        },
        {
          text: "ชื่อฟอร์ม",
          value: "Form_Type.FormTypeName",
          sortable: true
        },
        {
          text: "ส่งเมื่อ",
          value: "CreatedTime",
          sortable: true
        },
        {
          text: "สถานะ",
          value: "Form_Status.Form_Status",
          sortable: true
        },
        {
          value: "actions",
          sortable: false
        }
      ],
      data: [],
      selectedList: [],
      formStatus: []
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
      console.log(this.user.UserTypeID);
      if (this.user.UserTypeID == 2) {
        this.data = await this.Form.WaitforAdvisorApprove(this.user.UserID);
      } else if (this.user.UserTypeID == 3 || this.user.UserTypeID == 5) {
        this.data = await this.Form.WaitforInstructorApprove(this.user.UserID);
      }

      this.formStatus = await this.Form.Status();
      console.log(this.data);
      // const role = "Advisor";
      // switch (role) {
      //   case "Advisor":
      //     this.data = list.filter(i => i.Form_StatusID == 2);
      //     break;
      //   case "Instructor":
      //     this.data = list.filter(i => i.Form_StatusID == 3);
      //     break;
      // }
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    showDetail(val) {
      console.log(val);
      this.$router.push(`/teacher/form_preview?pid=${val.ProjectID}&fid=${val.FormID}`);
    },
    approveSelectedList() {
      if (this.selectedList.length > 0) {
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
