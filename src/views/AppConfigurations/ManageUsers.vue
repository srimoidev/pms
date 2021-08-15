<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-data-table
      v-model="selectedUser"
      :headers="headers"
      :items="filteredItems"
      :loading="loading"
      :item-class="rowStyle"
      :search="searchText"
      item-key="UserID"
      loading-text="Loading... Please wait"
      show-select
      :height="windowHeight - 64 - 59"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            จัดการผู้ใช้
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="searchText" append-icon="mdi-magnify" label="Search" single-line hide-details class="mr-10"></v-text-field>
          <v-select
            v-model="typeFilter"
            :items="userType"
            item-text="UserTypeName"
            item-value="UserTypeID"
            hide-details
            outlined
            dense
            label="Type"
            class="mr-2"
            style="width:1%"
          ></v-select>
          <v-spacer></v-spacer>

          <v-btn class="primary white--text mr-2" @click="modalNewUser = !modalNewUser" small>
            <v-icon class="mr-2">mdi-text-box-plus-outline</v-icon>
            เพิ่มผู้ใช้
          </v-btn>
          <v-btn class="success mr-2" @click="modalImportExcel = !modalImportExcel" small>
            <v-icon class="mr-2">mdi-file-excel-outline</v-icon>
            Import
          </v-btn>
          <v-btn class="" color="error" @click="deleteSelectedUser" small>ลบรายการที่เลือก</v-btn>
          <template>
            <modal-container :active="modalImportExcel" :cancellable="1">
              <template>
                <v-card width="600" height="200">
                  <v-card-title class="blue white--text">
                    <span>Import User</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="closeModalImportExcel">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <div class="pa-5">
                    <v-file-input
                      v-model="filename"
                      clearable
                      accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
                  <a class="d-inline-flex ml-6 mt-4" @click="downloadTemplate">Download Template</a>
                  <v-btn class="success" style="position: absolute; right: 20px;" right @click="importUser">Apply</v-btn>
                </v-card>
              </template>
            </modal-container>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:[`item.IsActive`]="{ item }">
        <v-chip class="error" :class="{ success: item.IsActive, 'px-4': item.IsActive }" small>
          {{ item.IsActive ? "Active" : "Inactive" }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" size="20" @click="editUser(item)">
              mdi-square-edit-outline
            </v-icon>
          </template>
          <span>แก้ไข</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" class="mr-2" size="20" @click="deleteUser(item)">
              mdi-delete-outline
            </v-icon>
          </template>
          <span>ลบ</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <modal-container :active="modalNewUser" :cancellable="1" :width="1000">
      <template>
        <v-card width="1000">
          <v-card-title class="blue white--text">
            <span>เพิ่มผู้ใช้</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="modalNewUserClose">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <div>
            <v-row no-gutters>
              <v-col cols="4">
                <v-card
                  class="elevation-0 pa-2 my-4 mx-auto"
                  outlined
                  width="218"
                  height="218"
                  @mouseenter="editImgProfile = true"
                  @mouseleave="editImgProfile = false"
                  style="cursor: pointer"
                  @click="$refs.imgInput.click()"
                >
                  <v-avatar color="grey lighten-2" rounded size="200">
                    <v-img :src="selectedImgUrl ? selectedImgUrl : require('../../assets/images/profile_default.jpeg')"></v-img>
                    <v-icon v-show="editImgProfile" class="grey--text text--darken-2" style="position:absolute" right size="24">mdi-pencil</v-icon>
                  </v-avatar>
                  <input ref="imgInput" class="d-none" type="file" accept="image/jpeg" @change="uploadProfileImg" />
                </v-card>
                <v-select
                  v-model="newUserType"
                  :items="userTypeForNewUser"
                  item-text="UserTypeName"
                  item-value="UserTypeID"
                  class="mx-14"
                  hide-details
                  outlined
                  dense
                  :disabled="isEdit"
                >
                </v-select>
                <div v-if="isEdit" class="mx-15">
                  <v-radio-group v-model="rdoActive" row hide-details>
                    <v-radio color="success" label="Active" :value="true"></v-radio>
                    <v-radio color="error" label="Inactive" :value="false"></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
              <v-col cols="8">
                <ValidationObserver ref="observer">
                  <div class="mt-4 mr-4">
                    <ValidationProvider v-slot="{ errors }" name="ชื่อผู้ใช้" rules="required|username">
                      <v-text-field v-model="txtUsername" label="ชื่อผู้ใช้" outlined dense :error-messages="errors" :disabled="isEdit">
                        <template v-slot:[`append-outer`] v-if="!isEdit">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="primary" small v-bind="attrs" v-on="on" class="mx-4" @click="validate">ตรวจสอบ</v-btn>
                            </template>
                            <span>ตรวจสอบ</span>
                          </v-tooltip>
                        </template>
                        <template v-slot:[`append`]>
                          <div v-if="isValid != null">
                            <div v-if="isValid">
                              <span class="text-caption mr-2">สามารถใช้ได้</span>
                              <v-icon color="success">mdi-check-circle-outline</v-icon>
                            </div>
                            <div v-else>
                              <span class="text-caption mr-2">ชื่อผู้ใช้ซ้ำ</span>
                              <v-icon color="error">mdi-close-circle-outline</v-icon>
                            </div>
                          </div>
                        </template>
                      </v-text-field>
                    </ValidationProvider>
                    <v-row no-gutters>
                      <v-col cols="6"
                        ><ValidationProvider v-slot="{ errors }" name="password" :rules="!isEdit ? 'required' : ''">
                          <v-text-field
                            v-model="txtPassword"
                            class="mr-2"
                            label="รหัสผ่าน"
                            type="password"
                            outlined
                            dense
                            :error-messages="errors"
                          ></v-text-field> </ValidationProvider
                      ></v-col>
                      <v-col cols="6"
                        ><ValidationProvider
                          v-slot="{ errors }"
                          name="confirm"
                          :rules="!isEdit ? 'required|password:@password' : txtPassword ? 'required|password:@password' : ''"
                        >
                          <v-text-field
                            v-model="txtConfirmPassword"
                            label="ยืนยันรหัสผ่าน"
                            type="password"
                            outlined
                            dense
                            :error-messages="errors"
                          ></v-text-field> </ValidationProvider
                      ></v-col>
                    </v-row>

                    <v-row no-gutters>
                      <v-col cols="3">
                        <ValidationProvider v-slot="{ errors }" name="คำนำหน้า" rules="select_required">
                          <v-select
                            v-model="txtPrefix"
                            class="mr-2"
                            :items="['นาย', 'นางสาว', 'นาง']"
                            label="คำนำหน้า"
                            outlined
                            dense
                            :error-messages="errors"
                          ></v-select>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="9">
                        <v-row no-gutters>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" name="ชื่อ" rules="required">
                              <v-text-field v-model="txtFirstname" class="mr-2" label="ชื่อ" outlined dense :error-messages="errors"></v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="6">
                            <ValidationProvider v-slot="{ errors }" name="นามสกุล" rules="required">
                              <v-text-field v-model="txtLastname" label="นามสกุล" outlined dense :error-messages="errors"></v-text-field>
                            </ValidationProvider>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-text-field v-model="txtStudentID" label="รหัสนักศึกษา" outlined dense></v-text-field>
                    <ValidationProvider v-slot="{ errors }" name="อีเมลล์" rules="email">
                      <v-text-field v-model="txtEmail" label="อีเมลล์" outlined dense :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="เบอร์โทรศัพท์" rules="numeric">
                      <v-text-field v-model="txtTelephoneNo" label="เบอร์โทรศัพท์" outlined dense :error-messages="errors"></v-text-field>
                    </ValidationProvider>
                  </div>
                </ValidationObserver>
              </v-col>
            </v-row>
          </div>
          <div class="d-flex pa-4">
            <v-spacer></v-spacer>
            <v-btn v-if="!isEdit" class="mr-2" color="success" @click="saveNewUser">บันทึก</v-btn>
            <v-btn v-else class="mr-2" color="success" @click="updateUser">บันทึก</v-btn>
            <v-btn color="">ยกเลิก</v-btn>
          </div>
        </v-card>
      </template>
    </modal-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import ModalContainer from "@/components/ModalContainer";

import { required, email, numeric } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "โปรดกรอก {_field_}"
});

