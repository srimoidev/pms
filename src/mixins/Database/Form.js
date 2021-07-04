import HTTP from "./config";

//#region outbound

//Form ที่ต้องทำก่อน
export async function Prerequisite() {
  return HTTP.get("form/prerequisite")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}

//Form ทั้งหมดแต่ละ CE
export async function AllFormEachType(pProjectID, pFormID) {
  return HTTP.get(`form/sent?projectid=${pProjectID}&formtypeid=${pFormID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}

//Form
export async function Form(pFormID) {
  return (await HTTP.get(`form/sent/${pFormID}`)).data;
}

//blob pdf file
export async function FormPDF(pFormID) {
  return await HTTP.get(`form/sent/pdf/${pFormID}`, { responseType: "blob" }).then(res => {
    const file = new Blob([res.data], {
      type: "application/pdf"
    });
    return URL.createObjectURL(file);
  });
}
//Form comment
export async function Comment(pFormID) {
  return HTTP.get(`form/comment?formid=${pFormID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
//Form type
export async function Type() {
  return HTTP.get("form/type")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
//Form Status
export async function Status() {
  return HTTP.get("form/status").then(res => {
    return res.data;
  });
}
//Form deadline
export async function Deadline() {
  return (await HTTP.get("form/deadline")).data;
}
//Form ล่าสุดของแต่ละ CE
export async function LatestEachForm(pID) {
  return await (await HTTP.get(`form/sent/${pID}/latest`)).data;
}

export async function WaitforApprove(pUserID, pStatus) {
  return await HTTP.get(`form/sent?advisorid${pUserID}&status=${pStatus}`).then(res => {
    return res.data;
  });
}
//#endregion outbound

//#region inbound
export async function NewComment(pFormID, pUserID, pText) {
  return HTTP.post("form/comment", {
    FormID: pFormID,
    CommentText: pText,
    CreatedBy: pUserID,
    UpdatedBy: pUserID
  }).catch(ex => {
    console.log(ex);
  });
}
export async function Upload(pUserID, pProjectID, pFormTypeID, pFile) {
  var formData = new FormData();
  formData.append("CreatedBy", pUserID);
  formData.append("UpdatedBy", pUserID);
  formData.append("ProjectID", pProjectID);
  formData.append("FormTypeID", pFormTypeID);
  formData.append("file", pFile);
  return HTTP.post("/form/sent", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(res => {
    console.log(res.data);
  });
}
export async function ApproveOrReject(pUserID, pProjectID, pFormID, pStatusID) {
  return HTTP.put(`/form/sent/${pFormID}`, { ProjectID: pProjectID, FormStatusID: pStatusID, UpdatedBy: pUserID }).catch(() => {
    //
  });
}
//#endregion inbound
