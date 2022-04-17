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
          <v-text-field v-model="item.Score" outlined dense hide-details></v-text-field>
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
        { id: 1, title: "การนำเสนอ", score: null },
        { id: 2, title: "รูปเล่ม", score: null }
      ],
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
  //   watch: {
  //     // user() {
  //     //   this.loadData(); //จับตอน reload
  //     // }
  //     data: function() {
  //       console.log(this.data)
  //       this.isProject = this.data.IsProject != true ? this.ProjectType.find(i => i.value == 1) : this.ProjectType.find(i => i.value == 2);
  //     }
  //   },
  methods: {
    async loadData() {
      this.project = await this.Project.Project(this.projectID);
      let committee = await this.Project.Committee(this.projectID, this.user.UserID, this.project.IsProject);
      this.data[0].score = committee.PresentScore;
      this.data[1].score = committee.DocumentScore;
      // this.data.map(item=>{
      //     item.score = committee.PresentScore;
      // })dd
      console.log(committee);
      this.isLoaded = true;
    },
    save() {},
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
