import HTTP from "./config";

//#region outbound
export async function All() {
  return HTTP.get(`/section`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      //
    });
}
//#endregion outbound

//#region inbound

//#endregion inbound
