<template>
  <div>
    <v-card v-if="isUserAllow && user.ProjectID" v-resize="onResize" class="ma-2 elevation-1" tile :height="windowHeight">
      <v-data-table
        :headers="headers"
        :items="data"
        :item-class="rowStyle"
        :loading="loading"
        loading-text="Loading... Please wait"
        :height="windowHeight - 64 - 59"
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
          <div class="d-flex align-baseline" v-for="pre in item.Prerequisite" :key="pre.PrerequisiteID">
            <v-icon class="mr-2" :color="pre.Status == 5 ? 'success' : 'error'" small>{{
              pre.Status == 5 ? "mdi-check-circle-outline" : "mdi-close-circle-outline"
            }}</v-icon>
            <span>{{ pre.RequireForm.FormTypeName }}</span>
          </div>
        </template>
        <template v-slot:[`item.LatestForm`]="{ item }">
          <form-status v-if="item.LatestForm" :status="item.LatestForm.Form_Status"></form-status>
          <form-status v-else></form-status>
        </template>
        <template v-slot:[`item.FormTypeName`]="{ item }">
          <router-link
            class="text-none"
            :to="{
              path: 'form_ce',
              query: { type: item.FormTypeID }
            }"
          >
            {{ item.FormTypeName }}
          </router-link>
        </template>
        <template v-slot:[`item.UpdatedTime`]="{ item }">
          <span v-if="item.LatestForm">
            {{ new Date(item.LatestForm.UpdatedTime).toLocaleString() }}
          </span>
        </template>
        <template v-slot:[`item.Deadline`]="{ item }">
          <div v-if="item.Deadline != undefined">
            <div style="font-size: 16px">
              {{ new Date(item.Deadline.OnDate).toLocaleString("th-TH") }}
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
      </v-data-table>
    </v-card>
    <div v-else class="text-center" style="height:inherit">
      <div style="padding-top:19%">
        <v-icon size="128">mdi-alert-circle-outline</v-icon>
        <p>โปรดไปที่เมนู "โปรเจ็คทั้งหมด" เพื่อสร้างกลุ่มใหม่หรือเข้าร่วมกลุ่มก่อนจัดการโปรเจ็ค</p>
      </div>
    </div>
  </div>
</template>
<script>
import FormStatus from "@/components/FormStatus";

import { mapGetters } from "vuex";
export default {
  components: {
    FormStatus
  },
  data: () => ({
    loading: true,
    isUserAllow: true,
    windowHeight: 0,
    actionMenu: [
      { title: "Preview", method: "previewDoc" },
      { title: "Edit", method: "editDoc" },
      { title: "Delete", method: "deleteDoc" }
    ],
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ชื่อเอกสาร", value: "FormTypeName" },
      { text: "จำเป็นต้องทำก่อน", value: "Prerequisite", sortable: false },
      { text: "อัปเดตล่าสุด", value: "UpdatedTime", sortable: false },
      { text: "อัปเดตครั้งที่", value: "LatestForm.Rev", sortable: false },
      { text: "วันกำหนดส่ง", value: "Deadline", sortable: false },
      { text: "สถานะ", value: "LatestForm", sortable: false }
    ],
    data: []
  }),

  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    user() {
      this.loadData();
    },
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
      if (this.user.ProjectID) {
        await this.Project.GetSelf(this.user.ProjectID).then(async res => {
          console.log(res);
          if ([1, 2, 3, 8].includes(res.Project_Status.ProjectStatusID)) {
            this.isUserAllow = false;
            return;
          }
          const initData = await this.Form.Type();
          const preq = await this.Form.Prerequisite();
          const latest = await this.Form.LatestEachForm(this.user.ProjectID);
          let deadline = await this.Form.Deadline();

          if (latest) {
            initData.map(element => {
              element.LatestForm = latest.find(item => item.FormTypeID == element.FormTypeID) || null;
              element.Prerequisite = preq.filter(item => item.FormTypeID == element.FormTypeID);
              element.Deadline = deadline.find(item => item.FormTypeID == element.FormTypeID) || undefined;
              element.isReachDeadline = (new Date(element?.Deadline?.OnDate) - new Date()) / (1000 * 3600 * 24);
              element.Prerequisite.map(item => {
                item.Status = latest.find(t => t.FormTypeID == item.PrerequisiteID)?.FormStatusID;
              });
            });
          }
          console.log(initData);
          this.data = initData;
          this.loading = false;
        });
      }
    },
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
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
