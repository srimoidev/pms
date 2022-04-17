import Axios from "axios";
const baseUrl = process.env.VUE_APP_API_HOST || process.env.VUE_APP_API_LOCALHOST;
const HTTP = Axios.create({
  baseURL: `${baseUrl}public/${process.env.VUE_APP_API_VERSION}`
});

export async function AllType() {
  return HTTP.get("/project/type").then(res => {
    return res.data;
  });
}

export async function GetAll(pName = null, pTypeID = null, pSectionID = null) {
  var searchStr = "?";
  if (pName != null) searchStr += "name=" + pName;
  if (pTypeID != null) searchStr += "&typeid=" + pTypeID;
  if (pSectionID != null) searchStr += "&sectionid=" + pSectionID;

  return await HTTP.get("/project" + searchStr)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch all projects.");
    });
}
export async function Project(pProjectID) {
  return await HTTP.get(`/project/${pProjectID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
