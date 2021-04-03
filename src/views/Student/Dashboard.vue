<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in menu" class="scrollable">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  v-t="{ path: item.name }"
                ></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              style="padding-left:40px"
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.route"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  v-t="{ path: child.name }"
                ></v-list-item-title>
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
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down" v-t="{ path: 'APP.APP_NAME' }"></span>
      </v-toolbar-title>
      <v-spacer />
      <div class="select-lang">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          single-line
          @input="changeLang"
          item-text="title"
        ></v-select>
      </div>
      <div class="text-center">
        <dashboard-notification :noti="noti"></dashboard-notification>
      </div>
      <div>
        <dashboard-profile
          :data="account_data"
          @logout="logout"
        ></dashboard-profile>
      </div>
    </v-app-bar>
    <v-main class="grey lighten-3 main-container">
      <router-view class="main-content"></router-view>
    </v-main>
  </div>
</template>

<script>
import store from "@/store/index";
import Auth from "@/mixins/Auth";
// import DB from "@/mixins/Database";
// import DashboardDrawer from "@/components/DashboardNavigationDrawer";
import DashboardProfile from "@/components/DashboardProfile";
import DashboardNotification from "@/components/DashboardNotification";
export default {
  store,
  components: {
    DashboardProfile,
    DashboardNotification
  },
  data: () => ({
    drawer: null,
    account_data: JSON.parse(sessionStorage.getItem("user")),
    menu: [
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
    ],
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
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    twoLine: true,
    avatar: true
  }),
  beforeMount() {},

  methods: {
    changeLang(val) {
      this.$store.commit("lang", val);
    },
    logout() {
      Auth.logout();
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
  height: calc(100vh - 64px - 16px);
}
.main-container {
  height: 100vh;
}
</style>
