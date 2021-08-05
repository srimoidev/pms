import Axios from "axios";
const HTTP = Axios.create({
  baseURL: `http://${process.env.VUE_APP_API_HOST}/api/v3`,
  // baseURL: `http://${process.env.VUE_APP_API_LOCALHOST}/api/v3`,
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` }
});
export default HTTP;
