<template>
  <div v-if="user.ProjectID" class="d-flex ma-2">
    <v-card class="elevation-1 mr-2" style="width: 70%" tile v-resize="onResize" :max-height="windowHeight">
      <v-toolbar flat color="white">
        <v-toolbar-title style="max-width: 50%">
          {{ txtHeaderNameTH }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-chip
          v-if="showLblIsAdvisorConfirmOrReject"
          label
          :color="data.Project_Status.ProjectStatusID == 8 ? 'red' : 'orange'"
          text-color="white"
          small
          >{{ txtInfoLabel }}</v-chip
        >
        <v-spacer></v-spacer>
        <!-- <v-btn class="mr-2" :color="isEdit ? 'amber' : 'primary'" @click="editForm">
          <v-icon class="mr-2">mdi-square-edit-outline</v-icon> แก้ไข
        </v-btn> -->
        <v-btn class="error white--text" @click="leaveProject">
          <v-icon class="mr-2">mdi-account-cancel-outline</v-icon>
          ออกจากกลุ่ม
        </v-btn>
      </v-toolbar>
      <v-container>
        <ValidationObserver ref="observer">
          <v-card
            v-if="!loading"
            class="ma-2 px-4 pa-2 elevation-0 overflow-y-auto"
            :style="{ 'max-height': windowHeight - 102 + 'px', height: windowHeight - 102 + 'px' }"
            outlined
          >
            <v-row dense v-for="item in title" :key="item.name">
              <v-col cols="3">
                <!-- <span v-if="item.name == 'RejectRemark' && data.Project_Status.ProjectStatus_ID != 7"></span> -->
                <span>{{ item.text }}</span>
              </v-col>
              <v-col cols="9">
                <div v-if="item.name == 'Project_Section'">
                  {{ data.Project_Section.TextDetail }}
                </div>
                <div v-else-if="item.name == 'Project_Status'">
                  <!-- <span>{{ data.Project_Status.ProjectStatusName }}</span> -->
                  <project-status :status="data.Project_Status.ProjectStatusID"></project-status>
                </div>
                <div v-else-if="item.name == 'ProjectDetail'">
                  <v-textarea v-model="data[item.name]" outlined rows="5" counter no-resize></v-textarea>
                </div>
                <div v-else-if="item.name == 'Exam'">
                  <!-- {{data[item.name].Project_Score}} -->
                  <v-data-table
                    :headers="projectScoreHeader"
                    :items="committeeScore"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    hide-default-footer
                  >
                    <template v-slot:[`item.Teacher.Firstname`]="{ item }">
                      {{ item.Teacher.Firstname + " " + item.Teacher.Lastname }}
                    </template>
                    <template slot="body.append">
                      <tr class="">
                        <th class="">รวม</th>
                        <th class="">{{ sumField("PresentScore") }}</th>
                        <th class="">{{ sumField("DocumentScore") }}</th>
                        <th class="">รวมทั้งสิ้น {{ sumField("PresentScore") + sumField("DocumentScore") }}</th>
                      </tr>
                    </template>
                  </v-data-table>
                </div>
                <div v-else>
                  <ValidationProvider v-slot="{ errors }" :name="item.text" rules="required">
                    <v-text-field v-model="data[item.name]" dense outlined :error-messages="errors"></v-text-field>
                  </ValidationProvider>
                </div>
              </v-col>
            </v-row>
            <div class="mr-4 my-4 text-center">
              <v-spacer></v-spacer>
              <v-btn v-if="data.Project_Status.ProjectStatusID == 8" class="mr-2" color="primary" @click="resend">ส่งคำขอใหม่</v-btn>
              <v-btn class="mr-2" color="success" @click="submitForm">บันทึก</v-btn>
              <!-- <v-btn class="" color="">ยกเลิก</v-btn> -->
            </div>
          </v-card>
        </ValidationObserver>
      </v-container>
    </v-card>
    <div style="width: 30%">
      <v-card class="elevation-1 mb-2" tile>
        <v-card-text class="d-flex">
          <span>สมาชิก</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editStudent = !editStudent" small>
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-card-text>
        <v-divider></v-divider>
        <div v-if="editStudent" class="mx-4 mt-2">
          <ValidationObserver ref="obsMembers">
            <ValidationProvider v-slot="{ errors }" name="สมาชิก" rules="select_required">
              <v-autocomplete
                :error-messages="errors"
                v-model="selectedMembers"
                :items="allStudent"
                color="blue-grey lighten-2"
                label="สมาชิก"
                item-value="UserID"
                multiple
                hide-no-data
                clearable
                outlined
                dense
              >
                <template v-slot:selection="member">
                  <v-chip v-bind="member.attrs" :input-value="member.selected" @click="member.select" @click:close="remove(member.item)" small>
                    {{ `${member.item.Firstname} ${member.item.Lastname}` }}
                  </v-chip>
                </template>
                <template v-slot:item="member">
                  <v-list-item-content>
                    <v-list-item-title :key="member.item.UserID">
                      {{ `${member.item.Firstname} ${member.item.Lastname}` }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </ValidationProvider>
          </ValidationObserver>
          <div class="d-flex pb-2">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" color="success" small @click="saveNewMember">เสร็จสิ้น</v-btn>
            <v-btn class="elevation-0" color="white" small @click="cancelEditMember">ยกเลิก</v-btn>
          </div>
        </div>

        <v-list v-if="!editStudent && loadMembersImg">
          <template v-for="(item, index) in newMembers">
            <v-list-item :key="item.UserID">
              <v-list-item-avatar v-if="item.ImgUrl">
                <v-img :src="item.ImgUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-avatar v-else left class="d-flex justify-center grey lighten-3" size="40">
                <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ item.Firstname + " " + item.Lastname }}</v-list-item-title>
                <v-list-item-subtitle>{{ `รหัส : ${item.StudentID} ปีการศึกษา : ${item.AcademicYear}` }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index != selectedMembers.length - 1" class="mx-2" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card tile class="elevation-1 mb-2">
        <v-card-text class="d-flex">
          <span class="align-self-center">อาจารย์ที่ปรึกษา</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editTeacher = !editTeacher" small>
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <div v-if="editTeacher" class="mx-4 mt-2">
          <ValidationObserver ref="obsAdvisors">
            <ValidationProvider v-slot="{ errors }" name="อาจารย์ที่ปรึกษา" rules="select_required">
              <v-autocomplete
                :error-messages="errors"
                v-model="selectedAdvisors"
                :items="allTeacher"
                color="blue-grey lighten-2"
                label="อาจารย์ที่ปรึกษา"
                item-value="UserID"
                multiple
                hide-no-data
                clearable
                outlined
                dense
              >
                <template v-slot:selection="teacher">
                  <v-chip v-bind="teacher.attrs" :input-value="teacher.selected" @click="teacher.select" @click:close="remove(teacher.item)" small>
                    {{ `${teacher.item.Firstname} ${teacher.item.Lastname}` }}
                  </v-chip>
                </template>
                <template v-slot:item="teacher">
                  <v-list-item-content>
                    <v-list-item-title :key="teacher.item.UserID">
                      {{ `${teacher.item.Firstname} ${teacher.item.Lastname}` }}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </ValidationProvider>
          </ValidationObserver>
          <div class="d-flex pb-2">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" color="success" small @click="saveNewAdvisors">เสร็จสิ้น</v-btn>
            <v-btn class="elevation-0" color="white" small @click="cancelEditTeacher">ยกเลิก</v-btn>
          </div>
        </div>
        <v-list v-if="!editTeacher && LoadAdvisorsImg">
          <template v-for="(item, index) in newAdvisors">
            <v-list-item :key="item.UserID">
              <v-list-item-avatar v-if="item.ImgUrl">
                <v-img :src="item.ImgUrl"></v-img>
              </v-list-item-avatar>
              <v-list-item-avatar v-else left class="d-flex justify-center grey lighten-3" size="40">
                <v-icon class="grey--text text-darken-2">mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                {{ item.Firstname + " " + item.Lastname }}
              </v-list-item-content>
            </v-list-item>
            <v-divider v-if="index != selectedAdvisors.length - 1" class="mx-2" :key="item.UserID"></v-divider>
          </template>
        </v-list>
      </v-card>
      <div v-if="data.Project_Status.ProjectStatusID == 8">
        <!-- <v-card tile class="elevation-1 mb-2">
          <v-card-text>Remark</v-card-text>
          <v-divider></v-divider>
          <v-textarea v-model="data.RejectedRemark" rows="4" outlined class="ma-2" background-color="amber lighten-5" readonly hide-details>
          </v-textarea>
          <div class="d-flex mx-2">
            <v-spacer></v-spacer>
            <span class="text-caption mb-2">{{ "- " + data.UpdatedUser.Firstname + " " + data.UpdatedUser.Lastname }}</span>
          </div>
        </v-card> -->
        <!-- <v-btn color="success" block @click="resend">ส่งใหม่</v-btn> -->
      </div>
    </div>
  </div>
  <div v-else class="text-center" style="height: inherit">
    <div style="padding-top: 19%">
      <v-icon size="128">mdi-alert-circle-outline</v-icon>
      <p>โปรดไปที่เมนู "โปรเจ็คทั้งหมด" เพื่อสร้างกลุ่มใหม่หรือเข้าร่วมกลุ่มก่อนจัดการโปรเจ็ค</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

import ProjectStatus from "@/components/ProjectStatus";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});
// extend("maxSelected", {
//   message: "{_field_} จำกัด {length} คน",
//   validate: (value, maxCount) => !!(value.length <= maxCount[0])
// });
extend("max", {
  ...max,
  message: "{_field_} จำกัด {length} ตัวอักษร"
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    ProjectStatus
  },
  data() {
    return {
      loading: false,
      selfGroup: {},
      showLblIsAdvisorConfirmOrReject: false,
      txtInfoLabel: "",
      windowHeight: 0,
      data: {},
      editTeacher: false,
      editStudent: false,
      allTeacher: [],
      allStudent: [],
      selectedAdvisors: [],
      selectedMembers: [],
      newAdvisors: [],
      newMembers: [],
      // isEdit: false,
      loadMembersImg: false,
      LoadAdvisorsImg: false,
      title: [
        { name: "ProjectNameTH", text: "ชื่อภาษาไทย" },
        { name: "ProjectNameEN", text: "ชื่อภาษาอังกฤษ" },
        { name: "ProjectDetail", text: "รายละเอียด" },
        { name: "Project_Section", text: "Section" },
        { name: "Project_Status", text: "สถานะ" },
        { name: "Exam", text: "คำแนนสอบ" }
      ],
      dayText: [
        { id: 1, text: "วันอาทิตย์" },
        { id: 2, text: "วันจันทร์" },
        { id: 3, text: "วันอังคาร" },
        { id: 4, text: "วันพุธ" },
        { id: 5, text: "วันพฤหัสบดี" },
        { id: 6, text: "วันศุกร์" },
        { id: 7, text: "วันเสาร์" }
      ],
      projectScoreHeader: [
        {
          text: "ชื่อ",
          align: "start",
          sortable: true,
          value: "Teacher.Firstname"
        },
        { text: "คะแนนการนำเสนอ", value: "PresentScore", sortable: false },
        { text: "คะแนนการรูปเล่ม", value: "DocumentScore", sortable: false },
        { text: "คอมเมนต์เพิ่มเติม", value: "Comment" }
      ],
      committeeScore: [],
      tblloading: false,
      txtHeaderNameTH: null
    };
  },
  watch: {
    data() {
      //เช็ค สถานะเป็น 1(Draft) 2(Wait Advisor) หรือ 7(Rejected) ให้แสดง label
      this.showLblIsAdvisorConfirmOrReject = [1, 2, 8].includes(this.data.Project_Status.ProjectStatusID);
      switch (this.data.Project_Status.ProjectStatusID) {
        case 1:
          this.txtInfoLabel = "โปรดส่ง CE01 เพื่อดำเนินการต่อไป";
          break;
        case 2:
          this.txtInfoLabel = "รอการรับรองเป็นอาจารยที่ปรึกษา";
          break;
        case 8:
          this.txtInfoLabel = "อาจารย์ไม่อนุมัติ";
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
        this.data = await this.Project.Project(this.user.ProjectID).then(res => {
          res.Project_Section.TextDetail = `Sec : ${res.Project_Section.Sequence}/${res.Project_Section.Year} อาจารย์ : ${
            res.Project_Section.Section_Instructor.Fullname
          } คาบเรียน : ${this.dayText[res.Project_Section.DayOfWeek - 1].text} ${res.Project_Section.StartTime.slice(
            0,
            5
          )} - ${res.Project_Section.EndTime.slice(0, 5)}`;

          this.txtHeaderNameTH = `Manage Project - ${res.ProjectNameTH}`;

          res.Project_Advisors.map(item => {
            this.selectedAdvisors.push(item.UserID);
          });
          res.Project_Members.map(item => {
            this.selectedMembers.push(item.UserID);
          });

          this.newMembers = res.Project_Members;
          Promise.all(
            this.newMembers.map(async item => {
              item.ImgUrl = await this.User.ProfileImage(item.UserID);
            })
          ).then(() => {
            this.loadMembersImg = true;
          });

          this.newAdvisors = res.Project_Advisors;
          Promise.all(
            this.newAdvisors.map(async item => {
              item.ImgUrl = await this.User.ProfileImage(item.UserID);
            })
          ).then(() => {
            this.LoadAdvisorsImg = true;
          });
          this.loading = false;
          return res;
        });
        this.committeeScore = this.data.Exam.Project_Score;
      });
      this.allTeacher = await this.User.UserTeacher();
      this.allStudent = await this.User.UserStudent();
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
            this.Project.Leave(this.user.ProjectID, this.user.UserID);
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
    },
    async saveNewAdvisors() {
      if (await this.$refs.obsAdvisors.validate()) {
        const temp = this.selectedAdvisors;
        this.newAdvisors = this.allTeacher.filter(item => {
          return temp.includes(item.UserID);
        });
        Promise.all(
          this.newAdvisors.map(async item => {
            item.ImgUrl = await this.User.ProfileImage(item.UserID);
          })
        ).then(() => {
          this.editTeacher = false;
        });
      }
    },
    cancelEditTeacher() {
      this.selectedAdvisors = [];
      this.newAdvisors.map(item => {
        this.selectedAdvisors.push(item.UserID);
      });
      this.editTeacher = false;
    },
    async saveNewMember() {
      if (await this.$refs.obsMembers.validate()) {
        const temp = this.selectedMembers;
        this.newMembers = this.allStudent.filter(item => {
          return temp.includes(item.UserID);
        });
        Promise.all(
          this.newMembers.map(async item => {
            item.ImgUrl = await this.User.ProfileImage(item.UserID);
          })
        ).then(() => {
          this.editStudent = false;
        });
      }
    },
    cancelEditMember() {
      this.selectedMembers = [];
      this.newMembers.map(item => {
        this.selectedMembers.push(item.UserID);
      });
      this.editStudent = false;
    },
    async resend() {
      const updateObj = {
        ProjectNameTH: this.data.ProjectNameTH,
        ProjectNameEN: this.data.ProjectNameEN,
        ProjectDetail: this.data.ProjectDetail
      };
      this.Project.Resend(this.user.UserID, this.data.ProjectID, updateObj, this.selectedAdvisors).then(() => {
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
        this.selectedAdvisors = [];
        this.selectedMembers = [];
        this.loadData();
      });
    },
    async imgUrl(pUserID) {
      return await this.User.ProfileImage(pUserID);
    },
    async submitForm() {
      const updateObj = {
        ProjectNameTH: this.data.ProjectNameTH,
        ProjectNameEN: this.data.ProjectNameEN,
        ProjectDetail: this.data.ProjectDetail
      };
      this.Project.Update(this.user.UserID, this.data.ProjectID, updateObj, this.selectedMembers, this.selectedAdvisors).then(() => {
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
        this.selectedAdvisors = [];
        this.selectedMembers = [];
        this.loadData();
      });
    },
    sumField(key) {
      // sum data in give key (property)
      return this.committeeScore.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
};
</script>
<style scoped></style>
