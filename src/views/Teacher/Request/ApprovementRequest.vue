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
      <!-- <template v-slot:[`item.Project_FormID`]="{ item }">
        <div>
          <router-link class="text-none" to="#">{{ item.Project_FormID }}</router-link>
        </div>
      </template> -->
      <template v-slot:[`item.Form_StatusID`]="{ item }">
        <div>
          <form-status :status="item.Form_StatusID"></form-status>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <v-btn small outlined color="primary" @click="showDetail(item)">รายละเอียด</v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
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
          value: "Project_NameTH",
          width: 500
        },
        {
          text: "ชื่อฟอร์ม",
          value: "Project_FormID",
          sortable: true
        },
        {
          text: "สถานะ",
          value: "Form_StatusID",
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
  computed: {},
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      const list = [
        {
          id: 1,
          Project_NameTH: "ระบบทดสอบ 1",
          Project_FormID: "CE01",
          Form_StatusID: 2
        },
        {
          id: 2,
          Project_NameTH: "ระบบทดสอบ 2",
          Project_FormID: "CE01",
          Form_StatusID: 3
        },
        {
          id: 3,
          Project_NameTH: "ระบบทดสอบ 3",
          Project_FormID: "CE02",
          Form_StatusID: 2
        }
      ];
      const role = "Advisor";
      switch (role) {
        case "Advisor":
          this.data = list.filter(i => i.Form_StatusID == 2);
          break;
        case "Instructor":
          this.data = list.filter(i => i.Form_StatusID == 3);
          break;
      }
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
      this.$router.push(`/teacher/form_preview?d=83`);
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
