import HTTP from "./config";

//#region outbound

//โปรเจ็คทั้งหมด
export async function GetAll(pName = null, pTypeID = null, pSectionID = null) {
  var searchStr = "?";
  if (pName != null) searchStr += "name=" + pName;
  if (pTypeID != null) searchStr += "&typeid=" + pTypeID;
  if (pSectionID != null) searchStr += "&sectionid=" + pSectionID;

  return await HTTP.get("/project" + searchStr)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}

//โปรเจ็คกลุ่มตัวเอง
export async function GetSelf(pUserID) {
  return await HTTP.get(`/project/${pUserID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}

//สมาชิกของโปรเจ็ค
export async function ProjectMember(pID) {
  return await HTTP.get(`/project/member?projectid=${pID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}

//ที่ปรึกษาของโปรเจ็ค
export async function GetAdvisor(pID) {
  return await HTTP.get(`/project/advisor?projectid=${pID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch group.");
    });
}

//CE
// export async function GetCE(type) {
//   return await HTTP.get(type)
//     .then(res => {
//       return res.data;
//     })
//     .catch(() => {
//       console.error("Can't fetch CE");
//     });
// }

// //form ล่าสุดของแต่ละ form ของแต่ละโปรเจ็ค
// export async function LatestEachForm(pID) {
//   return await HTTP.get(`/form/group/${pID}/latest`)
//     .then(res => {
//       return res.data;
//     })
//     .catch(() => {
//       console.error("Can't get latest 'form CE' from each type");
//     });
// }

//form ที่ต้องทำก่อน
// export async function FormPrerequisite() {
//   return await HTTP.get("/form/prerequisite").then(res => {
//     return res.data;
//   });
// }

//ประเภทของโปรเจ็คทั้งหมด
export async function AllType() {
  return HTTP.get("/project/type").then(res => {
    return res.data;
  });
}

//สถานะของโปรเจ็คทั้งหมด
export async function AllStatus() {
  return HTTP.get("/project/status").then(res => {
    return res.data;
  });
}

//project กลุ่มตัวเอง
export async function SelfProject(uID) {
  return HTTP.get(`/project/member?userid=${uID}`).then(res => {
    return res?.data[0]?.Member_ProjectID;
  });
}

//advisor
export async function Advisor(pProjectID, pUserID) {
  let paramsStr = "";
  if (pProjectID) {
    paramsStr += `projectid=${pProjectID}`;
  }
  if (pUserID) {
    paramsStr += `&userid=${pUserID}&all=true`;
  }
  console.log(`project/advisor?${paramsStr}`);
  return HTTP.get(`project/advisor?${paramsStr}`).then(res => {
    return res.data;
  });
}

//project ของ แต่ละ advisor
export async function GetProjectByAdvisor(uID) {
  return await HTTP.get(`/project?advisorid=${uID}&reqStatus=1`).then(res => {
    console.log(res.data);
    return res.data;
  });
}
//project รอ Confirm จากที่ปรึกษา และ ประจำวิชา
export async function WaitConfirmProject(uID) {
  if (uID) {
    return await HTTP.get(`/project?advisorid=${uID}&statusid=2`).then(res => {
      return res.data;
    });
  } else {
    return await HTTP.get(`/project?statusid=3`).then(res => {
      return res.data;
    });
  }
}
//ที่ปรึกษาที่ยังไม่ได้ Confirm เป็นที่ปรึกษาแต่ละโปรเจ็ค
export async function GetAllNotConfirmAdvisorByProjectID(pID) {
  return await HTTP.get(`/project/advisor?projectid=${pID}`).then(res => {
    return res.data;
  });
}
//#endregion outbound

//#region inbound

export async function New(pProject, pAdvisors, pMember) {
  await HTTP.post("/project/create", { project: pProject, advisors: pAdvisors, members: pMember }).catch(() => {
    console.error("Can't add new group");
  });
}

export async function Join(pID, uID) {
  console.log(pID, uID);
  await HTTP.post("/project/member", {
    Member_ProjectID: pID,
    Member_UserID: uID
  }).catch(() => {
    console.error("Can't Join");
  });
}

export async function Leave(pID, uID) {
  await HTTP.delete(`/project/member?projectid=${pID}&userid=${uID}`).catch(() => {
    //
  });
}

export async function ConfirmOrRejectProject(pUserID, pAdvisorID, pStatus, pIsBypass, pRemark) {
  await HTTP.put(`/project/advisor/${pAdvisorID}?isbypass=${pIsBypass}`, {
    updateObj: { Advisor_RequestStatus: pStatus },
    remark: pRemark,
    userid: pUserID
  }).catch(() => {
    //
  });
}

export async function InstructorConfirmOrRejectProject(pUserID, pProjectID, pStatus) {
  await HTTP.put(`/project/${pProjectID}`, { updateBy: pUserID, Project_StatusID: pStatus }).catch(() => {
    //
  });
}
export async function Resend(pProjectID, pUpdateObj, pAdvisors) {
  await HTTP.put(`/project/resend/${pProjectID}`, { project: pUpdateObj, advisors: pAdvisors }).catch(() => {
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
