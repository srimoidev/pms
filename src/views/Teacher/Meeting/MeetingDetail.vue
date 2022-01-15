<template>
  <v-card class="ma-2 elevation-0 overflow-y-auto transparent" tile v-resize="onResize" :height="windowHeight">
    <v-container>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-alert border="left" colored-border color="primary" class="my-0 py-0 elevation-2" icon="mdi-calendar-clock" prominent>
            <v-row align="center">
              <v-col class="grow">
                <div class="text-h6">
                  {{ meetingData.Title }}
                </div>
                <div class="overline">
                  {{ new Date(meetingData.OnDate).toLocaleString("th-TH") }}
                </div>
              </v-col>
              <v-col class="shrink">
                <v-icon
                  v-if="meetingData.MeetingType != this.user.UserTypeID && meetingData.RequestStatus == 1"
                  class="mr-2"
                  color="green"
                  @click="approveItem(meetingData.MeetingID)"
                >
                  mdi-tooltip-check
                </v-icon>
              </v-col>
              <v-col class="shrink">
                <v-icon
                  v-if="meetingData.MeetingType != this.user.UserTypeID && meetingData.RequestStatus == 1"
                  class="mr-2"
                  color="red"
                  @click="decilneItem(meetingData.MeetingID)"
                >
                  mdi-tooltip-remove
                </v-icon>
              </v-col>
              <v-col v-if="meetingData.RequestStatus != 4 && meetingData.RequestStatus != 1" class="shrink">
                <v-icon class="mr-2" @click="deleteItem(meetingData.MeetingID)">
                  mdi-delete
                </v-icon>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="py-0">
          <v-card class="mx-auto elevation-2 my-3">
            <v-toolbar dense dark color="primary">
              <v-toolbar-title><h5>รายละเอียด</h5></v-toolbar-title>
            </v-toolbar>
            <v-expand-transition>
              <v-card-text>
                <v-alert dense text class="ma-0" :type="allMeetingStatus[meetingData.RequestStatus - 1].type">{{
                  allMeetingStatus[meetingData.RequestStatus - 1].name
                }}</v-alert>
                <v-divider class="my-3"></v-divider>
                <h3>รายละเอียดการนัดหมาย</h3>
                <span>{{ meetingData.Detail }}</span>
                <v-divider class="my-3"></v-divider>
                <h3>โครงงาน</h3>
                <span>{{ meetingData.Meeting_Project.ProjectNameTH }}</span>
                <v-divider class="my-3"></v-divider>
                <h3>สมาชิก</h3>
                <span v-for="(item, i) in meetingData.Meeting_Project.Project_Members" :key="i">{{ item.Fullname }}</span>
                <v-divider class="my-3"></v-divider>
                <h3>อาจารย์ที่ปรึกษา</h3>
                <span v-for="(item, i) in meetingData.Meeting_Project.Project_Advisors" :key="i">{{ item.Fullname }}</span>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card colored-border class="ma-0">
            <v-toolbar dense dark color="primary">
              <v-toolbar-title>
                <h5>บันทึกการนัดหมาย</h5>
              </v-toolbar-title>
            </v-toolbar>
            <v-textarea v-model="meetingData.Note" label="Note" class="mx-4 mt-4" auto-grow></v-textarea>
            <v-card-actions class="mx-2">
              <v-spacer></v-spacer>
              <v-btn color="success" dark @click="updateNote(meetingData.MeetingID, meetingData.Note)">
                <v-icon small class="mr-1">mdi mdi-content-save</v-icon>บันทึก
              </v-btn>
              <v-btn text to="/teacher/meeting">กลับ</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      meetingData: {},
      allMeetingStatus: [
        { id: 1, name: "กำลังนำเนินการ", type: "info" },
        { id: 2, name: "อนุมัติแล้ว", type: "success" },
        { id: 3, name: "ถูกปฏิเสธ", type: "warning" },
        { id: 4, name: "ยกเลิกการนัดหมาย", type: "error" }
      ]
    };
  },
  beforeMount() {
    this.loadData();
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    meetingId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async loadData() {
      this.meetingData = await this.Meeting.findOne(this.meetingId);
    },
    deleteItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการยกเลิกการนัดหมายใช่หรือไม่ ?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.Delete(pID).then(() => {
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
    approveItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการยืนยันการนัดหมายใช่หรือไม่?",
          text: "You won't be able to revert this!",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.Approve(pID).then(() => {
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
    decilneItem(pID) {
      this.$swal
        .fire({
          title: "คุณต้องการปฎิเสธการนัดหมายใช่หรือไม่?",
          text: "You won't be able to revert this!",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.Decline(pID).then(() => {
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
    updateNote(pID, pNote) {
      this.$swal
        .fire({
          title: "คุณต้องการอัปเดทโน๊ตการนัดหมายใช่หรือไม่?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Meeting.UpdateNote(pID, pNote).then(() => {
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
    }
  },
  onResize() {
    this.windowHeight = window.innerHeight - 64 - 16;
  }
};
</script>
