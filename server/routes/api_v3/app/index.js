const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  await db.app_privileges
    .findAll({
      include: [{ model: db.app_menus, attributes: { exclude: ["Sequence", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] } }],
      attributes: { exclude: ["UserTypeID", "MenuID", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
      where: { UserTypeID: req.query.usertype },
      order: [[db.app_menus, "Sequence"]]
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

//TODO เปิดให้อาจารย์ประจำวิชาสามาถแก้ไขลำดับเมนูหรือสิทธิ์ในการเห็นหน้าต่างๆได้

// // update
// router.put("/:id", async (req, res) => {
//   await db.document
//     .update(req.body, {
//       where: {
//         Document_ID: req.params.id
//       }
//     })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Updated successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cann't update, Maybe not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating!"
//       });
//     });
// });


module.exports = router;
