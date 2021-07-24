<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-alert border="left" colored-border color="deep-purple" class="my-0 py-0" icon="mdi-school" prominent>
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
                v-if="meetingData.MeetingType !== this.user.UserTypeID"
                large
                class="mr-2"
                color="green"
                @click="approveItem(meetingData.MeetingID)"
              >
                mdi-tooltip-check
              </v-icon>
            </v-col>
            <v-col class="shrink">
              <v-icon
                v-if="meetingData.MeetingType !== this.user.UserTypeID"
                large
                class="mr-2"
                color="red"
                @click="decilneItem(meetingData.MeetingID)"
              >
                mdi-tooltip-remove
              </v-icon>
            </v-col>
            <v-col class="shrink">
              <v-icon v-if="meetingData.MeetingType == this.user.UserTypeID" large class="mr-2" @click="deleteItem(meetingData.MeetingID)">
                mdi-delete
              </v-icon>
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="py-0">
        <v-row>
          <v-col cols="12" class="pb-1">
            <v-card class="mx-auto">
              <v-toolbar dense dark color="brown darken-4">
                <v-toolbar-title><h5>โครงงาน</h5></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="showProject = !showProject">
                  <v-icon>{{ showProject ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                </v-btn>
              </v-toolbar>
              <v-expand-transition>
                <div v-show="showProject">
                  <v-divider></v-divider>
                  <v-card-text>
                    {{ meetingData.Meeting_Project.ProjectNameTH }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12" class="pb-1">
            <v-card class="mx-auto">
              <v-toolbar dense dark color="deep-orange">
                <v-toolbar-title><h5>อาจารย์</h5></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="showTeacher = !showTeacher">
                  <v-icon>{{ showTeacher ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                </v-btn>
              </v-toolbar>
              <v-expand-transition>
                <div v-show="showTeacher">
                  <v-divider></v-divider>
                  <v-card-text> {{ meetingData.Meeting_Teacher.Firstname }} {{ meetingData.Meeting_Teacher.Lastname }} </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12" class="pb-1">
            <v-card class="mx-auto">
              <v-toolbar dense dark color="deep-purple">
                <v-toolbar-title><h5>สมาชิกกลุ่ม</h5></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="showMember = !showMember">
                  <v-icon>{{ showMember ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                </v-btn>
              </v-toolbar>
              <v-expand-transition>
                <div v-show="showMember">
                  <v-divider></v-divider>
                  <v-card-text>
                    <p v-for="(item, index) in meetingData.Meeting_Project.Project_Members" :key="index">{{ item.Firstname }} {{ item.Lastname }}</p>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-card colored-border class="ma-0">
          <v-toolbar dense dark color="deep-purple">
            <v-toolbar-title>
              <h5>บันทึกการนัดหมาย</h5>
            </v-toolbar-title>
          </v-toolbar>
          <v-textarea v-model="meetingNote" label="Note" class="mx-4 mt-4"></v-textarea>
          <v-card-actions class="mx-2">
            <v-spacer></v-spacer>
            <v-btn text @click="$router.push('/student/meeting')">Cancel</v-btn>
            <v-btn color="deep-purple" dark @click="updateNote(meetingData.MeetingID, meetingNote)">
              <v-icon small>mdi mdi-content-save</v-icon> บันทึก</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showProject: false,
      showTeacher: false,
      showMember: false,
      meetingId: this.$route.params.id,
      meetingData: null,
      meetingNote: ""
    };
  },
  beforeMount() {
    this.LoadData();
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    })
  },
  methods: {
    async LoadData() {
      this.meetingData = await this.Meeting.findOne(this.meetingId);
      this.meetingNote = this.meetingData.Note;
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
              this.$swal.fire("สำเร็จ!", "อัปเดทข้อมูลเรียบร้อยแล้ว", "success");
              this.loadData();
            });
          }
        });
    }
  }
};
</script>
