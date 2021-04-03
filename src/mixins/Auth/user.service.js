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
      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        return await HTTP.get(
          `/api/v2/user_profile/?User_ID=${
            JSON.parse(atob(res.data.token.split(".")[1])).User_ID
          }`,
          {
            headers: { Authorization: `Bearer ${res.data.token}` }
          }
        );
      }
      return false;
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
