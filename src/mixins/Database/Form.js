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
export async function Form(gID, fID) {
  return HTTP.get(`form/sent?projectid=${gID}&formtypeid=${fID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
export async function Comment(fID) {
  return HTTP.get(`form/comment?formid=${fID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
export async function Type() {
  return HTTP.get("form/type")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}
export async function Deadline() {
  return (await HTTP.get("form/deadline")).data;
}
export async function LatestEachForm(pID) {
  return await (await HTTP.get(`form/sent/${pID}/latest`)).data;
}
//#endregion outbound

//#region inbound
export async function NewComment(fID, uID, txt) {
  return HTTP.post("form/comment", {
    Comment_FormID: fID,
    Comment_UserID: uID,
    Comment_Text: txt
  }).catch(ex => {
    console.log(ex);
  });
}
export async function Upload(pID, formTID, file) {
  var formData = new FormData();
  formData.append("Project_ID", pID);
  formData.append("Form_TypeID", formTID);
  formData.append("file", file);
  return HTTP.post("/form/sent", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
//#endregion inbound
