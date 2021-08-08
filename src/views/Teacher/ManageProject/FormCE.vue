<template>
  <v-card v-resize="onResize" class="ma-2 elevation-1" tile :height="windowHeight">
    <v-data-table :headers="headers" :items="data" :loading="loading" loading-text="Loading... Please wait" :height="windowHeight"
      ><template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ form.FormTypeName }}
            <v-breadcrumbs :items="breadcrumbs" large class="mr-4 pa-0">
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item :to="item.url" :disabled="item.disabled">
                  <span style="font-size:12px">{{ item.text }}</span>
                </v-breadcrumbs-item>
              </template>
              <template v-slot:divider>
                <span style="font-size:12px">/</span>
              </template>
            </v-breadcrumbs>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="upNewDoc = !upNewDoc">Upload new document</v-btn>
          <template>
            <modal-container :active="upNewDoc" :cancellable="1">
              <template>
                <v-card width="600" height="200">
                  <v-card-title class="blue white--text">
                    Upload New Document
                    <v-spacer></v-spacer>
                    <v-btn icon @click="upNewDoc = !upNewDoc">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <div class="pa-5">
                    <v-file-input
                      accept="application/pdf"
                      type="file"
                      show-size
                      truncate-length="50"
                      outlined
                      dense
                      label="Upload file"
                      hide-details
                      @change="selectFile"
                    ></v-file-input>
                  </div>
                  <v-btn class="success" style="position: absolute; right: 20px;" @click="upload" right>Apply</v-btn>
                </v-card>
              </template>
            </modal-container>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.index`]="{ item }">
        {{ data.indexOf(item) + 1 }}
      </template>
      <template v-slot:[`item.actions`]="">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-file-document-multiple-outline</v-icon>
            </v-btn>
          </template>
          <span>ส่งเอกสารใหม่</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.UpdatedTime`]="{ item }">
        <router-link class="text-none" :to="{ path: 'form_preview', query: { pid: ProjectID, fid: item.FormID } }">{{
          new Date(item.UpdatedTime).toLocaleDateString()
        }}</router-link>
        <!-- <v-badge color="red" inline content="5"></v-badge> -->
      </template>
      <template v-slot:[`item.FormStatusID`]="{ item }">
        <form-status :status="item.Form_Status"></form-status>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

import ModalContainer from "@/components/ModalContainer";
import FormStatus from "@/components/FormStatus";

export default {
  components: {
    ModalContainer,
    FormStatus
  },
  data() {
    return {
      windowHeight: 0,
      currentFile: undefined,
      progress: 0,
      message: "",
      upNewDoc: false,
      loading: true,
      form: {},
      data: [],
      project: {},
      comment: [],
      headers: [
        { text: "#", value: "index" },
        {
          text: "อัปเดตล่าสุด",
          align: "start",
          sortable: false,
          value: "UpdatedTime"
        },
        { text: "อัปเดตโดย", value: "UpdatedUser.Fullname", sortable: false },
        { text: "สถานะ", value: "FormStatusID" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    FormTypeID() {
      return this.$route.query.type;
    },
    ProjectID() {
      return this.$route.query.project;
    },
    breadcrumbs() {
      return [
        {
          text: "ที่ปรึกษาโครงงาน",
          disabled: false,
          url: "/teacher/project"
        },
        {
          text: "จัดการโปรเจ็ค",
          disabled: false,
          url: `/teacher/documents?pid=${this.ProjectID}`
        },
        {
          text: this.form.FormTypeName,
          disabled: true,
          url: "/teacher/form_ce"
        }
      ];
    }
  },
  watch: {
    user() {
      this.loadData();
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.form = await this.Form.Type(this.FormTypeID);
      this.project = await this.Project.Project(this.ProjectID);
      this.data = await this.Form.AllFormEachType(this.ProjectID, this.FormTypeID, this.project.Project_Section.SectionID);
      console.log(this.project, this.data);
      // if (temp) {
      //   temp.map(async item => {
      //     // item.Comments = await DB.Project.form_comment(item.Form_ID);
      //     const comment = await DB.Project.form_comment(item.Form_ID);
      //     item.Comments = await comment ? comment : [];
      //   });
      //   // console.log(temp);
      //   // this.data = temp;
      //   this.loading = false;
      //   return await temp
      // }
      // console.log(this.data,this.loading);
      this.loading = false;
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 64 - 16 - 59;
    },
    selectFile(file) {
      console.log(file);
      this.progress = 0;
      this.currentFile = file;
    },
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }

      this.message = "";

      this.Form.Upload(this.user.UserID, this.user.ProjectID, this.FormTypeID, this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        })
        .finally(() => {
          this.upNewDoc = false;
          this.loadData();
        });
    },
    apply() {
      alert("upload");
    }
  }
};
</script>

<style>
.text-none {
  text-decoration: none;
}
</style>
