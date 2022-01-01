import HTTP from "./config";

//#region outbound
export async function Notifications(pUserID) {
  return await HTTP.get(`/notifications?userid=${pUserID}`).then(res => {
    return res.data;
  });
}
//#endregion outbound

//#region inbound
export async function Read(pNotiID) {
  return await HTTP.put(`/notifications/read/${pNotiID}`);
}
//#endregion inbound
