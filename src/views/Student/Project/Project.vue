<template>
  <div v-if="user.User_ProjectID" class="d-flex ma-2">
    <v-card class="elevation-1 mr-2" style="width:70%;" tile v-resize="onResize" :height="windowHeight">
      <v-toolbar flat color="white">
        <v-toolbar-title style="max-width:50%">
          {{ txtHeaderNameTH }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-chip
          v-if="showLblIsAdvisorConfirmOrReject"
          label
          :color="data.Project_Status.ProjectStatus_ID == 8 ? 'red' : 'orange'"
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
      <v-container>
        <ValidationObserver ref="observer">
          <v-card class="ma-2 px-4 pa-2 elevation-0" outlined :height="windowHeight - 100">
            <v-row dense v-for="item in title" :key="item.name">
              <v-col cols="3">
                <!-- <span v-if="item.name == 'RejectRemark' && data.Project_Status.ProjectStatus_ID != 7"></span> -->
                <span>{{ item.text }}</span>
              </v-col>
              <v-col cols="9">
                <div v-if="item.name == 'Project_Members' || item.name == 'Project_Advisors'">
                  <template v-for="i in data[item.name]">
                    <div :key="i.UserID">
                      <v-chip label class="mb-2">
                        <v-avatar left color="blue">
                          <v-icon color="white">mdi-account</v-icon>
                        </v-avatar>
                        <span class="grey--text text--darken-1">{{ i.User_Firstname + " " + i.User_Lastname }}</span>
                      </v-chip>
                    </div>
                  </template>
                </div>
                <div v-else-if="item.name == 'Project_Section'">
                  {{ data[item.name].Section_Name }}
                </div>
                <div v-else-if="item.name == 'Project_Status'">
                  <span>{{ data.Project_Status.ProjectStatus_Name }}</span>
                </div>
                <div v-else-if="item.name == 'Project_Detail'">
                  <v-textarea
                    v-model="data[item.name]"
                    outlined
                    rows="5"
                    counter
                    no-resize
                    :readonly="data.Project_Status.ProjectStatus_ID != 8"
                    :error-messages="errors"
                  ></v-textarea>
                </div>

                <div v-else>
                  <ValidationProvider v-slot="{ errors }" :name="item.text" rules="required">
                    <v-text-field
                      v-model="data[item.name]"
                      dense
                      outlined
                      :readonly="data.Project_Status.ProjectStatus_ID != 8"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </ValidationObserver>
      </v-container>
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
      <v-card tile class="elevation-1 mb-2">
        <v-card-text class="d-flex">
          <span class="align-self-center">อาจารย์ที่ปรึกษา</span>
          <v-spacer></v-spacer>
          <v-btn v-if="data.Project_Status.ProjectStatus_ID == 8" icon @click="modalEditTeacher = !modalEditTeacher" small>
            <v-icon>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <div v-if="modalEditTeacher" class="mx-4 mt-2">
          <ValidationObserver ref="obsAdvisors">
            <ValidationProvider v-slot="{ errors }" name="อาจารย์ที่ปรึกษา" rules="select_required|maxSelected:2">
              <v-autocomplete
                :error-messages="errors"
                v-model="selectedAdvisors"
                :items="allTeacher"
                color="blue-grey lighten-2"
                label="อาจารย์ที่ปรึกษา"
                :item-text="User_Firstname + ' ' + User_Lastname"
                item-value="User_ID"
                multiple
                hide-no-data
                clearable
                outlined
                dense
              >
                <template v-slot:selection="teacher">
                  <v-chip v-bind="teacher.attrs" :input-value="teacher.selected" @click="teacher.select" @click:close="remove(teacher.item)" small>
                    {{ `${teacher.item.User_Firstname} ${teacher.item.User_Lastname}` }}
                  </v-chip>
                </template>
                <template v-slot:item="teacher">
                  <v-list-item-content>
                    <v-list-item-title :key="teacher.item.User_ID">
                      {{ `${teacher.item.User_Firstname} ${teacher.item.User_Lastname}` }}
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
        <v-list v-if="!modalEditTeacher">
          <template v-for="(item, index) in newAdvisors">
            <v-list-item :key="item.User_ID">
              {{ item.User_Firstname + " " + item.User_Lastname }}
            </v-list-item>
            <v-divider v-if="index != selectedAdvisors.length - 1" class="mx-2" :key="item"></v-divider>
          </template>
        </v-list>
      </v-card>
      <div v-if="data.Project_Status.ProjectStatus_ID == 8">
        <v-card tile class="elevation-1 mb-2">
          <v-card-text>Remark</v-card-text>
          <v-divider></v-divider>
          <v-textarea v-model="data.RejectedRemark" rows="4" outlined class="ma-2" background-color="amber lighten-5" readonly hide-details>
          </v-textarea>
          <div class="d-flex mx-2">
            <v-spacer></v-spacer>
            <span class="text-caption mb-2">{{ "- " + data.UpdatedUser.User_Firstname + " " + data.UpdatedUser.User_Lastname }}</span>
          </div>
        </v-card>
        <v-btn color="success" block @click="resend">ส่งใหม่</v-btn>
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
import { required, max } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});
extend("maxSelected", {
  message: "{_field_} จำกัด {length} คน",
  validate: (value, maxCount) => !!(value.length <= maxCount[0])
});
extend("max", {
  ...max,
  message: "{_field_} จำกัด {length} ตัวอักษร"
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      loading: false,
      selfGroup: {},
      showLblIsAdvisorConfirmOrReject: false,
      txtInfoLabel: "",
      windowHeight: 0,
      data: {},
      modalEditTeacher: false,
      allTeacher: [],
      selectedAdvisors: [],
      newAdvisors: [],
      title: [
        { name: "Project_NameTH", text: "ชื่อภาษาไทย" },
        { name: "Project_NameEN", text: "ชื่อภาษาอังกฤษ" },
        { name: "Project_Detail", text: "รายละเอียด" },
        // { name: "Project_Members", text: "สมาชิก" },
        // { name: "Project_Advisors", text: "อาจารย์ที่ปรึกษา" },
        { name: "Project_Section", text: "คาบเรียน" },
        { name: "Project_Status", text: "สถานะ" }
      ],
      txtHeaderNameTH: null
    };
  },
  watch: {
    data() {
      //เช็ค สถานะเป็น 1(Draft) 2(Wait Advisor) หรือ 7(Rejected) ให้แสดง label
      this.showLblIsAdvisorConfirmOrReject = [1, 2, 8].includes(this.data.Project_Status.ProjectStatus_ID);
      switch (this.data.Project_Status.ProjectStatus_ID) {
        case 1:
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
        this.data = await this.Project.GetSelf(this.user.User_ProjectID);
        this.txtHeaderNameTH = `Manage Project - ${this.data.Project_NameTH}`;
        this.data.Project_Advisors.map(item => {
          this.selectedAdvisors.push(item.User_ID);
        });
        this.newAdvisors = this.data.Project_Advisors;
        this.loading = true;
      });
      this.allTeacher = await this.User.UserTeacher();
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
    },
    async saveNewAdvisors() {
      if (await this.$refs.obsAdvisors.validate()) {
        const temp = this.selectedAdvisors;
        this.newAdvisors = this.allTeacher.filter(item => {
          return temp.includes(item.User_ID);
        });
        this.modalEditTeacher = false;
      }
    },
    cancelEditTeacher() {
      this.selectedAdvisors = [];
      this.newAdvisors.map(item => {
        this.selectedAdvisors.push(item.User_ID);
      });
      this.modalEditTeacher = false;
    },
    async resend() {
      const updateObj = {
        Project_NameTH: this.data.Project_NameTH,
        Project_NameEN: this.data.Project_NameEN,
        Project_Detail: this.data.Project_Detail
      };
      this.Project.Resend(this.data.Project_ID, updateObj, this.selectedAdvisors).then(() => {
        this.loadData();
      });
    }
  }
};
</script>
<style scoped></style>
