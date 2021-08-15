<template>
  <div>
    <v-card class="ma-2 elevation-1" v-resize="onResize" tile :height="windowHeight">
      <v-data-table :headers="headers" :items="items" :search="search" :height="windowHeight - 64 - 59">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>คู่มือการทำโครงงาน</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn v-if="user.UserTypeID != 1" color="primary" @click="modalUploadFile = !modalUploadFile">อัพโหลดไฟล์</v-btn>
          </v-toolbar>
        </template>
        <template v-slot:[`item.OriginalFileName`]="{ item }">
          <a class="text-none" @click="download(item)">{{ item.OriginalFileName }}</a>
        </template>
        <template v-slot:[`item.CreatedTime`]="{ item }">
          {{ new Date(item.CreatedTime).toLocaleString("th-TH") }}
        </template>
        <template v-slot:[`item.Extension`]="{ item }">
          <v-icon class="mr-2">{{ item.Icon }}</v-icon>
          <span>{{ item.Extension }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon ref="btnDownload" small class="mr-2" v-bind="attrs" v-on="on" @click="download(item)">mdi-download</v-icon>
            </template>
            <span>Download</span>
          </v-tooltip>
          <v-tooltip v-if="user.UserTypeID != 1" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon small class="mr-2" v-bind="attrs" v-on="on" @click="deleteFile(item)">mdi-delete-outline</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <template>
      <modal-container :active="modalUploadFile" :cancellable="1">
        <template>
          <v-card width="600" height="200">
            <v-card-title class="blue white--text">
              <span>อัปโหลดไฟล์</span>
              <v-spacer></v-spacer>
              <v-btn icon @click="closemodalUploadFile">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <div class="pa-5">
              <v-file-input
                v-if="progress == 0"
                v-model="file"
                clearable
                type="file"
                show-size
                truncate-length="50"
                outlined
                dense
                label="Upload file"
                hide-details
                @change="selectFile"
              ></v-file-input>
              <v-progress-linear v-if="progress > 0" v-model="progress" color="success" height="30" rounded>
                <template v-slot:default="{ value }">
                  <span>{{ Math.ceil(value) }}%</span>
                </template>
              </v-progress-linear>
            </div>
            <v-btn class="success" style="position: absolute; right: 20px;" right @click="upload">อัปโหลด</v-btn>
          </v-card>
        </template>
      </modal-container>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";

export default {
  components: {
    ModalContainer
  },
  data: () => ({
    modalUploadFile: false,
    file: null,
    fileUrl: null,
    search: "",
    dialog: false,
    windowHeight: 0,
    progress: 0,
    headers: [
      {
        text: "ชื่อ",
        align: "start",
        sortable: false,
        value: "OriginalFileName"
      },

      { text: "ชนิดไฟล์", value: "Extension", sortable: false },
      { text: "ขนาด", value: "FileSize" },
      { text: "ผู้อัปโหลด", value: "CreatedUser.Fullname" },
      { text: "วันที่เพิ่ม", value: "CreatedTime" },
      { text: "", value: "actions", sortable: false }
    ],
    items: []
  }),

  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },

  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    user() {
      this.loadData(); //จับตอน reload
    }
  },

  methods: {
    async loadData() {
      this.items = await this.Project.ExampleFiles();
      this.items.map(item => {
        const temp = item.OriginalFileName.split(".");
        item.Extension = temp.length > 1 ? temp.pop() : "file";
        item.FileSize = this.Utils.bytesToSize(item.FileSize);
        item.Icon = this.Utils.fileicon(item.Extension);
      });
    },
    async download(item) {
      this.fileUrl = await this.Project.ExampleFile(item.ExampleFileID);
      const link = document.createElement("a");
      link.href = this.fileUrl;
      link.setAttribute("download", item.OriginalFileName);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(this.fileUrl);
    },
    async deleteFile(file) {
      this.$swal
        .fire({
          title: `<span style="font-size:24px"><strong>ยืนยันที่จะลบไฟล์</strong><br /><span style="font-size:18px">${file.OriginalFileName} ?</span></span>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.DeleteExampleFile(file.ExampleFileID).then(() => {
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
            });
          }
        });
    },
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    },
    async upload() {
      await this.Project.UploadExampleFile(this.user.UserID, this.file, event => {
        console.log(event);
        this.progress = Math.round((100 * event.loaded) / event.total);
      }).then(() => {
        this.loadData();
        this.modalUploadFile = false;
        this.file = null;
        this.progress = 0;
      });
    },
    selectFile(event) {
      if (event) {
        this.file = event;
      }
    },
    closemodalUploadFile() {
      this.modalUploadFile = false;
    }
  }
};
</script>
