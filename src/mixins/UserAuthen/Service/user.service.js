import router from "../../../router";
import HTTP from "./config";
import { Profile } from "@/mixins/Database/User.js";
import { SelfProject } from "@/mixins/Database/Project.js";
function login(username, password) {
  return HTTP.post("/login", JSON.stringify({ username, password })).then(res => {
    if (res.data.token) {
      const userType = JSON.parse(atob(res.data.token.split(".")[1]))?.UserTypeID;
      const ttl = 1 * 60 * 60 * 1000; //ล็อกอินหมดอายุทุกๆ 1 ชม.
      const expiry = new Date().getTime() + ttl;
      localStorage.setItem("user", JSON.stringify({ token: res.data.token, expiry: expiry }));
      console.log(userType);
      if (userType == 1) {
        return "student";
      } else if (userType == 2 || userType == 3) {
        return "teacher";
      }
      // return user;
    }
  });
}

function logout() {
  localStorage.removeItem("user");
  if (location.pathname != "/") {
    router.push("/");
  }
}

async function loggedInUserDate() {
  const jwt = JSON.parse(localStorage.getItem("user")).token;
  const loggedInUserID = JSON.parse(atob(jwt.split(".")[1]))?.UserID;
  const userProfile = await Profile(loggedInUserID);
  userProfile.ProjectID = await SelfProject(loggedInUserID);
  console.log(userProfile);
  return userProfile;
}

export const userService = {
  login,
  logout,
  loggedInUserDate
};
