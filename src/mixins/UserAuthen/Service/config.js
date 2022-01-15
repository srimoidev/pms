import Axios from "axios";
const HTTP = Axios.create({
  baseURL: process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_LOCALHOST,
  headers: { "Content-Type": "application/json" }
});
export default HTTP;
