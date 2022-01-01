const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.userid) {
      whereStr.push({
        UserID: req.query.userid
      });
    }
    if (req.query.all != "true") {
      if (req.query.statusid) {
        whereStr.push({
          RequestStatusID: req.query.statusid
        });
      } else {
        whereStr.push({
          RequestStatus: {
            [Op.is]: null
          }
        });
      }
    }

    const data = await db.project_advisor.findAll({
      include: [
        {
          model: db.project_info,
          as: "Project",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          include: [
            {
              model: db.project_status,
              as: "Project_Status",
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            },
            {
              model: db.section,
              as: "Project_Section",
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            },
            {
              model: db.project_type,
              as: "Project_Type",
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            }
          ]
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
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_advisor.create(req.body, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_advisor
      .update(
        req.body.updateObj,
        {
          where: {
            AdvisorID: req.params.id
          }
        },
        { transaction: transaction }
      )
      .then(async () => {
        const temp = await db.project_advisor.findOne({
          where: {
            AdvisorID: req.params.id
          }
        });
        //ถ้า Advisor_RequestStatus เป็น null แสดงว่าอาจารย์ยังไม่กดเลือก Confirm หรือ Reject
        const isAllConfirm = await db.project_advisor.findAll({
          where: {
            ProjectID: temp.ProjectID,
            [Op.and]: {
              RequestStatus: {
                [Op.eq]: null
              }
            }
          }
        });
        const isSomeAdvisorReject = await db.project_advisor.findAll({
          where: {
            ProjectID: temp.ProjectID,
            [Op.and]: {
              RequestStatus: 0
            }
          }
        });
        if (isSomeAdvisorReject.length != 0) {
          return { code: "REJECT", pID: temp.ProjectID };
        } else if (isAllConfirm.length == 0) {
          return { code: "ALLCONFIRM", pID: temp.ProjectID };
        } else {
          return;
        }
      })
      .then(async result => {
        switch (result.code) {
          case "ALLCONFIRM":
            if (req.query.isbypass == "true") {
              await db.project_info.update(
                { ProjectStatusID: 4, UpdatedBy: req.body.userid }, //ถ้า isbypass เป็น true set 4(In Progress)
                {
                  where: {
                    ProjectID: result.pID
                  }
                },
                { transaction: transaction }
              );
            } else {
              await db.project_info
                .update(
                  { ProjectStatusID: 3, UpdatedBy: req.body.userid }, //set 3(Wait Instructor)
                  {
                    where: {
                      ProjectID: result.pID
                    }
                  },
                  { transaction: transaction }
                )
                .then(async () => {
                  const notiTemplate = await db.notification_types.findAll({
                    where: { NotiTypeID: 3, UserTypeID: [1, 3, 5] }, //นักศึกษาและที่ปรึกษา
                    raw: true
                  });
                  let template;
                  const createBy = await db.user_profile.findOne({ where: { UserID: req.body.userid } });
                  const project = await db.project_info.findOne({
                    where: { ProjectID: result.pID },
                    raw: true
                  });
                  await db.project_member
                    .findAll({ where: { ProjectID: result.pID }, raw: true })
                    .then(async members => {
                      // project = project.toJSON();
                      members.forEach(async item => {
                        if (item.UserID != req.body.userid) {
                          template = notiTemplate.find(item => item.UserTypeID == 1);
                          req.io
                            .to(`room_${item.UserID}`)
                            .emit("notifications", { msg: createBy.Firstname + " " + createBy.Lastname + template.MessageTemplate });
                          await db.notifications.create({
                            NotiTypeID: 3,
                            UserID: item.UserID,
                            Title: template.TitleTemplate,
                            ActionPage: template.ActionTemplate,
                            Message: template.MessageTemplate,
                            CreatedBy: req.body.userid,
                            UpdatedBy: req.body.userid
                          });
                        }
                      });
                    })
                    .then(async () => {
                      console.log(!!project.IsProject, !project.IsProject);
                      if (!project.IsProject) {
                        await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true }).then(user => {
                          user.forEach(async item => {
                            template = notiTemplate.find(item => item.UserTypeID == 3);
                            template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
                            req.io
                              .to(`room_${item.UserID}`)
                              .emit("notifications", { msg: createBy.Firstname + " " + createBy.Lastname + template.MessageTemplate });
                            await db.notifications.create({
                              NotiTypeID: 3,
                              UserID: item.UserID,
                              Title: template.TitleTemplate,
                              Message: template.MessageTemplate,
                              ActionPage: template.ActionTemplate,
                              CreatedBy: req.body.userid,
                              UpdatedBy: req.body.userid
                            });
                          });
                        });
                      } else {
                        await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true }).then(user => {
                          user.forEach(async item => {
                            template = notiTemplate.find(item => item.UserTypeID == 5);
                            template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
                            req.io
                              .to(`room_${item.UserID}`)
                              .emit("notifications", { msg: createBy.Firstname + " " + createBy.Lastname + template.MessageTemplate });
                            await db.notifications.create({
                              NotiTypeID: 3,
                              UserID: item.UserID,
                              Title: template.TitleTemplate,
                              Message: template.MessageTemplate,
                              ActionPage: template.ActionTemplate,
                              CreatedBy: req.body.userid,
                              UpdatedBy: req.body.userid
                            });
                          });
                        });
                      }
                    });
                });
            }

            break;
          case "REJECT":
            await db.project_info
              .update(
                { ProjectStatusID: 8, RejectedRemark: req.body.remark, UpdatedBy: req.body.userid }, //set to Rejected
                {
                  where: {
                    ProjectID: result.pID
                  }
                },
                { transaction: transaction }
              )
              .then(async () => {
                const notiTemplate = await db.notification_types.findAll({
                  where: { NotiTypeID: 4, UserTypeID: 1 }, //นักศึกษาและที่ปรึกษา
                  raw: true
                });
                let template;
                const createBy = await db.user_profile.findOne({ where: { UserID: req.body.userid } });
                const project = await db.project_info.findOne({
                  where: { ProjectID: result.pID },
                  raw: true
                });
                await db.project_member.findAll({ where: { ProjectID: result.pID }, raw: true }).then(async members => {
                  members.forEach(async item => {
                    if (item.UserID != req.body.userid) {
                      template = notiTemplate.find(item => item.UserTypeID == 1);
                      req.io
                        .to(`room_${item.UserID}`)
                        .emit("notifications", { msg: createBy.Firstname + " " + createBy.Lastname + template.MessageTemplate });
                      await db.notifications.create({
                        NotiTypeID: 4,
                        UserID: item.UserID,
                        Title: template.TitleTemplate,
                        ActionPage: template.ActionTemplate,
                        Message: template.MessageTemplate,
                        CreatedBy: req.body.userid,
                        UpdatedBy: req.body.userid
                      });
                    }
                  });
                });
              });
            break;
        }
      });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
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
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_advisor.destroy(
      {
        where: [
          {
            Advisor_ID: req.params.id
          }
        ]
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
module.exports = router;
