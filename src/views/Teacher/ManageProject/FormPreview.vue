<template>
  <div>
    <v-toolbar flat absolute width="100%">
      <v-toolbar-title
        >{{ form_export_name }}
        <v-breadcrumbs v-if="MenuID == 107" :items="breadcrumbs" large class="mr-4 pa-0">
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
      <!-- <v-btn icon tile @click="$refs.pdfComponent.print()">
        <v-icon>mdi-printer</v-icon>
      </v-btn> -->
      <div v-show="!isApprove">
        <v-btn class="success white--text mr-2" small @click="approveOrRejectForm(true)"><v-icon>mdi-check</v-icon>Approve</v-btn>
        <v-btn class="warning white--text mr-2" small @click="approveOrRejectForm(false)"><v-icon>mdi-undo-variant</v-icon>Revise</v-btn>
      </div>
      <v-btn class="cyan lighten-1 white--text" small :href="this.fileUrl" :download="form_export_name"
        ><v-icon>mdi-content-save-outline</v-icon>Download</v-btn
      >
    </v-toolbar>
    <div class="d-flex" style="height:inherit;padding-top:65px">
      <div v-if="form" style="width:100%" class="overflow-y-auto">
        <v-container class="pa-5">
          <div @mouseover="pdfmenu = true" @mouseleave="pdfmenu = false">
            <pdf ref="pdfComponent" :src="fileUrl" @num-pages="pageCount = $event" @page-loaded="currentPage = $event" :page="page"></pdf>
            <div v-show="pdfmenu" class="pdfmenu" @mouseover="pdfmenu = true" @mouseleave="pdfmenu = false">
              <v-card class="pdf-controller align-center d-flex mx-auto white--text" color="blue-grey lighten-2">
                <v-spacer></v-spacer>
                <v-btn @click="pageBack" icon>
                  <v-icon color="white">mdi-chevron-left</v-icon>
                </v-btn>

                <div class="d-flex mx-5">
                  <v-text-field
                    v-model.number="pageInput"
                    dense
                    dark
                    hide-details
                    @keypress.enter="gotoPage(pageInput)"
                    class="centered-input"
                  ></v-text-field>
                  <span class="pt-1">{{ "/ " + pageCount }}</span>
                </div>
                <v-btn @click="pageForward" icon>
                  <v-icon color="white">mdi-chevron-right</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
              </v-card>
            </div>
          </div>
        </v-container>
      </div>
      <v-navigation-drawer class="pr-10" :mini-variant="variant" right mini-variant-width="39" width="500">
        <div class="d-flex">
          <span class="ml-2" style="font-size:28px">COMMENT</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="cancelComment" color="blue" class="mr-2">
            <v-icon>mdi-sticker-plus-outline</v-icon>
          </v-btn>
        </div>
        <div v-if="newComment" class="ma-2">
          <v-textarea
            v-model="newCommentData"
            counter
            class="ma-2"
            outlined
            rows="3"
            auto-grow
            label="Add a comment"
            background-color="amber lighten-5"
            dense
            :autofocus="newComment"
          ></v-textarea>
          <div class="d-flex mb-5">
            <v-spacer></v-spacer>
            <v-btn class="mr-2" small color="success" @click="saveNewComment">
              Save
            </v-btn>
            <v-btn small text color="" @click="cancelComment">Cancel</v-btn>
          </div>
        </div>

        <template v-for="item in commentData">
          <v-card class="mb-2 mx-2 elevation-1" :key="item.CommentID">
            <v-card-text style="">
              <v-icon style="top:-5px">mdi-format-quote-open</v-icon>
              <span>{{ item.CommentText }}</span>
              <v-icon style="top:-5px">
                mdi-format-quote-close
              </v-icon>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-text class="d-flex">
              <span>
                {{ "- " + item.Comment_User.Firstname + " " + item.Comment_User.Lastname }}
              </span>
              <v-spacer></v-spacer>
              <span>
                {{ new Date(item.UpdatedTime).toLocaleDateString("th-TH") }}
              </span>
            </v-card-text>
          </v-card>
          <!-- <v-card :key="item.Comment_ID" class="elevation-0 mt-2">
            <div class="d-flex">
              <v-avatar color="blue" class="ml-4 mr-2" size="36">AA</v-avatar>
              <div>
                <div class="text-sm-body-2">{{ item.Comment_User.User_Firstname + " " + item.Comment_User.User_Lastname }}</div>
                <div class="text-caption">{{ new Date(item.Comment_DateTime).toLocaleDateString("th-TH") }}</div>
              </div>
            </div>
            <v-card-text class="mx-4">{{ item.Comment_Text }}</v-card-text>
            <v-divider class="mx-2"></v-divider>
          </v-card> -->
        </template>
      </v-navigation-drawer>
      <v-navigation-drawer absolute style="top:65px" right mini-variant mini-variant-width="39">
        <v-divider vertical style="float:right"></v-divider>
        <div>
          <v-btn icon style="float:right;z-index:10" tile @click="variant = !variant"><v-icon>mdi-comment-outline</v-icon></v-btn>
        </div>
        <!-- <div>
          <v-btn icon style="float:right;z-index:10" tile @click="approveOrRejectForm(true)"><v-icon>mdi-check</v-icon></v-btn>
        </div>
        <div>
          <v-btn icon style="float:right;z-index:10" tile @click="approveOrRejectForm(false)"><v-icon>mdi-undo-variant</v-icon></v-btn>
        </div> -->
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import { mapGetters } from "vuex";

