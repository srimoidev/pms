import HTTP from "./config";

//#region outbound

export async function GetAll() {
  return await HTTP.get("/project")
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GetSelf(gID) {
  return await HTTP.get(`/project/${gID}/info`)
    .then(res => {
      return res.data[0];
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GroupMember(gID) {
  return await HTTP.get(`/project/member?projectid=${gID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GetAdvisor(gID) {
  return await HTTP.get(`/project/${gID}/advisor`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GetCE(type) {
  return await HTTP.get(type)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch CE");
    });
}
export async function LatestEachForm(gID) {
  return await HTTP.get(`/form/group/${gID}/latest`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't get latest 'form CE' from each type");
    });
}
export async function FormPrerequisite() {
  return await HTTP.get("/form/prerequisite").then(res => {
    return res.data;
  });
}
export async function AllType() {
  return HTTP.get("/project/type").then(res => {
    return res.data;
  });
}
export async function AllStatus() {
  return HTTP.get("/project/status").then(res => {
    return res.data;
  });
}

//#endregion outbound

//#region inbound

export async function New(val) {
  await HTTP.post("/project", val).catch(() => {
    console.error("Can't add new group");
  });
}

//#endregion inbound

export async function Form(gID) {
  return await HTTP.post("/form", { Form_GroupID: gID }).then(res => {
    console.log(res.data);
    return res.data;
  });
}

export async function FormCE(gID, fID) {
  return await HTTP.post("/form", { Form_GroupID: gID, Form_TypeID: fID })
    .then(res => {
      if (res.data) {
        return res.data;
      }
    })
    .catch(() => {
      console.error("Can't get 'form CE'");
    });
}

export async function form_ce(gID, fID) {
  return await HTTP.get("/form/group/" + gID + "/type/" + fID).then(res => {
    console.log(res);
    return res.data;
  });
}
export async function form_comment(fID) {
  return await HTTP.post("/formcomment", { Comment_FormID: fID }).then(res => {
    return res.data;
  });
}
export async function new_formcomment(fID, tID, text) {
  HTTP.post("/formcomment/create", {
    Comment_FormID: fID,
    Comment_TeacherID: tID,
    Comment_Text: text,
    Comment_Time: new Date()
  });
}
export async function upload_form(fID, file, onUploadProgress) {
  let formData = new FormData();

  formData.append("file", file);

  return await HTTP.post(`/upload/fileCE0${fID}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
}
