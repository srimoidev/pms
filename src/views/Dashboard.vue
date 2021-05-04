<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="(item, index) in menu" class="scrollable">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-t="{ path: item.name }"> </v-list-item-title>
                <v-badge v-if="index == 3" :content="allRequest" color="red" style="right:20px;top:-3px"></v-badge>
              </v-list-item-content>
            </template>
            <v-list-item style="padding-left:40px" v-for="(child, i) in item.children" :key="i" :to="child.route">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-t="{ path: child.name }"></v-list-item-title>
                <v-badge v-if="child.req" :content="child.req" color="red" style="right:20px;top:-3px"></v-badge>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item color="primary" v-else :key="item.name" :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-t="{ path: item.name }"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link to="/" class="text-none white--text"><span class="hidden-sm-and-down" v-t="{ path: 'APP.APP_NAME' }"></span></router-link>
      </v-toolbar-title>
      <v-spacer />
      <div class="select-lang">
        <v-select v-model="$i18n.locale" :items="langs" single-line @input="changeLang" item-text="title"></v-select>
      </div>
      <div class="text-center">
        <dashboard-notification :noti="noti"></dashboard-notification>
      </div>
      <div>
        <dashboard-profile :data="user" @logout="logout"></dashboard-profile>
      </div>
    </v-app-bar>
    <v-main class="grey lighten-3 main-container">
      <router-view class="main-content"></router-view>
    </v-main>
  </div>
</template>

<script>
// import store from "@/store/index";
// import Auth from "@/mixins/Auth";
// import DB from "@/mixins/Database";
// import DashboardDrawer from "@/components/DashboardNavigationDrawer";
import DashboardProfile from "@/components/DashboardProfile";
import DashboardNotification from "@/components/DashboardNotification";
import { mapGetters } from "vuex";

const advisorMenu = [
  {
    icon: "mdi-chart-bar",
    name: "ภาพรวม",
    route: "/teacher/overview"
  },
  {
    icon: "mdi-group",
    name: "โปรเจ็คทั้งหมด",
    route: "/teacher/manage_group"
  },
  {
    icon: "mdi-bookshelf",
    name: "จัดการโปรเจ็ค",
    route: "/teacher/manage_project"
  },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    name: "คำร้อง",
    children: [
      {
        icon: "mdi-teach",
        name: "ขอสอบ",
        route: "/teacher/test_req",
        req: 4
      },
      {
        icon: "mdi-file-document-edit-outline",
        name: "ขออนุมัติเอกสาร",
        route: "/teacher/approvement_req",
        req: 7
      }
    ]
  },
  {
    icon: "mdi-bookshelf",
    name: "Project Manual",
    route: "/teacher/project_manual"
  }
];
const instructorMenu = [
  {
    icon: "mdi-chart-bar",
    name: "ถาพรวม",
    route: "/teacher/overview"
  },
  {
    icon: "mdi-group",
    name: "จัดการทรัพยากร",
    route: "/teacher/app_env"
  },
  {
    icon: "mdi-group",
    name: "จัดการกลุ่ม",
    route: "/teacher/manage_group"
  },
  {
    icon: "mdi-bookshelf",
    name: "จัดการโปรเจ็ค",
    route: "/teacher/manage_project"
  },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    name: "คำร้อง",
    children: [
      {
        icon: "mdi-teach",
        name: "ขอสอบ",
        route: "/teacher/test_req",
        req: 4
      },
      {
        icon: "mdi-file-document-edit-outline",
        name: "ขออนุมัติเอกสาร",
        route: "/teacher/approvement_req",
        req: 7
      }
    ]
  },
  {
    icon: "mdi-bookshelf",
    name: "Project Manual",
    route: "/teacher/project_manual"
  }
];
const studentMenu = [
  {
    icon: "mdi-chart-bar",
    name: "DASHBOARD.NAVIGATION_DRAWER.OVERVIEW",
    route: "/student/overview"
  },
  {
    icon: "mdi-group",
    name: "DASHBOARD.NAVIGATION_DRAWER.MANAGE_GROUP",
    route: "/student/manage_group"
  },
  {
    icon: "mdi-bookshelf",
    name: "DASHBOARD.NAVIGATION_DRAWER.MANAGE_PROJECT",
    route: "/student/manage_project"
  },
  {
    icon: "mdi-bell",
    name: "DASHBOARD.NAVIGATION_DRAWER.APPOINTMENT",
    route: "/student/appointment"
  },
  {
    icon: "mdi-cogs",
    name: "DASHBOARD.NAVIGATION_DRAWER.PROGRESSION_RECORD",
    route: "/student/progression_record"
  },
  {
    icon: "mdi-file-document-multiple-outline",
    name: "DASHBOARD.NAVIGATION_DRAWER.PROJECT_MANUAL",
    route: "/student/assocdoc"
  },
  {
    icon: "mdi-chevron-up",
    "icon-alt": "mdi-chevron-down",
    name: "DASHBOARD.NAVIGATION_DRAWER.DEVELOPMENT_TOOLS",
    model: false,
    children: [
      { icon: "mdi-github", name: "GitHub", route: "/student/github" },
      { icon: "mdi-trello", name: "Trello", route: "/student/trello" },
      {
        icon: "mdi-folder-google-drive",
        name: "Google Drive",
        route: "/student/drive"
      },
      {
        icon: "mdi-calendar-month",
        name: "Google Calendar",
        route: "/student/calendar"
      }
    ]
  }
];
export default {
  components: {
    DashboardProfile,
    DashboardNotification
  },
  data: () => ({
    drawer: null,
    menu: [],
    lang: "ไทย",
    langs: [
      { title: "ไทย", value: "th" },
      { title: "English", value: "en" }
    ],
    noti: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    twoLine: true,
    avatar: true,
    TestReq: 8,
    DocAppReq: 7
  }),
  computed: {
    ...mapGetters({
      user: "user/UserData",
      typeID: "user/TypeID"
    }),
    allRequest: function() {
      return this.menu[3].children.reduce((a, b) => a + (b["req"] || 0), 0);
    }
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$store.dispatch("user/getLoggedInUserData").then(() => {
        this.initMenu(this.typeID);
      });
      // console.log(this.user, this.user.User_TypeID);
      // this.user.pID = (await this.Project.SelfProject(this.user.User_ID)) || null;
      // console.log(this.user);
      // localStorage.setItem("user", JSON.stringify(this.user));
      // if (this.user.User_TypeID == 1) {
      //   this.user.role = "Student";
      // } else {
      //   this.user.role = "Advisor";
      // }
      // this.$nextTick(() => {
      // this.initMenu(this.TypeID);
      // });

      // if (this.user.pID) {
      //       this.menu[1].route = "/student/project_details";
      //     }
    },
    initMenu(uTID) {
      switch (uTID) {
        case 3:
          this.menu = advisorMenu;
          break;
        case 2:
          this.menu = instructorMenu;
          break;
        case 1:
          this.menu = studentMenu;
          break;
        default:
          break;
      }
    },
    changeLang(val) {
      this.$store.commit("lang", val);
    },
    logout() {
      this.$store.dispatch("authentication/logout");
      this.$store.dispatch("user/clearUserDate");
    }
  }
};
</script>
<style>
.select-lang {
  margin-top: 20px;
  width: 120px;
}
.main-content {
  height: calc(100vh - 64px);
}
.main-container {
  height: 100vh;
}
</style>
