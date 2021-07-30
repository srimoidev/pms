import HTTP from "./config";

//#region outbound
export async function AllActive() {
  return HTTP.get("/user").then(res => {
    return res.data;
  });
}
export async function All() {
  return HTTP.get("/user?all=1").then(res => {
    return res.data;
  });
}
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
export async function Type() {
  return HTTP.get("/user/type").then(res => {
    return res.data;
  });
}
export async function DownloadTemplate() {
  return await HTTP.get("/user/template/excel", { responseType: "blob" }).then(res => {
    const file = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    return URL.createObjectURL(file);
  });
}
export async function Validate(pUsername) {
  return await HTTP.get(`/user/validate?username=${pUsername}`).then(res => {
    return !res.data?.isExist;
  });
}

//#endregion outbound

//#region inbound
export async function New(pUserID, pUsername, pPassword, pPrefix, pFirstname, pLastname, pStudentID, pEmail, pTelephoneNo, pUserTypeID, pProfileImg) {
  console.log(pProfileImg);
  var formData = new FormData();
  formData.append("Username", pUsername);
  formData.append("Password", pPassword);
  formData.append("Prefix", pPrefix);
  formData.append("Firstname", pFirstname);
  formData.append("Lastname", pLastname);
  formData.append("StudentID", pStudentID);
  formData.append("Email", pEmail);
  formData.append("TelephoneNo", pTelephoneNo);
  formData.append("UserTypeID", pUserTypeID);
  formData.append("CreatedBy", pUserID);
  formData.append("UpdatedBy", pUserID);
  formData.append("file", pProfileImg);
  return HTTP.post("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(res => {
    if (res.data.message?.errors) {
      return res.data.message.original.sqlMessage;
    }
  });
}
export async function ImportUser(pUserID, pImportedUser) {
  return HTTP.post("/user/import", { importedUser: pImportedUser, user: pUserID }).then(res => {
    if (res.data.message?.errors) {
      return res.data.message.original.sqlMessage;
    }
  });
}
export async function Delete(pUserID) {
  return HTTP.delete(`/user/${pUserID}`).then(res => {
    if (res.data.message?.errors) {
      return res.data.message.original.sqlMessage;
    }
  });
}
export async function BulkDelete(pUserIDs) {
  return HTTP.post("/user/bulkdelete", { ids: pUserIDs }).then(res => {
    if (res.data.message?.errors) {
      return res.data.message.original.sqlMessage;
    }
  });
}
//#endregion inbound
