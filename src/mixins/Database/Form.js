import HTTP from "./config";

//#region outbound
export async function Prerequisite() {
  return HTTP.get("form/prerequisite")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
//#endregion outbound

//#region inbound

//#endregion inbound
