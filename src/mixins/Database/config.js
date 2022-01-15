import Axios from "axios";
// const baseUrl = process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_LOCALHOST;
const HTTP = Axios.create({
  baseURL: process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_LOCALHOST,
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` }
});
export default HTTP;
