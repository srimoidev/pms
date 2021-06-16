import HTTP from "./config";

//#region outbound
export async function GetAll() {
  return await HTTP.get("/meeting")
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch.");
    });
}
//#endregion outbound

//#region inbound

//#endregion inbound
