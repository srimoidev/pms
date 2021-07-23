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
  console.log(pID);
  return await HTTP.get("/meeting/" + pID)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(() => {
      console.error("Can't find.");
    });
}

//#endregion outbound

//#region inbound
export async function New(pData) {
  console.log(pData);
  await HTTP.post("/meeting/", pData).catch(() => {
    console.error("Can't add new meeting.");
  });
}

export async function Approve(pID) {
  console.log(pID);
  await HTTP.put("/meeting/" + pID, { RequestStatus: "2" })
    .then(test => {
      console.log(test);
    })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}
export async function Decline(pID) {
  console.log(pID);
  await HTTP.put("/meeting/" + pID, { RequestStatus: "3" })
    .then(test => {
      console.log(test);
    })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}

export async function Delete(pID) {
  console.log(pID);
  await HTTP.put("/meeting/" + pID, { IsActive: 0 })
    .then(test => {
      console.log(test);
    })
    .catch(() => {
      console.error("Can't add new meeting.");
    });
}

export async function UpdateNote(pID, pNote) {
  console.log(pID);
  await HTTP.put("/meeting/" + pID, { Note: pNote })
    .then(test => {
      console.log(test);
    })
    .catch(() => {
      console.error("Can't update meeting.");
    });
}
//#endregion inbound
