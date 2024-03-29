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
          <v-btn v-if="!isPassForm" @click="upNewDoc = !upNewDoc" color="primary">ส่งเอกสาร</v-btn>
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
        <router-link class="text-none" :to="{ path: 'form_preview', query: { d: item.FormID } }">
          {{ form.FormTypeName + " Rev." + (data.length - data.indexOf(item)) }}
        </router-link>
      </template>
      <template v-slot:[`item.actions`]>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-file-document-multiple-outline</v-icon>
            </v-btn>
          </template>
          <span>ส่งเอกสารใหม่</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.UpdatedTime`]="{ item }"
        >{{ new Date(item.UpdatedTime).toLocaleDateString() }}
        <!-- <v-badge color="red" inline content="5"></v-badge> -->
      </template>
      <template v-slot:[`item.FormStatusID`]="{ item }">
        <form-status :status="item.Form_Status"></form-status>
      </template>
      <template v-slot:[`item.Actions`]="{ item }">
        <v-tooltip v-if="item.FormStatusID == 1" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" @click="deleteForm(item)">
              mdi-delete-outline
            </v-icon>
          </template>
          <span>ลบ</span>
        </v-tooltip>
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
      isPassForm: false,
      headers: [
        { text: "ชื่อเอกสาร", value: "index" },
        {
          text: "วันที่ส่ง",
          value: "UpdatedTime"
        },
        { text: "ผู้ส่ง", value: "CreatedUser.Fullname" },
        // { text: "อัปเดตโดย", value: "UpdatedUser.Fullname", sortable: false },
        { text: "สถานะ", value: "FormStatusID" },
        { text: "", value: "Actions", sortable: false }
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
    breadcrumbs() {
      return [
        {
          text: "จัดการโปรเจ็ค",
          disabled: false,
          url: "/student/documents"
        },
        {
          text: this.form.FormTypeName,
          disabled: true,
          url: "/student/form_ce"
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
      this.project = await this.Project.Project(this.user.ProjectID);
      this.data = await this.Form.AllFormEachType(this.user.ProjectID, this.FormTypeID, this.project.Project_Section.SectionID);

      this.isPassForm = this.data.some(item => item.FormStatusID == 5);
      // if (temp) {
      //   temp.map(async item => {
      //     // item.Comments = await DB.Project.form_comment(item.Form_ID);
      //     const comment = await DB.Project.form_comment(item.Form_ID);
      //     item.Comments = await comment ? comment : [];
      //   });
      //   // this.data = temp;
      //   this.loading = false;
      //   return await temp
      // }
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
    },
    deleteForm(item) {
      console.log(item);
      this.$swal
        .fire({
          title: "ยืนยันที่จะลบหรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(async result => {
          if (result.isConfirmed) {
            await this.Form.Delete(item.FormID)
              .then(() => {
                this.$swal.fire({
                  toast: true,
                  icon: "success",
                  title: "ดำเนินการเรียบร้อยแล้ว",
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: toast => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener("mouseleave", this.$swal.resumeTimer);
                  }
                });
              })
              .then(() => {
                this.loadData();
              });
          }
        });
    }
  }
};
</script>

<style>
.text-none {
  text-decoration: none;
}
</style>
