<template>
  <div>
    <v-toolbar flat absolute width="100%">
      <v-toolbar-title>Form_CE01 - {{ form_id }}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn icon tile @click="$refs.pdfComponent.print()">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn class="cyan lighten-1 white--text" small>Download</v-btn>
    </v-toolbar>
    <div class="d-flex" style="height:inherit;padding-top:65px">
      <div v-if="form" style="width:100%" class="overflow-y-auto">
        <v-container class="pa-5">
          <div @mouseover="pdfmenu = !pdfmenu" @mouseleave="pdfmenu = !pdfmenu">
            <pdf
              ref="pdfComponent"
              :src="getFileUrl(form.Form_FileName)"
              @num-pages="pageCount = $event"
              @page-loaded="currentPage = $event"
              :page="page"
            ></pdf>
          </div>

          <!-- <div v-show="pdfmenu" class="red pdfmenu">asdasdas</div> -->
        </v-container>
      </div>
      <v-navigation-drawer class="pr-10" :mini-variant="variant" right mini-variant-width="39" width="500">
        <div class="d-flex">
          <div class="font-weight-bold" style="font-size:28px">Comment</div>
          <v-spacer></v-spacer>
          <v-btn icon @click="cancelComment" color="blue" class="mr-2">
            <v-icon>mdi-file-document-multiple-outline</v-icon>
          </v-btn>
        </div>
        <div v-if="newComment" class="ma-2">
          <v-textarea
            v-model="newCommentData"
            counter
            class="ma-2"
            outlined
            rows="2"
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
          <v-card class="mb-2 mx-2 elevation-1" :key="item.Comment_ID">
            <v-card-text>
              <v-icon style="top:-5px">mdi-format-quote-open</v-icon>
              {{ item.Comment_Text }}
              <v-icon style="top:-5px">
                mdi-format-quote-close
              </v-icon>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-text class="d-flex">
              <span>
                {{ "- " + item.Comment_User.User_Firstname + " " + item.Comment_User.User_Lastname }}
              </span>
              <v-spacer></v-spacer>
              <span>
                {{ new Date(item.Comment_DateTime).toLocaleDateString("th-TH") }}
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
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
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
      pdfmenu: true
    };
  },
  computed: {
    form_id() {
      return this.$route.query.d;
    }
  },
  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.loadData();
  },
  methods: {
    async loadData() {
      this.form = await this.Form.Form(this.form_id);

      this.commentData = await this.Form.Comment(this.form_id);
      console.log(this.commentData);
    },
    async saveNewComment() {
      await this.Form.NewComment(this.form_id, this.user.User_ID, this.newCommentData);
      this.newComment = !this.newComment;
      this.newCommentData = "";
      this.loadData();
    },
    getFileUrl(fileName) {
      return `http://${process.env.VUE_APP_API_LOCALHOST}/${fileName}`;
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
    }
  }
};
</script>

<style scoped>
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
  width: 500px;
  height: 50px;
  position: absolute;
  margin: 0 auto;
  bottom: 80px;
  left: 32%;
}
.comment-section {
  width: 300px !important;
}
</style>
