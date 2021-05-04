import { userService } from "./user.service";
import router from "@/router";
import { Profile } from "@/mixins/Database/User";
const Auth = {
  login: async (username, password) => {
    const ttl = 1 * 60 * 60 * 1000; //ล็อกอินหมดอายุทุกๆ 1 ชม.
    const jwt = await userService.login(username, password);
    var user = await Profile(JSON.parse(atob(jwt.split(".")[1])).User_ID);
    console.log(user);
    user.expiry = new Date().getTime() + ttl;
    localStorage.setItem("user", JSON.stringify(user));
    if (jwt && user) {
      router.push("/student");
    } else {
      throw new "failed to login"();
    }
  },
  logout: () => {
    userService.logout();
    // router.push("/");
  }
};

export default Auth;
