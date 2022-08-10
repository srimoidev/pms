<template>
  <v-card class="ma-2 elevation-1" tile v-resize="onResize" :height="windowHeight">
    <v-toolbar flat color="white">
      <v-toolbar-title>คะแนนสอบ</v-toolbar-title>
    </v-toolbar>
    <v-divider class="mx-2"></v-divider>
    <v-container v-show="isLoaded">
      <div class="pa-4">
        <span class="title">{{ project.ProjectNameTH + " (" + project.ProjectNameEN + ")" }}</span>
        <span class="mx-4">
          <span v-if="project.IsProject">
            <v-chip small style="width:100px" class="deep-purple darken-2 white--text justify-center">Project</v-chip>
          </span>
          <span v-else>
            <v-chip small style="width:100px" class="teal accent-4 white--text justify-center">Pre-Project</v-chip>
          </span>
        </span>
      </div>
      <v-data-table :headers="headers" :items="data" hide-default-footer>
        <template v-slot:[`item.Score`]="{ item }">
          <v-textarea v-if="item.multiline" v-model="item.Score" outlined dense hide-details></v-textarea>
          <v-text-field v-else v-model="item.Score" outlined dense hide-details></v-text-field>
        </template>
      </v-data-table>
      <div class="text-center my-4">
        <v-btn color="success" @click="save()">Save</v-btn>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: [
        { id: 1, title: "การนำเสนอ", score: null, text: false },
        { id: 2, title: "รูปเล่ม", score: null, text: false },
        { id: 3, title: "คอมเมนต์เพิ่มเติม", score: null, multiline: true }
      ],
      project: {},
      committee: {},
      windowHeight: 0,
      isLoaded: false,
      headers: [
        {
          text: "หัวข้อ",
          align: "start",
          sortable: false,
          value: "title"
        },
        { text: "คะแนน", value: "Score", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    projectID() {
      return this.$route.query.pid;
    }
  },
  beforeMount() {
    this.loadData(); //จับตอน เปลี่ยน route
  },
  watch: {
    user() {
      this.loadData(); //จับตอน reload
    }
    // data: function() {
    //   this.isProject = this.data.IsProject != true ? this.ProjectType.find(i => i.value == 1) : this.ProjectType.find(i => i.value == 2);
    // }
  },
  methods: {
    async loadData() {
      this.project = await this.Project.Project(this.projectID);
      this.committee = await this.Project.Committee(this.projectID, this.user.UserID, this.project.IsProject);
      console.log(this.committee,this.projectID, this.user.UserID, this.project.IsProject)
      this.data[0].Score = this.committee.PresentScore;
      this.data[1].Score = this.committee.DocumentScore;
      this.data[2].Score = this.committee.Comment;
      this.isLoaded = true;
    },
    save() {
      this.$swal
        .fire({
          title: "ยืนยันการให้คะแนน",
          html: 'ยืนยันการให้คะแนนกลุ่ม<br />"' + this.project.ProjectNameTH + '"<br />หรือไม่?',
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "ยกเลิก",
          confirmButtonText: "ยืนยัน!"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Project.SubmitScore(this.committee.CommitteeID, this.user.UserID, this.data[0].Score, this.data[1].Score, this.data[2].Score).then(
              () => {
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
                this.loadData();
              }
            );
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

<style></style>
