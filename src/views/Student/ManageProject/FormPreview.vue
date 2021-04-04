<template>
  <div style="max-height:91vh" class="overflow-y-auto">
    <v-toolbar flat>
      <v-toolbar-title>Form_CE01 - {{ form_id }}</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider class="mx-5"></v-divider>

    <div>
      <v-row no-gutters>
        <v-col cols="8">
          <div class="mt-2 mr-2">
            <v-toolbar dense class="mb-2 elevation-1">
              <v-spacer></v-spacer>
              <v-icon @click="pageBack">mdi-chevron-left</v-icon>
              <div class="d-flex mx-5">
                <v-text-field
                  v-model.number="pageInput"
                  dense
                  hide-details
                  @keypress.enter="gotoPage(pageInput)"
                  class="centered-input"
                ></v-text-field>
                <span>{{ "/ " + pageCount }}</span>
              </div>

              <v-icon @click="pageForward">mdi-chevron-right</v-icon>
              <v-spacer></v-spacer>
              <v-btn icon tile @click="$refs.pdfComponent.print()">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </v-toolbar>
            <div>
              <pdf
                ref="pdfComponent"
                src="http://www.africau.edu/images/default/sample.pdf"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event"
                :page="page"
                class="overflow-y-auto"
                style="border-style: solid;"
              ></pdf>
            </div>
          </div>
        </v-col>
        <v-col cols="4">
          <div class="">
            <div class="d-flex">
              <div class="font-weight-bold" style="font-size:28px">Comment</div>
              <v-spacer></v-spacer>
              <v-btn icon @click="cancelComment" color="blue" class="mr-2">
                <v-icon>mdi-file-document-multiple-outline</v-icon>
              </v-btn>
            </div>
            <template v-if="newComment">
              <v-textarea
                v-model="newCommentData"
                counter
                class="ma-2"
                outlined
              ></v-textarea>
              <div class="d-flex mb-5">
                <v-spacer></v-spacer>
                <v-btn
                  class="mr-2"
                  small
                  color="success"
                  @click="saveNewComment"
                >
                  Save
                </v-btn>
                <v-btn small text color="" @click="cancelComment">Cancel</v-btn>
              </div>
            </template>
            <template>
              <v-card
                class="mb-2 mr-2"
                v-for="item in commentData"
                :key="item.Comment_ID"
              >
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
                    {{
                      "- " +
                        item.Teacher_Firstname +
                        " " +
                        item.Teacher_Lastname
                    }}
                  </span>
                  <v-spacer></v-spacer>
                  <span>
                    {{
                      new Date(item.Comment_Time).toLocaleDateString("th-TH")
                    }}
                  </span>
                </v-card-text>
              </v-card>
            </template>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
import DB from "@/mixins/Database";
export default {
  components: {
    pdf
  },
  data() {
    return {
      page: 1,
      pageInput: 1,
      pageCount: 0,
      newComment: false,
      newCommentData: "",
      commentData: []
    };
  },
  computed: {
    form_id() {
      return this.$route.query.d;
    }
  },
  beforeMounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.commentData = await DB.Project.form_comment(this.form_id);
    },
    async saveNewComment() {
      await DB.Project.new_formcomment(this.form_id, 1, this.newCommentData);
      this.newComment = !this.newComment;
      this.loadData();
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
</style>
