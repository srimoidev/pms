import { userService } from "./user.service";
import router from "@/router";
import { Profile } from "@/mixins/Database/User";
const Auth = {
  login: async (username, password) => {
    const jwt = await userService.login(username, password);
    const user = await Profile(JSON.parse(atob(jwt.split(".")[1])).User_ID);
    sessionStorage.setItem("user", JSON.stringify(user));
    if (jwt && user) {
      router.push("/student");
    } else {
      throw new "failed to login"
    }
  },
  logout: () => {
    userService.logout();
    router.push("/");
  }
};

export default Auth;
