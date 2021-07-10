import { userService } from "@/mixins/UserAuthen";
import router from "../../router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: true, msg: null } : { status: false, msg: null };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, { username, password }) {
      userService.login(username, password).then(
        role => {
          commit("loginSuccess", role);
          router.push(`/${role}`);
        },
        error => {
          commit("loginFailure", error);
        }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    }
  },
  mutations: {
    loginSuccess(state, role) {
      state.status = true;
      state.role = role;
      state.msg = null;
    },
    loginFailure(state, error) {
      state.status = false;
      state.msg = error;
    },
    logout(state) {
      state.status = false;
    }
  },
  getters: {
    isLoggedIn: state => state.status,
    msg: state => state.msg
  }
};