extend("select_required", {
  ...required,
  message: "โปรดเลือก {_field_}"
});
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "พาสเวิร์ดไม่ตรงกัน"
});
extend("email", {
  ...email,
  message: "{_field_} ไม่ถูกต้อง"
});
extend("numeric", {
  ...numeric,
  message: "{_field_} ไม่ถูกต้อง"
});
extend("username", {
  message: "ภาษาอักกฤษและตัวเลขเท่านั้น, อย่างน้อย 6 ตัวอักษร, ขึ้นต้นด้วยภาษาอังกฤษ",
  validate: value => /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(value)
});
export default {
  components: {
    ModalContainer,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      allUser: [],
      headers: [
        { text: "ชื่อ-นามสกุล", value: "Fullname", sortable: true },
        { text: "รหัสนักศึกษา", value: "StudentID", sortable: false },
        { text: "อีเมลล์", value: "Email", sortable: false },
        { text: "เบอร์โทรศัพท์", value: "TelephoneNo" },
        // { text: "ประเภท", value: "UserTypeID" },
        { text: "สถานะ", value: "IsActive" },
        { text: "", value: "actions" }
      ],
      isEdit: false,
      typeFilter: 1,
      searchText: "",
      userType: [],
      newUserType: 1,
      windowHeight: 0,
      loading: true,
      modalImportExcel: false,
      filename: null,
      modalNewUser: false,
      editImgProfile: false,
      importedData: [],
      selectedUser: [],
      selectedImgUrl: null,
      selectedImg: null,
      txtUsername: "",
      txtPassword: "",
      txtConfirmPassword: "",
      txtPrefix: "",
      txtFirstname: "",
      txtLastname: "",
      txtStudentID: "",
      txtEmail: "",
      txtTelephoneNo: "",
      updatedUserID: null,
      isValid: null,
      rdoActive: true,
      progress: 0
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    filteredItems() {
      return this.allUser?.filter(item => {
        return !this.typeFilter || item.UserTypeID == this.typeFilter;
      });
    },
    userTypeForNewUser() {
      return this.userType.filter(o => o.UserTypeID != 4);
    }
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
      this.userType = await this.User.Type();
      this.allUser = await this.User.All();
      this.loading = false;
    },
    selectFile(event) {
      this.importedData = this.Utils.ExcelToArray(event, 2);
    },
    async downloadTemplate() {
      const fileUrl = await this.User.DownloadTemplate();
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "Import User Template");
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(fileUrl);
    },
    importUser() {
      let validation = true;
      console.log(this.importedData);
      for (const item of this.importedData) {
        /**
         * ===== Username Validation Rules =====
         * 1. Minimum 6 characters
         * 2. Only numbers are not allowed at least one character should be there
         * 3. No special characters allowed except _
         * 4. No space allowed
         * 5. Character only is allowed
         *
         * ===== Email Validation Rules =====
         * 1. Email form
         *
         * ===== Telephone Number Validation Rules =====
         * 1. Number Only
         *
         * ===== Require Field =====
         * Username,Password,Prefix,Firstname,Lastname
         */
        const username_validate = new RegExp("^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$");
        const email_validate = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
        const tel_validate = new RegExp("^[0-9]*$");
        console.log(!item.Username, !username_validate.test(item.Username), !!(!item.Username && !username_validate.test(item.Username)));
        if (
          !item.Username ||
          !username_validate.test(item.Username) ||
          !item.Password ||
          !item.Prefix ||
          !item.Firstname ||
          !item.Lastname ||
          !!(item.Email && !email_validate.test(item.Email)) ||
          !!(item.TelephoneNo && !tel_validate.test(item.TelephoneNo))
        ) {
          this.$swal.fire({
            // title: `<span style="font-size:18px">${res.msg}</span>`,
            text: "ข้อมูลที่ Import ไม่ถูกต้องโปรดตรวจสอบและ Import ใหม่",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "ยืนยัน!"
          });
          validation = false;
          break;
        }
      }
      if (validation) {
        this.User.ImportUser(this.user.UserID, this.importedData, event => {
          this.progress = Math.round((100 * event.loaded) / event.total);
        }).then(res => {
          if (res) {
            this.$swal.fire({
              title: `<span style="font-size:18px">${res.msg}</span>`,
              text: res.duplicate,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ยืนยัน!"
            });
            this.importedData = null;
            this.filename = null;
          } else {
            this.$swal.fire({
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              position: "top-end",
              toast: true,
              icon: "success",
              title: "Success"
            });
          }
          this.loadData();
          this.modalImportExcel = false;
        });
      }
    },
    closeModalImportExcel() {
      this.filename = null;
      this.modalImportExcel = false;
    },
    deleteUser(user) {
      this.$swal
        .fire({
          title: `<span style="font-size:24px"><strong>ยืนยันที่จะลบผู้ใช้</strong><br /><span style="font-size:18px">${user.Fullname} ?</span></span>`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#4caf50",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.User.Delete(user.UserID).then(() => {
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
    deleteSelectedUser() {
      if (this.selectedUser.length > 0) {
        var UserIDs = [];
        this.selectedUser.forEach(element => {
          UserIDs.push(element.UserID);
        });
        this.User.BulkDelete(UserIDs).then(() => {
          this.loadData();
        });
      } else {
        this.$swal.fire({
          title: `<span style="font-size:24px"><strong>คุณไม่ได้เลือกรายการใดๆ</strong></span>`,
          icon: "error",
          confirmButtonColor: "#BDBDBD",
          confirmButtonText: "ปิด"
        });
      }
    },
    modalNewUserClose() {
      this.isEdit = false;
      this.modalNewUser = false;
      this.txtUsername = "";
      this.txtPassword = "";
      this.txtConfirmPassword = "";
      this.txtPrefix = "";
      this.txtFirstname = "";
      this.txtLastname = "";
      this.txtStudentID = "";
      this.txtEmail = "";
      this.txtTelephoneNo = "";
      this.isValid = null;
      this.selectedImgUrl = null;
      this.selectedImg = null;
      this.newUserType = 1;
      this.$refs.observer.reset();
      window.URL.revokeObjectURL(this.selectedImgUrl);
    },
    uploadProfileImg(event) {
      window.URL.revokeObjectURL(this.selectedImgUrl);
      if (event.target?.files[0]) {
        this.selectedImgUrl = window.URL.createObjectURL(event.target.files[0]);
        this.selectedImg = event.target.files[0];
      }
    },
    async editUser(item) {
      this.isEdit = true;
      this.modalNewUser = true;
      this.updatedUserID = item.UserID;
      this.txtUsername = item.Username;
      this.txtPrefix = item.Prefix;
      this.txtFirstname = item.Firstname;
      this.txtLastname = item.Lastname;
      this.txtStudentID = item.StudentID;
      this.txtEmail = item.Email;
      this.txtTelephoneNo = item.TelephoneNo;
      this.newUserType = item.UserTypeID;
      this.rdoActive = item.IsActive;
      this.selectedImgUrl = await this.User.ProfileImage(item.UserID);
    },
    async saveNewUser() {
      if (await this.$refs.observer.validate()) {
        this.User.New(
          this.user.UserID,
          this.txtUsername,
          this.txtPassword,
          this.txtPrefix,
          this.txtFirstname,
          this.txtLastname,
          this.txtStudentID,
          this.txtEmail,
          this.txtTelephoneNo,
          this.newUserType,
          this.selectedImg
        ).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.modalNewUserClose();
          this.loadData();
        });
      }
    },
    async updateUser() {
      if (await this.$refs.observer.validate()) {
        this.User.Update(
          this.user.UserID,
          this.updatedUserID,
          this.txtPassword,
          this.txtPrefix,
          this.txtFirstname,
          this.txtLastname,
          this.txtStudentID,
          this.txtEmail,
          this.txtTelephoneNo,
          this.rdoActive,
          this.selectedImg
        ).then(() => {
          this.$swal.fire({
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
            icon: "success",
            title: "Success"
          });
          this.modalNewUserClose();
          if (this.user.UserID == this.updatedUserID) {
            this.$store.dispatch("user/getLoggedInUserData").then(() => {
              this.loadData();
            });
          } else {
            this.loadData();
          }
        });
      }
    },
    validate() {
      if (this.txtUsername) {
        this.User.Validate(this.txtUsername).then(res => {
          this.isValid = res;
        });
      }
    },
    onResize() {
      //page header 64px
      //table header 64px
      //ma-2 8+8 px
      //table footer 59px
      this.windowHeight = window.innerHeight - 64 - 16;
    },
    rowStyle() {
      return "tb-row";
    }
  }
};
</script>
<style scoped>
.tb-row {
  height: calc(100% / 20);
}
.u-type-1 {
  color: white !important;
  background-color: #7986cb !important;
}
.u-type-2 {
  color: white !important;
  background-color: #4db6ac !important;
}
.u-type-2 {
  color: white !important;
  background-color: #dce775 !important;
}
.u-type-3 {
  color: white !important;
  background-color: #f06292 !important;
}
</style>
