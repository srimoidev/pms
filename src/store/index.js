import Vue from "vue";
import Vuex from "vuex";
import { github } from "./modules/github";
import board from "./modules/board";
import { auth } from "./modules/UserAuthen/auth";

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
    github,
    board,
    auth
  }
  // plugins:[
  //   persistedState()
  // ]
});
