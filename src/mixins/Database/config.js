import Axios from "axios";
const HTTP = Axios.create({
  // baseURL: `http://${process.env.VUE_APP_API_HOST}/api/v1`,
  baseURL: `http://${process.env.VUE_APP_API_LOCALHOST}/api/v3`,
  headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
});
export default HTTP;
