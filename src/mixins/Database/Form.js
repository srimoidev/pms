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
export async function AllFormEachType(gID, fID) {
  return HTTP.get(`form/sent?projectid=${gID}&formtypeid=${fID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.log(ex);
    });
}

//Form
export async function Form(fID) {
  return (await HTTP.get(`form/sent/${fID}`)).data;
}

//blob pdf file
export async function FormPDF(fID) {
  return await HTTP.get(`form/sent/pdf/${fID}`, { responseType: "blob" }).then(res => {
    const file = new Blob([res.data], {
      type: "application/pdf"
    });
    return URL.createObjectURL(file);
  });
}
//Form comment
export async function Comment(fID) {
  return HTTP.get(`form/comment?formid=${fID}`)
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
//Form deadline
export async function Deadline() {
  return (await HTTP.get("form/deadline")).data;
}
//Form ล่าสุดของแต่ละ CE
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
  formData.append("Form_ProjectID", pID);
  formData.append("Form_TypeID", formTID);
  formData.append("file", file);
  return HTTP.post("/form/sent", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(res => {
    console.log(res.data);
  });
}
//#endregion inbound
