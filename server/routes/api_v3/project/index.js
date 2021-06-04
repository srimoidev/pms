const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;
router.use("/advisor", require("./advisor"));
router.use("/committee", require("./committee"));
router.use("/member", require("./member"));
router.use("/progress", require("./progress"));
router.use("/status", require("./status"));
router.use("/type", require("./type"));
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        Project_ID: req.query.projectid
      });
    }
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
    if (req.query.advisorid) {
      whereStr.push({
        "$Project_Advisors.User_ID$": req.query.advisorid,
        [Op.and]: [
          {
            "$Project_Advisors.Advisors.Advisor_RequestStatus$": req.query.reqStatus ? req.query.reqStatus : null
          }
        ]
      });
    }
    if (req.query.name) {
      whereStr.push({
        [Op.or]: [
          {
            Project_NameEN: {
              [Op.like]: `%${req.query.name}%`
            }
          },
          {
            Project_NameTH: {
              [Op.like]: `%${req.query.name}%`
            }
          }
        ]
      });
    }
    const data = await db.project_info.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          },
          attributes: { exclude: ["User_UserName", "User_Password", "project_member"] }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: { exclude: ["Advisor_ProjectID", "Advisor_UserID", "Advisor_RequestStatus", "Advisor_UpdatedTime"] }
          },
          attributes: { exclude: ["User_UserName", "User_Password", "User_StudentID", "User_AcademicYear"] }
        },
        {
          model: db.user_profile,
          as: "Project_Committees",
          through: {
            attributes: []
          },
          attributes: { exclude: ["User_UserName", "User_Password", "User_StudentID", "User_AcademicYear"] }
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
      where: whereStr,
      attributes: { exclude: ["Project_TypeID", "Project_SectionID", "Project_StatusID"] },
      //TODO order ตาม กลุ่มที่ยังไม่เต็ม และ ตาม create by
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
    const data = await db.project_info.findOne({
      include: [
        {
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          },
          attributes: { exclude: ["User_UserName", "User_Password", "project_member"] }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: { exclude: ["Advisor_ProjectID", "Advisor_UserID", "Advisor_RequestStatus", "Advisor_UpdatedTime"] }
          },
          attributes: { exclude: ["User_UserName", "User_Password", "User_StudentID", "User_AcademicYear"] }
        },
        {
          model: db.user_profile,
          as: "Project_Committees",
          through: {
            attributes: []
          },
          attributes: { exclude: ["User_UserName", "User_Password", "User_StudentID", "User_AcademicYear"] }
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
      where: {Project_ID:req.params.id},
      attributes: { exclude: ["Project_TypeID", "Project_SectionID", "Project_StatusID"] }
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

//สร้างกลุ่ม เพิ่่มอาจารย์ที่ปรึกษา เพิ่มสมาชิก
router.post("/create", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    console.log(req.body);
    const project = await db.project_info.create(req.body.project, {
      transaction: transaction
    });
    for (const item of req.body.advisors) {
      await db.project_advisor.create(
        {
          Advisor_ProjectID: project.Project_ID,
          Advisor_UserID: item,
          // Advisor_RequestStatusID: 1 //1 Wait Approved
        },
        {
          transaction: transaction
        }
      );
    }
    for (const item of req.body.members) {
      console.log(item);
      await db.project_member.create(
        {
          Member_UserID: item,
          Member_ProjectID: project.Project_ID
        },
        {
          transaction: transaction
        }
      );
    }
    await transaction.commit();
    res.send(project);
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
      where: [
        {
          Project_ID: req.params.id
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
