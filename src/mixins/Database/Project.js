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
export async function GetSelf(pID) {
  return await HTTP.get(`/project/${pID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function ProjectMember(pID) {
  return await HTTP.get(`/project/member?projectid=${pID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}
export async function GetAdvisor(pID) {
  return await HTTP.get(`/project/${pID}/advisor`)
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
export async function LatestEachForm(pID) {
  return await HTTP.get(`/form/group/${pID}/latest`)
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
export async function SelfProject(uID) {
  return HTTP.get(`/project/member?userid=${uID}`).then(res => {
    return res?.data[0]?.Member_ProjectID;
  });
}
//#endregion outbound

//#region inbound

export async function New(val) {
  await HTTP.post("/project", val).catch(() => {
    console.error("Can't add new group");
  });
}

export async function Join(pID, uID) {
  await HTTP.post("/project/member", {
    Member_ProjectID: pID,
    Member_UserID: uID,
    Member_UpdateTime: Date.now()
  }).catch(() => {
    console.error("Can't Join");
  });
}

export async function Leave(uID) {
  await HTTP.delete(`/project/member?userid=${uID}`).catch(() => {
    //
  });
}
//#endregion inbound

export async function Form(pID) {
  return await HTTP.post("/form", { Form_GroupID: pID }).then(res => {
    console.log(res.data);
    return res.data;
  });
}

export async function FormCE(pID, fID) {
  return await HTTP.post("/form", { Form_GroupID: pID, Form_TypeID: fID })
    .then(res => {
      if (res.data) {
        return res.data;
      }
    })
    .catch(() => {
      console.error("Can't get 'form CE'");
    });
}

export async function form_ce(pID, fID) {
  return await HTTP.get("/form/group/" + pID + "/type/" + fID).then(res => {
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
