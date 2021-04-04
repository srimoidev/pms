import { userService } from "./user.service";
import router from "@/router";
const Auth = {
  login: async (username, password) => {
    userService.login(username, password).then(async res => {
      if (res) {
        sessionStorage.setItem("user", JSON.stringify(res.data[0]));
        router.push("/student");
      } else {
        //for debug
        sessionStorage.setItem("user", JSON.stringify({role:"Advisor"}));
      }
    });
  },
  logout: () => {
    userService.logout();
    router.push("/");
  }
};

export default Auth;
