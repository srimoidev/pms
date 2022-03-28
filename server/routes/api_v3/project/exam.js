const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.advisorid) {
      whereStr.push({
        "$Project_Advisors.UserID$": req.query.advisorid,
        "$Exam.ExamStatusID$": 1
        // [Op.and]: [{ ProjectStatusID: req.query.statusid ? req.query.statusid : null }]
      });
    }
    if (req.query.instructortype) {
      if (req.query.instructortype == 3) {
        whereStr.push({
          IsProject: false
        });
      } else {
        whereStr.push({
          IsProject: true
        });
      }
      whereStr.push({
        "$Exam.ExamStatusID$": 2
      });
    }
    if (req.query.all == 1) {
      whereStr.push({
        "$Exam.ExamStatusID$": 3
      });
    }
    const data = await db.project_info.findAll({
      include: [
        {
          model: db.exam,
          as: "Exam",
          include: [
            {
              model: db.exam_status,
              as: "Exam_Status"
            },
            {
              model: db.user_profile,
              as: "Project_Committees",
              required: false,
              through: {
                as: "Committee",
                attributes: []
              },
              attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            }
          ]
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
          as: "Project_Members",
          through: {
            attributes: []
          },
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
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

      where: whereStr
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/committee", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      // whereStr.push({
      //   "$Project_Advisors.UserID$": req.query.advisorid,
      //   "$Exam.ExamStatusID$": 1
      //   // [Op.and]: [{ ProjectStatusID: req.query.statusid ? req.query.statusid : null }]
      // });
    }
    const data = await db.exam.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Project_Committees",
          required: false,
          through: {
            as: "Committee",
            attributes: []
          },
          // attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
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

router.get("/preprojectlist", async (req, res) => {
  try {
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.get("/request", async (req, res) => {
  try {
    const exam = await db.exam.findOne({ where: { ProjectID: req.query.projectid } });

    return res.json({ IsExist: exam != null ? true : false });
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.post("/committee", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    console.log(req.body);
    await db.project_committee.create(req.body, { transaction: transaction }).then(async res => {
      // await db.notification_types
      // .findAll({
      //   where: { NotiTypeID: 1, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
      //   raw: true
      // })
      // .then(notiTemplate => {
      //   let template;
      //   req.body.members.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 1);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
      //       });
      //     }
      //   });
      //   req.body.advisors.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 2);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่"});
      //       });
      //     }
      //   });
      // })
      // .then(async () => {
      //   await transaction.commit().then(() => {
      //     return res.status(200).send();
      //   });
      // });
    });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});
router.post("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    // console.log(req.body,req.params.id)
    await db.exam.update(req.body, { where: { ExamID: req.params.id } }, { transaction: transaction }).then(async res => {
      // await db.notification_types
      // .findAll({
      //   where: { NotiTypeID: 1, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
      //   raw: true
      // })
      // .then(notiTemplate => {
      //   let template;
      //   req.body.members.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 1);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
      //       });
      //     }
      //   });
      //   req.body.advisors.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 2);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่"});
      //       });
      //     }
      //   });
      // })
      // .then(async () => {
      //   await transaction.commit().then(() => {
      //     return res.status(200).send();
      //   });
      // });
    });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});

//ขอสอบ
router.post("/request/preproject", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.exam.destroy({ where: [{ ProjectID: req.body.ProjectID, IsProjectExam: false }] }, { transaction: transaction });
    const ExamRequest = await db.exam.create(req.body, { transaction: transaction }).then(async res => {
      // await db.notification_types
      // .findAll({
      //   where: { NotiTypeID: 1, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
      //   raw: true
      // })
      // .then(notiTemplate => {
      //   let template;
      //   req.body.members.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 1);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
      //       });
      //     }
      //   });
      //   req.body.advisors.forEach(async userid => {
      //     if (userid != req.body.project.CreatedBy) {
      //       template = notiTemplate.find(item => item.UserTypeID == 2);
      //       template.TitleTemplate = template.TitleTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
      //       await db.notifications.create({
      //         NotiTypeID: 1,
      //         UserID: userid,
      //         Title: template.TitleTemplate,
      //         Message: template.MessageTemplate,
      //         ActionPage: template.ActionTemplate,
      //         CreatedBy: req.body.project.CreatedBy,
      //         UpdatedBy: req.body.project.UpdatedBy
      //       }).then(()=>{
      //         req.io.to(`room_${userid}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่"});
      //       });
      //     }
      //   });
      // })
      // .then(async () => {
      //   await transaction.commit().then(() => {
      //     return res.status(200).send();
      //   });
      // });
    });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});

module.exports = router;
