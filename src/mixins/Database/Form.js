import HTTP from "./config";
//#region outbound

//Form ที่ต้องทำก่อน
export async function Prerequisite() {
  return HTTP.get("form/prerequisite")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.error(ex);
    });
}

//Form ทั้งหมดแต่ละ CE
export async function AllFormEachType(pProjectID, pFormID, pSectionID) {
  return HTTP.get(`form/sent?projectid=${pProjectID}&formtypeid=${pFormID}&sectionid=${pSectionID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.error(ex);
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
      console.error(ex);
    });
}
//Form type
export async function Types(pSubject) {
  return HTTP.get(`form/type?subject=${pSubject}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.error(ex);
    });
}
export async function Type(pFormTypeID) {
  return HTTP.get(`form/type/${pFormTypeID}`)
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.error(ex);
    });
}
//All Type
export async function AllType() {
  return HTTP.get("form/type/all")
    .then(res => {
      return res.data;
    })
    .catch(ex => {
      console.error(ex);
    });
}
//Form Status
export async function Status() {
  return HTTP.get("form/status").then(res => {
    return res.data;
  });
}
//Form deadline
export async function Deadline(pSubject) {
  return (await HTTP.get(`form/deadline${pSubject ? "?subject=" + pSubject : ""}`)).data;
}
//Form ล่าสุดของแต่ละ CE
export async function LatestEachForm(pID) {
  return await (await HTTP.get(`form/sent/${pID}/latest`)).data;
}

export async function WaitforAdvisorApprove(pUserID) {
  return await HTTP.get(`form/sent?advisorid=${pUserID}`).then(res => {
    return res.data;
  });
}
export async function WaitforInstructorApprove(pUserID) {
  return await HTTP.get(`form/sent?instructorid=${pUserID}`).then(res => {
    return res.data;
  });
}
export async function IsCompleteAllForm(pProjectID) {
  return await HTTP.get(`form/sent/iscompleteall?projectid=${pProjectID}`).then(res => {
    return res.data.IsCompleteAllForm;
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
    console.error(ex);
  });
}
export async function Upload(pUserID, pProjectID, pFormTypeID, pFile) {
  var formData = new FormData();
  formData.append("CreatedBy", pUserID);
  formData.append("UpdatedBy", pUserID);
  formData.append("ProjectID", pProjectID);
  formData.append("FormTypeID", pFormTypeID);
  formData.append("file", pFile);
  return HTTP.post("/form/sent/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
export async function ApproveOrReject(pUserID, pProjectID, pFormID, pStatusID) {
  return HTTP.put(`/form/sent/${pFormID}`, { ProjectID: pProjectID, FormStatusID: pStatusID, UpdatedBy: pUserID }).catch(() => {
    //
  });
}
export async function Add(pUserID, pFormType, pDeadline, pPrerequisite) {
  return HTTP.post(`/form/type`, { userid: pUserID, formtype: pFormType, deadline: pDeadline, prerequisite: pPrerequisite }).catch(() => {
    //
  });
}
export async function Update(pUserID, pFormTypeID, pFormType, pDeadline, pPrerequisite) {
  return HTTP.put(`/form/type/${pFormTypeID}`, { formType: pFormType, deadline: pDeadline, updatedUser: pUserID, prerequisite: pPrerequisite }).catch(
    () => {
      //
    }
  );
}
export async function Delete(pFormTypeID) {
  return HTTP.delete(`/form/type/${pFormTypeID}`).then(() => {
    //
  });
}
//#endregion inbound
