import Vue from "vue";
import Vuex from "vuex";
// import { github } from "./modules/github";
// import board from "./modules/board";
// import UserAuthen from "./modules/UserAuthen"
import { authentication } from "./modules/authentication.module";
import { user } from "./modules/user.module";
import { notifications } from "./modules/notifications.module";
// import persistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: "th"
  },
  mutations: {
    lang: function(state, val) {
      state.lang = val;
    }
  },
  getters: {},
  actions: {},
  modules: {
    authentication,
    user,
    notifications
  }
  // plugins:[
  //   persistedState()
  // ]
});
