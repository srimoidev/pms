// import config from 'config';
// import { authHeader } from '../_helpers';
import Axios from "axios";

export const userService = {
  login,
  logout
};

function login(username, password) {
  return Axios.post(
    "http://26.50.177.239:3000/login",
    JSON.stringify({
      username: username,
      password: password
    }),
    { headers: { "Content-Type": "application/json" } }
  ).then(async user => {
    if (user.data.token) {
      await Axios.get(
        "http://26.50.177.239:3000/api/v1/userstudent/" +
          JSON.parse(atob(user.data.token.split(".")[1])).Student_ID,

        {
          headers: { Authorization: `Bearer ${user.data.token}` }
        }
      ).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data.data[0]));
      });
      localStorage.setItem("token", user.data.token);
    }
    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  location.reload(true);
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }
