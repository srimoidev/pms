<template>
  <v-app class="app-wrapper">
    <v-app-bar app color="#513306" dark>
      <!-- <v-toolbar-title>{{ item.ProjectNameEN }}({{ item.ProjectNameTH }})</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-btn text @click="$router.go(-1)"><v-icon>mdi mdi-keyboard-backspace</v-icon> Back To HomePage</v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="container" style="">
        <!-- Detail -->
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-toolbar color="#513306" flat outlined dark dense>รายละเอียดโครงงาน</v-toolbar>
              <v-card-text class="overflow-y-auto card">
                <v-card-title> ชื่อโครงงานภาษาไทย </v-card-title>
                <v-card-subtitle>{{ item.ProjectNameTH }}</v-card-subtitle>
                <v-card-title> ชื่อโครงงานภาษาอังกฤษ </v-card-title>
                <v-card-subtitle>{{ item.ProjectNameEN }}</v-card-subtitle>
                <v-card-title> ประเภทโครงงานภาษาไทย </v-card-title>
                <v-card-subtitle>{{ item.Project_Type.ProjectTypeNameTH }}</v-card-subtitle>
                <v-card-title> ประเภทโครงภาษาอังกฤษ </v-card-title>
                <v-card-subtitle>{{ item.Project_Type.ProjectTypeNameEN }}</v-card-subtitle>
                <v-card-title> จำนวนสมาชิก </v-card-title>
                <v-card-subtitle>{{ item.MaxMember }}</v-card-subtitle>
                <v-card-title> ปีการศึกษา </v-card-title>
                <v-card-subtitle>{{ item.Project_Section.Year }}</v-card-subtitle>
                <v-card-title> สถานะ </v-card-title>
                <v-card-subtitle>{{ item.Project_Status.ProjectStatusDetail }}</v-card-subtitle>
                <v-card-title> รายละเอียด </v-card-title>
                <v-card-subtitle>{{ item.ProjectDetail }}</v-card-subtitle>
                <v-card-title> สมาชิก </v-card-title>
                <v-card-subtitle v-for="(item, index) in item.Project_Members" :key="index">
                  <div>{{ item.Fullname }}</div>
                </v-card-subtitle>
                <v-card-title> อาจารย์ที่ปรึกษา </v-card-title>
                <v-card-subtitle v-for="(item, index) in item.Project_Advisors" :key="index">
                  <div>{{ item.Fullname }}</div>
                </v-card-subtitle>
                <!--  -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cards: ["Today", "Yesterday"],
      drawer: null,
      item: {},
      selectedItem: 0,
      items: [
        { text: "รายละเอียด", icon: "mdi-chevron-double-right" },
        { text: "สมาชิกกลุ่ม", icon: "mdi-chevron-double-right" },
        { text: "อาจารย์ที่ปรึกษา", icon: "mdi-chevron-double-right" }
        // { text: "กรรมการสอบ", icon: "mdi-chevron-double-right" },
        // { text: "ดาวน์โหลด", icon: "mdi-chevron-double-right" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID",
      isLoggedIn: "authentication/isLoggedIn"
    }),
    projectId() {
      return this.$route.query.pid;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    changeState(item) {
      this.tabState = item;
    },
    async loadData() {
      this.item = await this.Public.Project(this.projectId);
    }
  }
};
</script>

<style scoped>
.app-wrapper {
  background: url("https://www.rmutl.ac.th/assets/img/site-bg.jpg") center center;
  /* background: #f8f8f8; */
  background-size: cover;
}
.v-card__title {
  color: #513306;
}
.container {
  max-width: 1080px;
}
.card {
  max-height: calc(100vh - 150px);
}
</style>
