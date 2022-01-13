import Axios from "axios";
const HTTP = Axios.create({
  baseURL: `http://${process.env.VUE_APP_API_HOST || 'localhost:3333'}/`,
  headers: { "Content-Type": "application/json" }
});
export default HTTP;
