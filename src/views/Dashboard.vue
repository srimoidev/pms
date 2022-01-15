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
                <v-badge v-if="index == 3 && allRequest" :content="allRequest" color="red" style="right:20px;top:-3px"></v-badge>
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
      <!-- <div class="select-lang">
        <v-select v-model="$i18n.locale" :items="langs" single-line @input="changeLang" item-text="title"></v-select>
      </div> -->
      <div class="text-center">
        <dashboard-notification :noti.sync="notiData" @itemClicked="itemClicked"></dashboard-notification>
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
    notiData: [],
    twoLine: true,
    avatar: true,
    TestReq: 8,
    DocAppReq: 7,
    waitAdvisorsConfirmProject: null
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
  watch: {
    // waitAdvisorsConfirmProject: function() {
    //   const menuIdx = this.menu.findIndex(x => x.id == 40);
    //   const subMenuIdx = this.menu[menuIdx].children.findIndex(x => x.id == 43);
    //   this.menu[menuIdx].children[subMenuIdx].req = this.waitAdvisorsConfirmProject.length > 0 ? this.waitAdvisorsConfirmProject.length : 0;
    // }
  },
  beforeMount() {
    this.loadData();
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.$store.dispatch("notifications/connect");
    },

    disconnect() {
      this.isConnected = false;
      this.$store.dispatch("notifications/disconnect");
    },

    // Fired when the server sends something on the "messageChannel" channel.
    async notifications(data) {
      this.$swal.fire({
        toast: true,
        icon: "success",
        title: data.msg,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: toast => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        }
      });
      this.notiData = await this.Notification.Notifications(this.user.UserID);
      this.notiData.map(async item => {
        item.ProfileImage = await this.User.ProfileImage(item.CreatedBy);
        item.TimeInterval = this.Utils.timeInterval(item.CreatedTime);
      });
      // this.socketMessage = data;
    }
  },

  // methods: {
  //   pingServer() {
  //     // Send the "pingServer" event to the server.
  //     this.$socket.emit("pingServer", "PING!");
  //   }
  // }
  methods: {
    async loadData() {
      this.$store.dispatch("user/getLoggedInUserData").then(async () => {
        this.$socket.emit("create", this.user.UserID);
        this.menu = this.initMenu(await this.App.Menus(this.typeID));
        this.notiData = await this.Notification.Notifications(this.user.UserID);
        this.notiData.map(async item => {
          item.ProfileImage = await this.User.ProfileImage(item.CreatedBy);
          item.TimeInterval = this.Utils.timeInterval(item.CreatedTime);
        });
        //เป็นอาจารย์
        // if (this.typeID == 2) {
        //   this.waitAdvisorsConfirmProject = await this.Project.WaitAdviserConfirmProject(this.user.UserID);
        // }
      });

      // if (this.user.User_ID) {
      //   this.menu = await this.App.Menus(this.user.UserType_ID);

      // }
    },
    initMenu(data) {
      var temp = [];
      //parent
      data
        .filter(item => item.app_menu.ParentID == 0)
        .forEach(element => {
          var menuObj = {};
          menuObj.id = element.app_menu.MenuID;
          menuObj.route = element.Route + "?MenuID="+ element.app_menu.MenuID;
          menuObj.icon = element.app_menu.Icon;
          menuObj.name = element.app_menu.MenuName;
          menuObj["icon-alt"] = element.app_menu.IconAlt;
          temp.push(menuObj);
        });
      //กรองเอา parent node ที่ไม่ใช่ 0
      const parentNodeID = [...new Set(data.map(x => x.app_menu.ParentID))].filter(y => y != 0);
      //map children กับ parent
      parentNodeID.map(async nodeID => {
        var temp2 = [];
        const editIdx = temp.findIndex(i => i.id == nodeID);
        data
          .filter(item => item.app_menu.ParentID == nodeID)
          .forEach(element => {
            var menuObj = {};
            menuObj.id = element.app_menu.MenuID;
            menuObj.route = element.Route + "?MenuID=" +element.app_menu.MenuID;
            menuObj.icon = element.app_menu.Icon;
            menuObj.name = element.app_menu.MenuName;
            // switch (menuObj.id) {
            //   case 41:
            //     break;
            //   case 42:
            //     break;
            //   case 43:
            //     menuObj.req = (this.Project.WaitAdviserConfirmProject(this.user.User_ID)).length;
            //     break;
            //   default:
            //     break;
            // }
            temp2.push(menuObj);
          });
        temp[editIdx].children = temp2;
        temp2 = [];
      });
      return temp;
    },
    changeLang(val) {
      this.$store.commit("lang", val);
    },
    logout() {
      window.URL.revokeObjectURL(this.user.ImgProfile);
      this.$store.dispatch("authentication/logout");
      this.$store.dispatch("user/clearUserDate");
    },
    itemClicked(v) {
      this.Notification.Read(v.NotiID).then(() => {
        this.loadData().then(() => {
          this.$router.push(v.ActionPage);
        });
      });
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
