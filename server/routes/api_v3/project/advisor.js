const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        Advisor_ProjectID: req.query.projectid
      });
    }
    if (req.query.userid) {
      whereStr.push({
        Advisor_UserID: req.query.userid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        Advisor_RequestStatusID: req.query.statusid
      });
    }
    const data = await db.project_advisor.findAll({
      include: [
        {
          model: db.project_info,
          as: "Advisor_Project",
          include: [
            {
              model: db.project_status,
              as: "Project_Status"
            },
            {
              model: db.section,
              as: "Project_Section"
            },
            {
              model: db.project_type,
              as: "Project_Type"
            }
          ]
        }
      ],
      where: whereStr
    });
    console.log(whereStr);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.project_advisor.findAll({
      include: [
        {
          model: db.project_info,
          as: "Advisor_Project",
          include: [
            {
              model: db.project_status,
              as: "Project_Status"
            },
            {
              model: db.section,
              as: "Project_Section"
            },
            {
              model: db.project_type,
              as: "Project_Type"
            }
          ]
        }
      ],
      where: [
        {
          Advisor_ID: req.params.id
        }
      ]
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

// create
router.post("/", async (req, res) => {
  await db.project_advisor
    .create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating!"
      });
    });
});

// update
router.put("/:id", async (req, res) => {
  await db.project_advisor
    .update(req.body, {
      where: {
        Advisor_ID: req.params.id
      }
    })
    .then(async () => {
      const temp = await db.project_advisor.findOne({
        where: {
          Advisor_ID: req.params.id
        }
      })
      const isAllConfirm = await db.project_advisor.findAll({
        where: {
          Advisor_ProjectID: temp.Advisor_ProjectID,
          [Op.and]: {
            Advisor_RequestStatus: 0 
          }
        }
      });
      return isAllConfirm.length == 0 ? temp.Advisor_ProjectID : null
    })
    .then(async result => {
      console.log(result);
      if (result) {
        await db.project_info.update(
          { isAdvisorsConfirm: 1 }, //set that all teachers confirm to be advisor
          {
            // transaction: transaction,
            where: {
              Project_ID: result
            }
          }
        );
        console.log("asdasd");
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating!"
      });
    });
});

// .then(num => {
//   console.log(num);
//   await db.project_advisor.findAll({
//     where: {
//       Advisor_ProjectID: req.params.id
//     }
//   }

//   )
// if (num == 1) {
//   res.send({
//     message: "Updated successfully!"
//   });
// } else {
//   res.send({
//     message: `Cann't update, Maybe not found or req.body is empty!`
//   });
// }
// })
//     catch(err => {
//       res.status(500).send({
//         message: "Error updating!"
//       });
// });

// delete
router.delete("/:id", async (req, res) => {
  await db.project_advisor
    .destroy({
      where: [
        {
          Advisor_ID: req.params.id
        }
      ]
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete, Maybe not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting!"
      });
    });
});
module.exports = router;
