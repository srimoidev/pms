const router = require("express").Router();
const db = require("../../../models");
const { Op } = require("sequelize");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.formtypeid) {
      whereStr.push({
        FormTypeID: req.query.formtypeid
      });
    }
    if (req.query.advisorid) {
      whereStr.push({ [Op.and]: [{ "$Form_Project.Project_Advisors.UserID$": req.query.advisorid }, { FormStatusID: 1 }] });
    }
    if (req.query.instructorid) {
      whereStr.push({
        [Op.or]: [{ [Op.and]: [{ "$Form_Project.Project_Advisors.UserID$": req.query.instructorid }, { FormStatusID: 1 }] }, { FormStatusID: 2 }]
      });
    }
    const data = await db.form_sent.findAll({
      include: [
        {
          model: db.form_type,
          as: "Form_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.form_status,
          as: "Form_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.project_info,
          as: "Form_Project",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          include: [
            {
              model: db.user_profile,
              as: "Project_Advisors",
              through: {
                as: "Advisors",
                attributes: ["AdvisorID"]
              },
              attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            }
          ]
        },
        {
          model: db.deadline,
          as: "Deadline",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.user_profile,
          as: "CreatedUser",
          attributes: [
            "UserID",
            [db.Sequelize.fn("concat", db.Sequelize.col("CreatedUser.Firstname"), " ", db.Sequelize.col("CreatedUser.Lastname")), "Fullname"]
          ]
        },
        {
          model: db.user_profile,
          as: "UpdatedUser",
          attributes: [
            "UserID",
            [db.Sequelize.fn("concat", db.Sequelize.col("UpdatedUser.Firstname"), " ", db.Sequelize.col("UpdatedUser.Lastname")), "Fullname"]
          ]
        }
      ],
      group: "FormID",
      where: whereStr,
      // order: [
      //   ["Form_Project", "ProjectID", "asc"],
      //   ["Form_Project", "ProjectNameTH", "asc"],
      //   ["Form_Type", "FormTypeName", "asc"]
      // ]
      order:[
        ["CreatedTime", "desc"],
      ]
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.get("/:id/latest", async (req, res) => {
  await db.form_sent
    .findAll({
      attributes: [
        [db.sequelize.fn("COUNT", "*"), "Count"],
        [db.sequelize.fn("max", db.sequelize.col("FormID")), "Form_IDMax"]
      ],
      group: ["FormTypeID"],
      where: {
        ProjectID: req.params.id
      },
      raw: true,
      nast: true
    })
    .then(async maxIds => {
      var formMaxIds = [];
      maxIds.forEach(item => {
        formMaxIds.push(item.Form_IDMax);
      });
      await db.form_sent
        .findAll({
          include: [
            {
              model: db.form_type,
              as: "Form_Type",
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            },
            {
              model: db.form_status,
              as: "Form_Status",
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            }
          ],
          where: {
            FormID: {
              [Op.in]: formMaxIds
            }
          },
          raw: true,
          nest: true,
          attributes: { exclude: ["FormStatusID"] }
        })
        .then(result => {
          result.map(item => (item.Rev = maxIds[result.indexOf(item)].Count));
          res.json(result);
        });
    })
    .catch(err => {
      res.json({
        err: err.message
      });
    });
});
router.get("/:id", async (req, res) => {
  try {
    const data = await db.form_sent.findOne({
      include: [
        {
          model: db.form_type,
          as: "Form_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.form_status,
          as: "Form_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.project_info,
          as: "Form_Project",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
          // include: [
          //   {
          //     model: db.project_status,
          //     as: "Project_Status"
          //   },
          //   {
          //     model: db.section,
          //     as: "Project_Section"
          //   },
          //   {
          //     model: db.project_type,
          //     as: "Project_Type"
          //   }
          // ]
        }
      ],
      where: [
        {
          FormID: req.params.id
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
  const transaction = await db.sequelize.transaction();
  try {
    await db.form_sent
      .create(
        {
          ProjectID: req.body.ProjectID,
          FormTypeID: req.body.FormTypeID,
          CreatedBy: req.body.CreatedBy,
          UpdatedBy: req.body.UpdatedBy,
          FileName: req.files[0].filename,
          FormStatusID: 1
        },
        { transaction: transaction }
      )
      .then(() => {
        db.app_environments.findOne({ where: { EnvName: "FormFirstRequire" } }).then(res => {
          if (req.body.FormTypeID == parseInt(res.EnvValue)) {
            db.project_info.update(
              { ProjectStatusID: 2, UpdatedBy: req.body.UpdatedBy },
              {
                where: {
                  ProjectID: req.body.ProjectID
                }
              },
              { transaction: transaction }
            );
          }
        });
      })
      .then(async () => {
        await transaction.commit().then(() => {
          return res.status(200).send();
        });
        // db.notifications
      });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  console.log(req.body);
  var isAdvisor = await db.project_advisor.findOne({ where: { ProjectID: req.body.ProjectID, UserID: req.body.UpdatedBy }, raw: true });
  console.log(isAdvisor);
  var status;
  if (isAdvisor) {
    status = req.body.FormStatusID ? 2 : 3; //ถ้าอนุมัติโดยที่ปรึกษาเปลี่ยนสถานะเป็น 2(Wait Instructor) ถ้าไม่อนุมัติเป็น 3(Advisor Rejected)
  } else {
    status = req.body.FormStatusID ? 5 : 4; //ถ้าอนุมัติโดยประจำวิชาเปลี่ยนสถานะเป็น 5(Approved) ถ้าไม่อนุมัติเป็น 4(Instructor Rejected)
  }
  console.log(status);
  const transaction = await db.sequelize.transaction();
  try {
    await db.form_sent.update(
      { FormStatusID: status, UpdatedBy: req.body.UpdatedBy },
      {
        where: {
          FormID: req.params.id
        }
      },
      { transaction: transaction }
    );
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    let deletedFile = await db.form_sent.findOne({
      where: {
        FormID: req.params.id
      }
    });
    await db.form_sent
      .destroy(
        {
          where: {
            FormID: req.params.id
          }
        },
        { transaction: transaction }
      )
      .then(() => {
        fs.unlink(`./uploads/forms/${deletedFile.FileName}`, err => {
          if (err) {
            throw err;
          }
        });
      });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

//form pdf
router.get("/pdf/:id", async (req, res) => {
  try {
    const data = await db.form_sent.findOne({
      where: [
        {
          FormID: req.params.id
        }
      ]
    });
    var file = fs.createReadStream(`./uploads/forms/${data.FileName}`);
    return file.pipe(res);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

module.exports = router;
