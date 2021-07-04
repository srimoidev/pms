import HTTP from "./config";

export async function Menus(pUSerTypeID) {
  return HTTP.get(`/app_menus?usertype=${pUSerTypeID}`)
    .then(res => {
      return res.data;
    })
    .catch(() => {
      //
    });
}
