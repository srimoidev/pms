import HTTP from "./config";

//#region outbound
export async function All(pSubject) {
  return HTTP.get(`/section${pSubject ? "?subject=" + pSubject : ""}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      //
    });
}
//#endregion outbound

//#region inbound
export async function Add(pUserID, pSection) {
  return HTTP.post(`/section`, { userid: pUserID, section: pSection }).catch(() => {
    //
  });
}
export async function Update(pUserID, pSectionID, pSection) {
  return HTTP.put(`/section/${pSectionID}`, { userid: pUserID, section: pSection }).catch(() => {
    //
  });
}
export async function Delete(pSectionID) {
  return HTTP.delete(`/section/${pSectionID}`).then(() => {
    //
  });
}
//#endregion inbound
