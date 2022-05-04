<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-toolbar flat color="white">
      <v-toolbar-title>ขออนุมัติสอบ</v-toolbar-title>
    </v-toolbar>
    <v-divider class="mx-2"></v-divider>
    <v-container v-show="isLoaded">
      <div v-if="isNotHasGroup" class="text-center" style="height:inherit">
        <div style="padding-top:16%">
          <v-icon size="128">mdi-alert-circle-outline</v-icon>
          <p>โปรดไปที่เมนู "โปรเจ็คทั้งหมด" เพื่อสร้างกลุ่มใหม่หรือเข้าร่วมกลุ่มก่อนจัดการโปรเจ็ค</p>
        </div>
      </div>
      <div v-else-if="isNotAllowToRequest" class="text-center">
        <v-icon size="128" color="amber darken-1">mdi-alert-outline</v-icon>
        <h1>ยังไม่อยู่ในช่วงเวลาที่เปิดให้ขอสอบ</h1>
      </div>
      <div v-else-if="!isCompleteAllForm" class="text-center">
        <v-icon size="128" color="amber darken-1">mdi-alert-outline</v-icon>
        <h1>มีเอกสารบางรายการยังไม่ได้รับการอนุมัติโปรดตรวจสอบ</h1>
      </div>
      <div v-else-if="isExamRequest.IsExist && !isExamRequest.IsRevise" class="text-center">
        <v-icon size="128" color="light-green accent-4">mdi-check-circle-outline</v-icon>
        <h1>ทำการขอสอบเรียบร้อยแล้ว</h1>
        <div v-if="isExamRequest.Exam.ExamStatusID == 3">
          <h3>
            อาจารย์อนุมัติให้สอบเรียบร้อยแล้ว ตรวจสอบรายชื่อกรรมการสอบที่หน้า <router-link to="/student/project?MenuID=2">จัดการโครงงาน</router-link>
          </h3>
        </div>
        <div v-else>
          <h3>โปรดรอการพิจารณาจากอาจารย์ที่ปรึกษาและอาจารย์ประจำวิชา</h3>
        </div>
      </div>
      <div v-else>
        <v-alert border="left" text type="warning" v-if="isExamRequest.IsRevise"
          >การขอสอบวันที่ {{ new Date(isExamRequest.Exam.OnDate).toLocaleString("th-TH") }} ถูกอาจารย์ปฏิเสธ โปรดทบทวนและขอสอบใหม่</v-alert
        >
        <v-row dense>
          <v-col cols="4" class="align-self-end text-right"><label>วิชา : </label></v-col>
          <v-col cols="4"
            ><v-autocomplete
              v-model="isProject"
              :items="ProjectType"
              color="blue-grey lighten-2"
              item-value="value"
              item-text="text"
              hide-details
              outlined
              dense
              disabled
            >
            </v-autocomplete
          ></v-col>
        </v-row>
        <v-row dense>
          <v-col cols="4" class="align-self-end text-right"><label>วัน-เวลา สอบ : </label></v-col>
          <v-col cols="4"><v-text-field v-model="selectedTime" type="datetime-local" class="" name="datetime" hide-details></v-text-field></v-col>
        </v-row>
        <!-- <v-row dense class="mt-2">
        <v-col cols="4" class="align-self-center text-right"><label>เอกสารแนบ (ถ้ามี) : </label></v-col>
        <v-col cols="4"><v-file-input class="" outlined dense></v-file-input></v-col>
      </v-row> -->
        <v-row dense class="mt-2 justify-center">
          <v-btn class="success mr-2" small @click="submit()">ส่ง</v-btn>
          <v-btn class="" small>ยกเลิก</v-btn>
        </v-row>
      </div>
    </v-container>
  </v-card>
</template>
_

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      data: null,
      selectedTime: null,
      isExamRequest: false,
      isNotAllowToRequest: true,
      isProject: null,
      isNotHasGroup: true,
      isCompleteAllForm: false,
      ProjectType: [
        { value: "1", text: "Pre-Project" },
        { value: "2", text: "Project" }
      ],
      windowHeight: 0,
      isLoaded: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
    // isProject() {
    //   return this.data.IsProject != true ? this.ProjectType.find(i => i.value == 1) : this.ProjectType.find(i => i.value == 2);
    // }
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  // watch: {
  //   // user() {
  //   //   this.loadData(); //จับตอน reload
  //   // }
  //   data: function() {
  //     this.isProject = this.data.IsProject != true ? this.ProjectType.find(i => i.value == 1) : this.ProjectType.find(i => i.value == 2);
  //   }
  // },
  methods: {
    async loadData() {
      const PreProjectExamPeriodStartDate = await this.App.Env("PreProjectExamPeriodStartDate");
      const PreProjectExamPeriodEndDate = await this.App.Env("PreProjectExamPeriodEndDate");
      const ProjectExamPeriodStartDate = await this.App.Env("ProjectExamPeriodStartDate");
      const ProjectExamPeriodEndDate = await this.App.Env("ProjectExamPeriodEndDate");
      this.isCompleteAllForm = await this.Form.IsCompleteAllForm(this.user.ProjectID);
      if (!this.user.ProjectID) {
        this.isNotHasGroup = true;
      } else {
        if (this.isCompleteAllForm) {
          await this.Project.Project(this.user.ProjectID).then(res => {
            this.data = res;
            this.isProject = this.data?.IsProject != true ? this.ProjectType.find(i => i.value == 1) : this.ProjectType.find(i => i.value == 2);
          });

          this.isExamRequest = await this.Project.IsExamRequest(this.user.ProjectID, this.data.IsProject ? 1 : 0);
          if (this.data.IsProject) {
            if (new Date().getTime() > new Date(ProjectExamPeriodStartDate).getTime() && new Date().getTime() < new Date(ProjectExamPeriodEndDate)) {
              this.isNotAllowToRequest = false;
            } else {
              this.isNotAllowToRequest = true;
            }
          } else {
            if (
              new Date().getTime() > new Date(PreProjectExamPeriodStartDate).getTime() &&
              new Date().getTime() < new Date(PreProjectExamPeriodEndDate)
            ) {
              this.isNotAllowToRequest = false;
            } else {
              this.isNotAllowToRequest = true;
            }
          }
        } else {
          this.isNotAllowToRequest = false;
        }
        this.isNotHasGroup = false;
      }
      this.isLoaded = true;
    },
    submit() {
      this.$swal
        .fire({
          title: "ยืนยันขอสอบหรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(async result => {
          if (result.isConfirmed) {
            await this.Project.SubmitExamRequest(this.user.ProjectID, this.selectedTime, this.data.IsProject, this.user.UserID);
            this.isExamRequest = await this.Project.IsExamRequest(this.user.ProjectID, this.data.IsProject ? 1 : 0);
          }
        });
    },
    onResize() {
      //page header 64px
      //table header 64px
      //mr-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    }
  }
};
</script>
<style scoped>
.tb-row {
  height: calc(100% / 20);
}
</style>
