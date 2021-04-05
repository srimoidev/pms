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
//#endregion inbound
