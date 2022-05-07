import HTTP from "./config";

//#region outbound
export async function GetAll(pProjectID, pTeacherID) {
  var whereStr = "";
  if (pProjectID) {
    whereStr += "?projectid=" + pProjectID;
  }
  if (pTeacherID) {
    whereStr += "?teacherid=" + pTeacherID;
  }
  return await HTTP.get("/meeting" + whereStr)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't fetch.");
    });
}

export async function findOne(pID) {
  return await HTTP.get("/meeting/" + pID)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      console.error("Can't find.");
    });
}

//#endregion outbound

//#region inbound
export async function New(pData) {
  await HTTP.post("/meeting/", pData).catch(() => {
    console.error("Can't add new meeting.");
  });
}

export async function Approve(pID) {
  await HTTP.put("/meeting/" + pID, { RequestStatus: "2" }).catch(() => {
    console.error("Can't add new meeting.");
  });
}
export async function Decline(pID) {
  await HTTP.put("/meeting/" + pID, { RequestStatus: "3" }).catch(() => {
    console.error("Can't add new meeting.");
  });
}

export async function Delete(pID) {
  await HTTP.put("/meeting/" + pID, { RequestStatus: "4" }).catch(() => {
    console.error("Can't add new meeting.");
  });
}

export async function UpdateNote(pID, pNote) {
  await HTTP.put("/meeting/" + pID, { Note: pNote }).catch(() => {
    console.error("Can't update meeting.");
  });
}
//#endregion inbound