export default {
  components: {
    pdf
  },
  data() {
    return {
      form: null,
      page: 1,
      pageInput: 1,
      pageCount: 0,
      newComment: false,
      newCommentData: "",
      commentData: [],
      variant: true,
      pdfmenu: false,
      fileUrl: null,
      isApprove: false
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    ProjectID() {
      return this.$route.query.pid;
    },
    FormID() {
      return this.$route.query.fid;
    },
    MenuID() {
      return this.$route.query.MenuID;
    },
    form_export_name() {
      return `Form_${this.form?.Form_Type.FormTypeName}`;
    },
    breadcrumbs() {
      return [
        {
          text: "ที่ปรึกษาโครงงาน",
          disabled: false,
          url: "/teacher/project_lists"
        },
        {
          text: "จัดการโปรเจ็ค",
          disabled: false,
          url: `/teacher/documents?pid=${this.ProjectID}`
        },
        {
          text: this.form?.Form_Type.FormTypeName,
          disabled: false,
          url: `/teacher/form_ce?project=${this.ProjectID}&type=${this.form?.Form_Type.FormTypeID}`
        },
        {
          text: this.form_export_name,
          disabled: true,
          url: "/teacher/form_preview"
        }
      ];
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.project = await this.Project.Project(this.ProjectID);
      this.form = await this.Form.Form(this.FormID);
      this.fileUrl = await this.Form.FormPDF(this.FormID);
      this.commentData = await this.Form.Comment(this.FormID);

      if (this.MenuID == 108) {
        this.isApprove = true;
      } else {
        if (this.form.FormStatusID != 1 && !!this.project.Project_Advisors.find(item => item.UserID == this.user.UserID)) {
          this.isApprove = true;
        } else if (this.form.FormStatusID != 2 && [3, 5].includes(this.user.UserTypeID)) {
          this.isApprove = true;
        }
      }
    },
    async saveNewComment() {
      await this.Form.NewComment(this.FormID, this.user.UserID, this.newCommentData);
      this.newComment = !this.newComment;
      this.newCommentData = "";
      this.loadData();
    },
    downloadFile() {
      window.URL.revokeObjectURL(this.fileUrl);
    },
    cancelComment() {
      this.newCommentData = "";
      this.newComment = !this.newComment;
    },
    pageBack() {
      if (this.page > 1) {
        this.page -= 1;
        this.pageInput = this.page;
      } else {
        this.pageInput = this.page;
      }
    },
    pageForward() {
      if (this.page < this.pageCount) {
        this.page += 1;
        this.pageInput = this.page;
      } else {
        this.pageInput = this.page;
      }
    },
    gotoPage(target) {
      if (/(?<=\s|^)\d+(?=\s|$)/.test(target)) {
        if (target > this.pageCount) {
          this.pageInput = this.pageCount;
          this.page = this.pageCount;
        } else if (target < 1) {
          this.pageInput = 1;
          this.page = 1;
        } else {
          this.page = target;
        }
      } else {
        this.pageInput = this.page;
      }
    },
    approveOrRejectForm(status) {
      this.$swal
        .fire({
          title: status == 1 ? "ยืนยันที่จะอนุมัติหรือไม่?" : "ยืนยันที่จะไม่อนุมัติหรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(async result => {
          if (result.isConfirmed) {
            await this.Form.ApproveOrReject(this.user.UserID, this.ProjectID, this.FormID, status)
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
    },
    rejectForm() {
      this.$swal
        .fire({
          title: "ยืนยันที่จะไม่อนุมัติหรือไม่?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$swal.fire({
              toast: true,
              icon: "success",
              title: "Rejected",
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: toast => {
                toast.addEventListener("mouseenter", this.$swal.stopTimer);
                toast.addEventListener("mouseleave", this.$swal.resumeTimer);
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped>
@media print {
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  body {
    padding-top: 72px;
    padding-bottom: 72px;
  }
}
.page-chevron {
  z-index: 1;
  bottom: 600px;
}
.page-chevron::after {
  background-color: transparent !important;
}
.page-chevron:hover {
  color: #616161;
  transform: scale(1.5);
}
.centered-input {
  position: relative;
  top: -2px;
  width: 30px;
}
.centered-input >>> input {
  text-align: center;
}
.pdfmenu {
  width: 100%;
  height: 50px;
  position: sticky;
  margin: 0 auto;
  bottom: 80px;
}
.pdf-controller {
  width: 400px;
  height: inherit;
}
.comment-section {
  width: 300px !important;
}
.centered-input {
  position: relative;
  top: -2px;
  width: 30px;
}
.centered-input >>> input {
  text-align: center;
}
</style>
