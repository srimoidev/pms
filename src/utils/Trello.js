// import Axios from "axios";
// const key = "";
// // const secret = "";
// const token = "";

// var Trello = {
//   async getAllBoard(url) {
//     return await Axios.get(url + "1/members/me?key=" + key + "&token=" + token)
//       .then(res => {
//         return res.data.idBoards;
//       })
//       .catch(() => {
//         console.log("Can't get all user trello board.");
//       });
//   },
//   async getBoardDetail(url) {
//     try {
//       var temp = {};
//       temp = await this.getBoard(url);
//       temp.memberships = await this.getMembership(url);
//       temp.lists = await this.getBoardList(url);
//       for (const i in temp.lists) {
//         var allCards = await this.getCards(url);
//         temp.lists[i].items = allCards.filter(card => card.idList === temp.lists[i].id);
//       }
//       this.getCards(url);
//       sessionStorage.setItem("TrelloBoardDetail", JSON.stringify(temp));
//     } catch (error) {
//       console.error(error + "Can't get trello board detail");
//     }
//   },
//   async getBoard(url) {
//     return await Axios.get(url + "1/board/" + boardID + "?key=" + key + "&token=" + token)
//       .then(res => {
//         return res.data;
//       })
//       .catch(() => {
//         console.error("Can't get board");
//       });
//   },
//   async getMembership(url) {
//     return await Axios.get(url + "1/boards/" + boardID + "/memberships?key=" + key + "&token=" + token + "&member=true")
//       .then(res => {
//         var temp = [];
//         for (const i in res.data) {
//           temp.push(res.data[i].member);
//         }
//         return temp;
//       })
//       .catch(() => {
//         console.error("Can't get board members");
//       });
//   },
//   async getBoardList(url) {
//     return await Axios.get(url + "1/boards/" + boardID + "/lists?key=" + key + "&token=" + token)
//       .then(res => {
//         return res.data;
//       })
//       .catch(() => {
//         console.error("Can't get board list");
//       });
//   },
//   async getCards(url) {
//     return await Axios.get(url + "1/boards/" + boardID + "/cards?key=" + key + "&token=" + token)
//       .then(res => {
//         return res.data;
//       })
//       .catch(() => {
//         console.error("Can't get card");
//       });
//   }
// };

// export default Trello;
