const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;
router.use("/advisor", require("./advisor"));
router.use("/committee", require("./committee"));
router.use("/member", require("./member"));
router.use("/progress", require("./progress"));
router.use("/status", require("./status"));
router.use("/type", require("./type"));
router.use("/example_files", require("./example_files"));
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.typeid) {
      whereStr.push({
        ProjectTypeID: req.query.typeid
      });
    }
    if (req.query.sectionid) {
      whereStr.push({
        SectionID: req.query.sectionid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        ProjectStatusID: req.query.statusid
      });
    }
    if (req.query.advisorid) {
      if (req.query.statusid) {
        var allProject = await db.project_advisor.findAll({
          attributes: ["ProjectID"],
          include: [{ model: db.project_info, as: "Project" }],
          where: {
            UserID: req.query.advisorid,
            [Op.and]: [
              {
                RequestStatus: req.query.reqStatus ? req.query.reqStatus : null
              }
            ]
          },
          raw: true
        });
        console.log(allProject);
        allProject = allProject.map(i => i.ProjectID);
        whereStr.push({
          ProjectID: { [Op.in]: allProject },
          [Op.and]: [{ ProjectStatusID: req.query.statusid ? req.query.statusid : null }]
        });
      } else {
        whereStr.push({
          "$Project_Advisors.UserID$": req.query.advisorid,
          [Op.and]: [
            {
              "$Project_Advisors.Advisors.RequestStatus$": req.query.reqStatus ? req.query.reqStatus : null
            }
          ]
        });
      }
    }
    if (req.query.name) {
      whereStr.push({
        [Op.or]: [
          {
            ProjectNameEN: {
              [Op.like]: `%${req.query.name}%`
            }
          },
          {
            ProjectNameTH: {
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
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: ["AdvisorID"]
          },
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
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
          as: "Project_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.section,
          as: "Project_Section",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          include: [
            {
              model: db.user_profile,
              as: "Section_Instructor",
              attributes: [
                "UserID",
                "Firstname",
                "Lastname",
                "Email",
                "TelephoneNo",
                [
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Project_Section.Section_Instructor.Firstname"),
                    " ",
                    db.Sequelize.col("Project_Section.Section_Instructor.Lastname")
                  ),
                  "Fullname"
                ]
              ]
            }
          ]
        },
        {
          model: db.project_type,
          as: "Project_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.project_progress,
          as: "Project_Progresses"
        },
        {
          model: db.user_profile,
          as: "UpdatedUser",
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        }
      ],
      where: whereStr,
      attributes: { exclude: ["ProjectTypeID", "SectionID", "ProjectStatusID"] }
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
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "StudentID",
            "Email",
            "TelephoneNo",
            "AcademicYear",
            [db.Sequelize.fn("concat", db.Sequelize.col("Project_Members.Firstname"), " ", db.Sequelize.col("Project_Members.Lastname")), "Fullname"]
          ]
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: ["AdvisorID"]
          },
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "Email",
            "TelephoneNo",
            [
              db.Sequelize.fn("concat", db.Sequelize.col("Project_Advisors.Firstname"), " ", db.Sequelize.col("Project_Advisors.Lastname")),
              "Fullname"
            ]
          ]
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
          as: "Project_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.section,
          as: "Project_Section",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          include: [
            {
              model: db.user_profile,
              as: "Section_Instructor",
              attributes: [
                "UserID",
                "Firstname",
                "Lastname",
                "Email",
                "TelephoneNo",
                [
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Project_Section.Section_Instructor.Firstname"),
                    " ",
                    db.Sequelize.col("Project_Section.Section_Instructor.Lastname")
                  ),
                  "Fullname"
                ]
              ]
            }
          ]
        },
        {
          model: db.project_type,
          as: "Project_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.project_progress,
          as: "Project_Progresses"
        },
        {
          model: db.user_profile,
          as: "UpdatedUser",
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        }
      ],
      where: { ProjectID: req.params.id },
      attributes: { exclude: ["ProjectTypeID", "SectionID", "ProjectStatusID"] }
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
    await db.project_info.create(req.body, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

//สร้างกลุ่ม เพิ่่มอาจารย์ที่ปรึกษา เพิ่มสมาชิก
router.post("/create", async (req, res) => {
  let initStatus;
  const createBy = await db.user_profile.findOne({ where: { UserID: req.body.project.CreatedBy } });
  //กรณีนักศึกษาเป็นผู้สร้าง
  if (createBy.UserTypeID == 1) {
    if (req.body.project.MaxMember == req.body.members?.length) {
      initStatus = 2; //Wait Advisor ถ้า Add member มาเต็มจำนวน
    } else {
      initStatus = 1; //Draft ถ้า Add มาไม่เต็ม
    }
  } else {
    if (req.body.project.MaxMember == req.body.members?.length) {
      initStatus = 3; //Wait Advisor ถ้า Add member มาเต็มจำนวน
    } else {
      initStatus = 1; //Draft ถ้า Add มาไม่เต็ม
    }
  }
  req.body.project.ProjectStatusID = initStatus;
  const transaction = await db.sequelize.transaction();
  try {
    const project = await db.project_info.create(req.body.project, {
      transaction: transaction
    });
    for (const item of req.body.advisors) {
      await db.project_advisor.create(
        {
          ProjectID: project.ProjectID,
          UserID: item,
          CreatedBy: req.body.project.CreatedBy,
          UpdatedBy: req.body.project.UpdatedBy
        },
        {
          transaction: transaction
        }
      );
    }
    for (const item of req.body.members) {
      await db.project_member.create(
        {
          UserID: item,
          ProjectID: project.ProjectID,
          CreatedBy: req.body.project.CreatedBy,
          UpdatedBy: req.body.project.UpdatedBy
        },
        {
          transaction: transaction
        }
      );
    }
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
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
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_info.update(req.body, { where: { ProjectID: req.params.id } }, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
//ขออนุมัติโปรเจ็คใหม่กรณีถูก Reject
router.put("/resend/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  req.body.project.ProjectStatusID = 2; //set 2 Wait Advisor
  req.body.project.UpdatedBy = req.body.userid;
  try {
    await db.project_info.update(req.body.project, { where: { ProjectID: req.params.id } }, { transaction: transaction }).then(async () => {
      await db.project_advisor.destroy({ where: { ProjectID: req.params.id } }, { transaction: transaction }).then(async () => {
        for (const item of req.body.advisors) {
          await db.project_advisor.create(
            { ProjectID: req.params.id, UserID: item, CreatedBy: req.body.userid, UpdatedBy: req.body.userid },
            { transaction: transaction }
          );
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

// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_info.destroy({ where: [{ ProjectID: req.params.id }] }, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
module.exports = router;
