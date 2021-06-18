<template>
  <div v-if="user.User_ProjectID" class="d-flex ma-2">
    <v-card class="elevation-1 mr-2" style="width:70%; min-height:89vh" tile :height="windowHeight">
      <v-toolbar flat color="white">
        <v-toolbar-title style="max-width:50%">
          {{ "Manage Group - " + (data.Project_NameTH ? data.Project_NameTH : "") }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-chip
          v-if="showLblIsAdvisorConfirmOrReject"
          label
          :color="data.Project_Status.ProjectStatus_ID == 7 ? 'red' : 'orange'"
          text-color="white"
          small
          >{{ txtInfoLabel }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-btn class="error white--text" @click="leaveProject">
          <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
          ออกจากกลุ่ม
        </v-btn>
      </v-toolbar>
    </v-card>
    <div style="width:30%">
      <v-card class="elevation-1 mb-2" tile>
        <v-card-text>{{ "สมาชิก" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Project_Members">
            <v-list-item :key="item.User_ID">
              <v-list-item-content>
                <v-list-item-title>{{ item.User_Firstname + " " + item.User_Lastname }}</v-list-item-title>
                <v-list-item-subtitle>{{ `รหัส : ${item.User_StudentID} ปีการศึกษา : ${item.User_AcademicYear}` }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index != data.Project_Members.length - 1" class="mx-2" :key="item"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card tile class="elevation-1 mb-2"
        ><v-card-text>{{ "อาจารย์ที่ปรึกษา" }}</v-card-text>
        <v-divider></v-divider>
        <v-list>
          <template v-for="(item, index) in data.Project_Advisors">
            <v-list-item :key="item.User_ID">
              {{ item.User_Firstname + " " + item.User_Lastname }}
            </v-list-item>
            <v-divider v-if="index != data.Project_Advisors.length - 1" class="mx-2" :key="item"></v-divider>
          </template>
        </v-list>
      </v-card>
      <div v-if="data.Project_Status.ProjectStatus_ID == 7">
        <v-card tile class="elevation-1 mb-2">
          <v-card-text>Remark</v-card-text>
          <v-divider></v-divider>
          <v-textarea rows="5" outlined class="ma-2 pb-2" background-color="amber lighten-5" readonly hide-details> </v-textarea>
        </v-card>
        <v-btn color="success" block>ส่งใหม่</v-btn>
      </div>
    </div>
  </div>
  <div v-else class="text-center" style="height:inherit">
    <div style="padding-top:19%">
      <v-icon size="128">mdi-alert-circle-outline</v-icon>
      <p>โปรดไปที่เมนู "โปรเจ็คทั้งหมด" เพื่อสร้างกลุ่มใหม่หรือเข้าร่วมกลุ่มก่อนจัดการโปรเจ็ค</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      loading: false,
      selfGroup: {},
      showLblIsAdvisorConfirmOrReject: false,
      txtInfoLabel: "aa",
      windowHeight: 0,
      data: {}
    };
  },
  watch: {
    data() {
      //เช็ค สถานะเป็น 1(Draft) 2(Wait Advisor) หรือ 7(Rejected) ให้แสดง label
      this.showLblIsAdvisorConfirmOrReject = [1, 2, 7].includes(this.data.Project_Status.ProjectStatus_ID);
      switch (this.data.Project_Status.ProjectStatus_ID) {
        case 1:
        case 2:
          this.txtInfoLabel = "รอการรับรองเป็นอาจารยที่ปรึกษา";
          break;
        case 7:
          this.txtInfoLabel = "อาจารย์ปฏิเสธเป็นที่ปรึกษา";
          break;
        default:
          break;
      }
      //TODO lbl หน้า project รอรับเป็นที่ปรึกษา กับ อาจารย์ ปฎิเสธ
    }
  },
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
  // watch: {
  //   user() {
  //     this.loadData(); //จับตอน reload
  //   }
  // },
  methods: {
    async loadData() {
      this.$store.dispatch("user/getLoggedInUserData").then(async () => {
        this.data = await this.Project.GetSelf(this.user.User_ProjectID);
        console.log(this.data, this.user.User_ProjectID);
        this.loading = true;
      });

      // console.log(this.data);
    },
    leaveProject() {
      this.$swal
        .fire({
          title: "ยืนยันที่จะออกจากกลุ่มหรือไม่?",
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
            this.Project.Leave(this.user.User_ProjectID, this.user.User_ID);
            this.$router.push("/student/all_project");
          }
        });
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    }
  }
};
</script>
<style scoped></style>
