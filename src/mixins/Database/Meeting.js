import HTTP from "./config";

//#region outbound
export async function GetAll() {
  return await HTTP.get("/meeting")
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
  await HTTP.put("/meeting/" + pID, { RequestStatus: "2" })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}
export async function Decline(pID) {
  await HTTP.put("/meeting/" + pID, { RequestStatus: "3" })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}

export async function Delete(pID) {
  await HTTP.put("/meeting/" + pID, { RequestStatus: "4" })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}

export async function UpdateNote(pID, pNote) {
  await HTTP.put("/meeting/" + pID, { Note: pNote })
    .catch(() => {
      console.error("Can't update meeting.");
    });
}
//#endregion inbound
