import HTTP from "./config";

//#region outbound

export async function UserTeacher() {
  return HTTP.get("/user?typeid[]=2&typeid[]=3").then(res => {
    return res.data;
  });
}
export async function UserStudent() {
  return HTTP.get("/user?typeid[]=1").then(res => {
    return res.data;
  });
}
export async function Profile(uID) {
  return HTTP.get(`/user/${uID}`).then(res => {
    return res.data;
  });
  // .then((res) => {
  //   return res.data;
  // });
}
export async function GetAllStudentByGroupID(gID) {
  return await HTTP.post("/userstudent", { Student_GroupID: gID })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
// export async function GetAllTeacherByGroupID(gID) {
//   return await HTTP.post("/userteacher", { Student_GroupID: gID })
//     .then(res => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch(() => {
//       console.error("Can't fetch group.");
//     });
// }

//#endregion outbound

//#region inbound
//#endregion inbound
