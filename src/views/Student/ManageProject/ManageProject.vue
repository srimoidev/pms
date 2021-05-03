<template>
  <v-card v-resize="onResize" class="ma-2 elevation-1" tile :height="windowHeight">
    <v-data-table
      :headers="headers"
      :items="data"
      :item-class="rowStyle"
      :loading="loading"
      loading-text="Loading... Please wait"
      :height="windowHeight"
    >
      <!-- :custom-sort="dateSorting" -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>จัดการโปรเจ็ค</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:[`item.Prerequisite`]="{ item }">
        <div class="d-flex align-baseline" v-for="pre in item.Prerequisite" :key="pre.Pre_ID">
          <v-icon class="mr-2" :color="pre.Status == 5 ? 'success' : 'error'" small>{{
            pre.Status == 5 ? "mdi-check-circle-outline" : "mdi-close-circle-outline"
          }}</v-icon>
          <span>{{ pre.Pre_FormReqType.FormType_Name }}</span>
        </div>
      </template>
      <template v-slot:[`item.LatestForm`]="{ item }">
        <form-status v-if="item.LatestForm" :status="item.LatestForm.Form_StatusID"></form-status>
        <form-status v-else></form-status>
      </template>
      <template v-slot:[`item.FormType_Name`]="{ item }">
        <router-link
          class="text-none"
          :to="{
            path: 'form_ce',
            query: { type: item.FormType_ID }
          }"
        >
          {{ item.FormType_Name }}
        </router-link>
      </template>
      <template v-slot:[`item.Form_UpdatedTime`]="{ item }">
        <span v-if="item.LatestForm">
          {{ new Date(item.LatestForm.Form_UpdatedTime).toLocaleDateString() }}
        </span>
      </template>
      <template v-slot:[`item.Deadline`]="{ item }">
        <div v-if="item.Deadline != undefined">
          <div style="font-size: 16px">
            {{ new Date(item.Deadline.Deadline_DateTime).toLocaleString("th-TH") }}
          </div>
          <v-chip
            v-if="item.isReachDeadline <= 10 && item.isReachDeadline > 0"
            label
            :class="{
              'white--text orange lighten-1': item.isReachDeadline <= 10 && item.isReachDeadline >= 0
            }"
            small
            ><v-icon class="mr-2" color="white">mdi-clock-alert-outline</v-icon
            ><span>{{ "อีก " + Math.ceil(item.isReachDeadline) + " วัน !" }}</span></v-chip
          >
          <v-chip v-else-if="item.isReachDeadline < 0" label :class="{ 'white--text red': item.isReachDeadline < 0 }" small
            ><v-icon class="mr-2" color="white">mdi-clock-alert-outline</v-icon><span>{{ "เกินกำหนด" }}</span></v-chip
          >
        </div>
      </template>
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left min-width="20vw">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="gray">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="previewDoc(item)">
              <v-list-item-title>Preview</v-list-item-title>
            </v-list-item>
            <v-list-item @click="editDoc(item)">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteDoc(item)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template> -->
    </v-data-table>
  </v-card>
</template>
<script>
import FormStatus from "@/components/FormStatus";
export default {
  components: {
    FormStatus
  },
  data: () => ({
    user: null,
    loading: true,
    windowHeight: 0,
    actionMenu: [
      { title: "Preview", method: "previewDoc" },
      { title: "Edit", method: "editDoc" },
      { title: "Delete", method: "deleteDoc" }
    ],

    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ชื่อเอกสาร", value: "FormType_Name" },
      { text: "จำเป็นต้องทำก่อน", value: "Prerequisite", sortable: false },
      { text: "อัปเดตครั้งที่", value: "rev", sortable: false },
      { text: "อัปเดตล่าสุด", value: "Form_UpdatedTime", sortable: false },
      { text: "วันกำหนดส่ง", value: "Deadline", sortable: false },
      { text: "สถานะ", value: "LatestForm", sortable: false }
      // { text: "", value: "actions", sortable: false }
    ],
    data: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  beforeMount() {
    this.loadData();
  },

  methods: {
    async loadData() {
      this.user = JSON.parse(localStorage.getItem("user"));
      const initData = await this.Form.Type();

      const preq = await this.Form.Prerequisite();
      const temp = await this.Form.LatestEachForm(this.user.pID);
      let deadline = await this.Form.Deadline();
      console.log(temp);
      // const temp = [];
      if (temp) {
        initData.map(element => {
          element.LatestForm = temp.find(item => item.Form_TypeID == element.FormType_ID) || null;
          element.Prerequisite = preq.filter(item => item.Pre_FormTypeID == element.FormType_ID);
          element.Deadline = deadline.find(item => item.Deadline_FormTypeID == element.FormType_ID) || undefined;
          // console.log(element.Deadline);
          element.isReachDeadline = (new Date(element?.Deadline?.Deadline_DateTime) - new Date()) / (1000 * 3600 * 24);
          element.Prerequisite.map(item => {
            item.Status = temp.find(t => t.Form_TypeID == item.Pre_FormReqTypeID)?.Form_StatusID;
          });
        });
      }
      this.data = initData;
      this.loading = false;
      console.log(this.loading, this.data);
    },
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    onClick(methodName) {
      this[methodName]();
    },
    rowStyle() {
      return "tb-row";
    },
    previewDoc(item) {
      console.log("preview", item);
    },
    editDoc() {
      console.log("edit");
    },
    deleteDoc() {
      console.log("delete");
    }
  }
};
</script>
<style>
.tb-row {
  height: 8vh;
}
.text-none {
  text-decoration: none;
}
</style>
