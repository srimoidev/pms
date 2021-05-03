import router from "../../router";
import HTTP from "./config";

export const userService = {
  login: (username, password) => {
    return HTTP.post(
      "/login",
      JSON.stringify({
        username: username,
        password: password
      }),
      { headers: { "Content-Type": "application/json" } }
    ).then(async res => {
      //get token and store
      localStorage.setItem("token", res.data.token);
      return res.data.token;
    });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log(location.pathname);
    if (location.pathname != "/") {
      router.push("/");
    }
    // location.reload();
  },
  signUp: () => {
    //signup
  }
};
