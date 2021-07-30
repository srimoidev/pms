import { userService } from "@/mixins/UserAuthen";
// import router from "../../router";

const getDefaultState = () => {
  return { loading: false, data: {} };
};
const initState = getDefaultState();
export const user = {
  namespaced: true,
  state: initState,
  actions: {
    async getLoggedInUserData({ commit }) {
      commit("getAllRequest");
      await userService.loggedInUserData().then(user => {
        commit("getAllSuccess", user);
      });
    },
    clearUserDate({ commit }) {
      commit("clearState");
    }
  },
  mutations: {
    getAllRequest(state) {
      state.loading = true;
    },
    getAllSuccess(state, user) {
      state.data = user;
      // state.User_AcademicYear = user.User_AcademicYear;
      // state.User_Email = user.User_Email;
      // state.User_Firstname = user.User_Firstname;
      // state.User_ID = user.User_ID;
      // state.User_Lastname = user.User_Lastname;
      // state.User_Password = user.User_Password;
      // state.User_StudentID = user.User_StudentID;
      // state.User_Tel = user.User_Tel;
      // state.User_TypeID = user.User_TypeID;
      // state.User_UserName = user.User_UserName;
      // state.User_PID = user.User_PID;
    },
    clearState(state) {
      //TODO เคลียร์สเตตหลัง logout
      state.loading = false;
      Object.assign(state, getDefaultState());
    }
  },
  getters: {
    TypeID: state => state.data.UserTypeID,
    UserData: state => state.data
  }
};
