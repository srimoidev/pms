import Axios from "axios";
const baseUrl = `${process.env.VUE_APP_API_HOST || 'localhost:3333'}`;
const HTTP = Axios.create({
  baseURL: `http://${baseUrl}/api/v3`,
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}` }
});
export default HTTP;
