<template>
  <div class="home-container">
    <v-app-bar height="60" color="transparent" elevate-on-scroll>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="logo" v-if="$vuetify.breakpoint.smAndUp">
        <v-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        <span v-t="{ path: 'APP.APP_NAME' }"></span>
      </v-toolbar-title>
      <!-- <div :style="isLogin ? 'width:260%' : 'width:168%'"></div> -->
      <v-spacer></v-spacer>
      <div>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary"
          v-if="!$vuetify.breakpoint.mdAndDown"
        >
          <v-tab
            class="tabs"
            v-for="item in tabs"
            :key="item.title"
            :to="item.route"
            >{{ item.title }}
            <v-icon class="ml-2" v-if="item.icon">{{ item.icon }}</v-icon>
          </v-tab>
        </v-tabs>
      </div>

      <dashboard-profile
        v-if="isLogin"
        :data="account_data"
        :size="36"
        @logout="logout"
      ></dashboard-profile>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div style="height:80px">
        PMS
      </div>
      <v-divider></v-divider>
      <v-list v-for="item in tabs" :key="item.title">
        <v-list-item :to="item.route">
          {{ item.title }}
          <v-icon class="ml-2" v-if="item.icon">{{ item.icon }}</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height:78%;">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <v-footer absolute class="font-weight-medium footer d-none d-sm-flex">
      <v-col class="text-center" cols="12">
        <div class="mx-6 d-inline-grid">
          <v-icon>mdi-bookshelf</v-icon>
          <span class="yellow--text text--darken-2">247,154</span>
          <span>โครงงานทั้งหมด</span>
        </div>
        <div class="mx-6 d-inline-grid">
          <v-icon>mdi-monitor-cellphone</v-icon>
          <span class="yellow--text text--darken-2">152,245</span>
          <span>ประเภทซอฟต์แวร์</span>
        </div>
        <div class="mx-6 d-inline-grid">
          <v-icon>mdi-chip</v-icon>
          <span class="yellow--text text--darken-2">154,214</span>
          <span>ประเภทฮาร์ดแวร์</span>
        </div>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import DashboardProfile from "@/components/DashboardProfile";
import Auth from "@/mixins/Auth";
// import RecentList from "@/components/RecentList";
// import Entry from "@/components/Entry";
export default {
  components: {
    DashboardProfile
    // RecentList,
    // Entry
  },
  data() {
    return {
      isLogin: null,
      drawer: false,
      account_data: JSON.parse(sessionStorage.getItem("user")),
      tab: null,
      tabs: [
        { title: "หน้าหลัก", route: "/" },
        { title: "ค้นหาโครงงาน", route: "/search" },
        { title: "เกี่ยวกับ", route: "/about" },
        { title: "เข้าสู่ระบบ", route: "/login", icon: "mdi-lock" }
      ],
      recent_project: [
        {
          title: "เครื่องขายขนมอัตโนมัติ",
          advisor: "อาจารย์ aaaaaaaa",
          tags: ["Hardware", "Iot", "Arduino"]
        },
        {
          title: "เว็บแปลภาษา",
          advisor: "อาจารย์ bbbbbbb",
          tags: ["Software", "Vuejs"]
        },
        {
          title: "เครื่องขายขนมอัตโนมัติ",
          advisor: "อาจารย์ aaaaaaaa",
          tags: ["Hardware", "Iot", "Arduino"]
        },
        {
          title: "เว็บแปลภาษา",
          advisor: "อาจารย์ bbbbbbb",
          tags: ["Software", "Vuejs"]
        }
      ]
    };
  },
  beforeMount() {
    this.isLogin = sessionStorage.getItem("user");
    if (this.isLogin) {
      this.tabs.pop();
    }
  },
  methods: {
    logout() {
      Auth.logout();
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.home-container {
  min-height: 100vh;
  max-height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.52),
      rgba(117, 19, 93, 0.73)
    ),
    url("../../assets/aff4cc28ca93b3507d41ba0f88ec53db.jpg");
  background-size: cover;
}
.footer {
  background-color: #ffffff55;
}
.d-inline-grid {
  display: inline-grid;
}
.logo {
  min-width: fit-content;
}
@media screen and (max-width: 1264px) {
  .logo {
    min-width: 0;
    padding-left: 0 !important;
  }
}
.v-tabs-bar {
  height: 60px !important;
}
</style>
