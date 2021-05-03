import { userService } from "@/mixins/UserAuthen";
import router from "../../router";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { status: true } : { status: false };

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, { username, password }) {
      userService.login(username, password).then(
        role => {
          commit("loginSuccess", role);

          console.log(role);
          router.push(`/${role}`);
          // dispatch("user/routing");
        }
        // error => {
        //   commit("loginFailure", error);
        //   dispatch("alert/error", error, { root: true });
        // }
      );
    },
    logout({ commit }) {
      userService.logout();
      commit("logout");
    }
  },
  mutations: {
    // loginRequest(state, user) {
    //   state.status = { loggingIn: true };
    //   state.user = user;
    // },
    loginSuccess(state, role) {
      state.status = true;
      state.role = role;
    },
    // loginFailure(state) {
    //   state.status = {};
    //   state.user = null;
    // },
    logout(state) {
      state.status = false;
    }
  },
  getters: {
    isLoggedIn: state => state.status
  }
};
