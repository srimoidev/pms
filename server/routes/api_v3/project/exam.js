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
        "$Exam.ExamStatusID$": req.query.status
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
          }
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
    const exam = await db.exam.findOne({ where: { ProjectID: req.query.projectid, IsProjectExam: req.query.isproject } });

    return res.json({ IsExist: exam != null ? true : false, IsRevise: exam?.ExamStatusID == 4 ? true : false, Exam: exam });
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.post("/committee/submitscore/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  console.log(req.body,req.params.id)
  try {
    await db.project_committee.update(req.body, { where: { CommitteeID: req.params.id } }, { transaction: transaction }).then(async res => {});
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
//ขอสอบ
router.post("/request_exam", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.exam.destroy({ where: [{ ProjectID: req.body.ProjectID }] }, { transaction: transaction });
    await db.exam
      .create(req.body, { transaction: transaction })
      .then(async res => {
        await db.notification_types
          .findAll({
            where: { NotiTypeID: 21, UserTypeID: [2] }, //นักศึกษาและที่ปรึกษา
            raw: true
          })
          .then(async notiTemplate => {
            const project = await db.project_info.findOne({
              where: { ProjectID: req.body.ProjectID }
            });
            const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });

            let template;

            advisors.forEach(async advisor => {
              if (advisor.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 2);

                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                  "{OnDate}",
                  new Date(req.body.OnDate).toLocaleString("th-TH")
                );

                req.io.to(`room_${advisor.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 21,
                  UserID: advisor.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: req.body.CreatedBy,
                  UpdatedBy: req.body.CreatedBy
                });
              }
            });
          });
      })
      .then(async () => {
        await transaction.commit().then(() => {
          return res.status(200).send();
        });
      });
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});
router.post("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    var project;
    var members;
    var advisors;
    // const preProjectInstructor;
    // const projectInstructor;
    var exam = null;
    await db.exam
      .update(req.body, { where: { ExamID: req.params.id } }, { transaction: transaction })
      .then(async () => {
        exam = await db.exam.findOne({ where: { ExamID: req.params.id }, raw: true });
        project = await db.project_info.findOne({
          where: { ProjectID: exam.ProjectID }
        });
        members = await db.project_member.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
        advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
        // preProjectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true });
        // projectInstructor =await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true });
        if (req.body.ExamStatusID == 3) {
          advisors.forEach(async advisor => {
            await db.project_committee.create(
              {
                ExamID: exam.ExamID,
                UserID: advisor.UserID,
                CreatedBy: exam.UpdatedBy,
                UpdatedBy: exam.UpdatedBy
              },
              { transaction: transaction }
            );
          });
        }
      })
      .then(async () => {
        //ที่ปรึกษาอนุมัติ
        if (req.body.ExamStatusID == 2) {
          await db.notification_types
            .findAll({
              where: { NotiTypeID: 21, UserTypeID: [3, 5] }, //นักศึกษาและที่ปรึกษา
              raw: true
            })
            .then(async notiTemplate => {
              const project = await db.project_info.findOne({
                where: { ProjectID: exam.ProjectID }
              });
              const preProjectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true });
              const projectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true });

              let template;

              if (!project.IsProject) {
                preProjectInstructor.forEach(async item => {
                  template = notiTemplate.find(item => item.UserTypeID == 3);

                  template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                    "{OnDate}",
                    new Date(exam.OnDate).toLocaleString("th-TH")
                  );
                  req.io.to(`room_${item.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                  await db.notifications.create({
                    NotiTypeID: 21,
                    UserID: item.UserID,
                    Title: template.TitleTemplate,
                    Message: template.MessageTemplate,
                    ActionPage: template.ActionTemplate,
                    CreatedBy: exam.UpdatedBy,
                    UpdatedBy: exam.UpdatedBy
                  });
                });
              }
              if (project.IsProject) {
                projectInstructor.forEach(async item => {
                  template = notiTemplate.find(item => item.UserTypeID == 5);

                  template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                    "{OnDate}",
                    new Date(exam.OnDate).toLocaleString("th-TH")
                  );
                  req.io.to(`room_${item.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                  await db.notifications.create({
                    NotiTypeID: 21,
                    UserID: item.UserID,
                    Title: template.TitleTemplate,
                    Message: template.MessageTemplate,
                    ActionPage: template.ActionTemplate,
                    CreatedBy: exam.UpdatedBy,
                    UpdatedBy: exam.UpdatedBy
                  });
                });
              }
            });
        }
        //ประจำวิชาอนุมัติ
        if (req.body.ExamStatusID == 3) {
          await db.notification_types
            .findAll({
              where: { NotiTypeID: 22, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
              raw: true
            })
            .then(async notiTemplate => {
              const project = await db.project_info.findOne({
                where: { ProjectID: exam.ProjectID }
              });
              const members = await db.project_member.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
              const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });

              let template;

              members.forEach(async member => {
                template = notiTemplate.find(item => item.UserTypeID == 1);

                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                  "{OnDate}",
                  new Date(exam.OnDate).toLocaleString("th-TH")
                );

                req.io.to(`room_${member.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 22,
                  UserID: member.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: exam.UpdatedBy,
                  UpdatedBy: exam.UpdatedBy
                });
              });

              advisors.forEach(async advisor => {
                template = notiTemplate.find(item => item.UserTypeID == 2);

                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                  "{OnDate}",
                  new Date(exam.OnDate).toLocaleString("th-TH")
                );
                template.ActionTemplate = template.ActionTemplate.replace("{ProjectID}", project.ProjectID);

                req.io.to(`room_${advisor.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 22,
                  UserID: advisor.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: exam.UpdatedBy,
                  UpdatedBy: exam.UpdatedBy
                });
              });
            });
        }
        //อาจารย์ไม่อนุมัติ
        if (req.body.ExamStatusID == 4) {
          await db.notification_types
            .findAll({
              where: { NotiTypeID: 23, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
              raw: true
            })
            .then(async notiTemplate => {
              const project = await db.project_info.findOne({
                where: { ProjectID: exam.ProjectID }
              });
              const members = await db.project_member.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
              const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });

              let template;

              members.forEach(async member => {
                template = notiTemplate.find(item => item.UserTypeID == 1);

                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                  "{OnDate}",
                  new Date(exam.OnDate).toLocaleString("th-TH")
                );

                req.io.to(`room_${member.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 23,
                  UserID: member.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: exam.UpdatedBy,
                  UpdatedBy: exam.UpdatedBy
                });
              });

              advisors.forEach(async advisor => {
                if (advisor.UserID != exam.UpdatedBy) {
                  template = notiTemplate.find(item => item.UserTypeID == 2);

                  template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH).replace(
                    "{OnDate}",
                    new Date(exam.OnDate).toLocaleString("th-TH")
                  );
                  template.ActionTemplate = template.ActionTemplate.replace("{ProjectID}", project.ProjectID);

                  req.io.to(`room_${advisor.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                  await db.notifications.create({
                    NotiTypeID: 23,
                    UserID: advisor.UserID,
                    Title: template.TitleTemplate,
                    Message: template.MessageTemplate,
                    ActionPage: template.ActionTemplate,
                    CreatedBy: exam.UpdatedBy,
                    UpdatedBy: exam.UpdatedBy
                  });
                }
              });
            });
        }
      })
      .then(async () => {
        await transaction.commit().then(() => {
          return res.status(200).send();
        });
      });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send({
      message: err.message || "Some error occurred while creating!"
    });
  }
});

module.exports = router;
