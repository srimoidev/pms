const router = require("express").Router();
const db = require("../../../models");

router.use("/advisor", require("./advisor"));
router.use("/committee", require("./committee"));
router.use("/member", require("./member"));
router.use("/progress", require("./progress"));
router.use("/status", require("./status"));
router.use("/type", require("./type"));
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.typeid) {
      whereStr.push({
        Project_TypeID: req.query.typeid
      });
    }
    if (req.query.sectionid) {
      whereStr.push({
        Project_SectionID: req.query.sectionid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        Project_StatusID: req.query.statusid
      });
    }
    const data = await db.project_info.findAll({
      include: [{
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            attributes: []
          }
        },
        {
          model: db.user_profile,
          as: "Project_Committees",
          through: {
            attributes: []
          }
        },
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
        },
        {
          model: db.project_progress,
          as: "Project_Progresses"
        }
      ],
      where: whereStr
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.project_info.findAll({
      include: [{
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            attributes: []
          }
        },
        {
          model: db.user_profile,
          as: "Project_Committees",
          through: {
            attributes: []
          }
        },
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
        },
        {
          model: db.project_progress,
          as: "Project_Progresses"
        }
      ],
      where: [{
        Project_ID: req.params.id
      }]
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
  await db.project_info
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

router.post("/create", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    // await db.project_info.create(req.body.project, {
    //     transaction: transaction
    // })
    await db.project_advisor.create(req.body.advisor, {
      transaction: transaction
    });
    await db.project_member.create(req.body.member, {
      transaction: transaction
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  await db.project_info
    .update(req.body, {
      where: {
        Project_ID: req.params.id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Updated successfully!"
        });
      } else {
        res.send({
          message: `Cann't update, Maybe not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating!"
      });
    });
});

// delete
router.delete("/:id", async (req, res) => {
  await db.project_info
    .destroy({
      where: [{
        Project_ID: req.params.id
      }]
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