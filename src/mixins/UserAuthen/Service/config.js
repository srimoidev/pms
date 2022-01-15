import Axios from "axios";
const baseUrl = process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_LOCALHOST;
const HTTP = Axios.create({
  baseURL: `${baseUrl}/api/`,
  headers: { "Content-Type": "application/json" }
});
export default HTTP;
