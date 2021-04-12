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
      sessionStorage.setItem("token", res.data.token);
      return res.data.token;
    });
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    location.reload();
  },
  signUp: () => {
    //signup
  }
};
