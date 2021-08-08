import router from "../../../router";
import HTTP from "./config";
import { Profile, ProfileImage } from "@/mixins/Database/User.js";
import { SelfProject } from "@/mixins/Database/Project.js";
function login(username, password) {
  return HTTP.post("/login", JSON.stringify({ username, password })).then(res => {
    if (res.data.token) {
      const user = JSON.parse(atob(res.data.token.split(".")[1]));
      const ttl = 1 * 60 * 60 * 1000; //ล็อกอินหมดอายุทุกๆ 1 ชม.
      const expiry = new Date().getTime() + ttl;
      localStorage.setItem("user", JSON.stringify({ token: res.data.token, expiry: expiry }));
      console.log(user);
      return [2, 3, 5].includes(user.UserTypeID) ? "teacher" : user.UserTypeName.toLowerCase();
    } else {
      return Promise.reject(res.data.msg);
    }
  });
}

function logout() {
  localStorage.removeItem("user");
  if (location.pathname != "/") {
    router.push("/");
  }
}

async function loggedInUserData() {
  const jwt = JSON.parse(localStorage.getItem("user"))?.token;
  const loggedInUserID = JSON.parse(atob(jwt.split(".")[1]))?.UserID;
  var userProfile = {};
  userProfile = await Profile(loggedInUserID);
  if (userProfile.ImgProfile) {
    userProfile.ImgProfile = await ProfileImage(loggedInUserID);
  }
  userProfile.ProjectID = await SelfProject(loggedInUserID);
  return userProfile;
}

export const userService = {
  login,
  logout,
  loggedInUserData
};
