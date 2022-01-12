const router = require("express").Router();
const db = require("../../../models");

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
    if (req.query.statusid) {
      whereStr.push({
        RequestStatusID: req.query.statusid
      });
    }
    const data = await db.project_member.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Member_Info",
          attributes: []
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
    const data = await db.project_member.findAll({
      where: [
        {
          Member_ID: req.params.id
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
    await db.project_member
      .create(req.body, { transaction: transaction })
      .then(async () => {
        // const members = await db.project_member.findAndCountAll({
        //   where: { ProjectID: req.body.ProjectID }
        // });
        const user = await db.user_profile.findOne({ where: { UserID: req.body.UserID } });
        const project = await db.project_info.findOne({
          where: { ProjectID: req.body.ProjectID }
        });
        // if (members.count == project.MaxMember) {
        //   /***อัพเดต Project_StatusID ถ้า Member เข้าร่วมกลุ่มครบตามจำนวน
        //    * เป็น 2 (Wait Advisor เมื่อนักศึกษาเป็นคนสร้างกลุ่ม)
        //    * เป็น 3 (Inprogress) เมื่ออาจารย์เป็นคนสร้างกลุ่ม
        //    ***/
        //   db.project_info.update(
        //     { ProjectStatusID: createBy.UserTypeID == 1 ? 2 : 3 },
        //     { where: { ProjectID: req.body.ProjectID } },
        //     { transaction: transaction }
        //   );
        // }
        await db.notification_types
          .findAll({
            where: { NotiTypeID: 7, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
            raw: true
          })
          .then(async notiTemplate => {
            const members = await db.project_member.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
            const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
            // const preProjectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true });
            // const projectInstructor =await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true });
            let template;
            members.forEach(async member => {
              if (member.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 1);

                template.TitleTemplate = template.TitleTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
                req.io.to(`room_${member.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 7,
                  UserID: member.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: user.UserID,
                  UpdatedBy: user.UserID
                });
              }
            });
            advisors.forEach(async advisor => {
              if (advisor.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 2);

                template.TitleTemplate = template.TitleTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
                template.ActionTemplate = template.ActionTemplate.replace("{ProjectID}", project.ProjectID);
                req.io.to(`room_${advisor.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                await db.notifications.create({
                  NotiTypeID: 7,
                  UserID: advisor.UserID,
                  Title: template.TitleTemplate,
                  Message: template.MessageTemplate,
                  ActionPage: template.ActionTemplate,
                  CreatedBy: user.UserID,
                  UpdatedBy: user.UserID
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
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member.update(
      req.body,
      {
        where: {
          MemberID: req.params.id
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
router.delete("/", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member
      .destroy(
        {
          where: { ProjectID: req.query.projectid, UserID: req.query.userid }
        },
        { transaction: transaction }
      )
      .then(async () => {
        const user = await db.user_profile.findOne({ where: { UserID: req.query.userid } });
        const project = await db.project_info.findOne({
          where: { ProjectID: req.query.projectid }
        });

        await db.notification_types
          .findAll({
            where: { NotiTypeID: 8, UserTypeID: [1, 2] }, //นักศึกษาและที่ปรึกษา
            raw: true
          })
          .then(async notiTemplate => {
            const members = await db.project_member.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
            const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
            // const preProjectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true });
            // const projectInstructor =await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true });
            let template;
            members.forEach(async member => {
              if (member.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 1);

                template.TitleTemplate = template.TitleTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);

                await db.notifications
                  .create({
                    NotiTypeID: 8,
                    UserID: member.UserID,
                    Title: template.TitleTemplate,
                    Message: template.MessageTemplate,
                    ActionPage: template.ActionTemplate,
                    CreatedBy: user.UserID,
                    UpdatedBy: user.UserID
                  })
                  .then(() => {
                    req.io.to(`room_${member.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
                  });
              }
            });
            advisors.forEach(async advisor => {
              if (advisor.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 2);

                template.TitleTemplate = template.TitleTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{FullName}", user.Firstname + " " + user.Lastname);
                template.MessageTemplate = template.MessageTemplate.replace("{ProjectName}", project.ProjectNameTH);
                template.ActionTemplate = template.ActionTemplate.replace("{ProjectID}", project.ProjectID);

                await db.notifications
                  .create({
                    NotiTypeID: 8,
                    UserID: advisor.UserID,
                    Title: template.TitleTemplate,
                    Message: template.MessageTemplate,
                    ActionPage: template.ActionTemplate,
                    CreatedBy: user.UserID,
                    UpdatedBy: user.UserID
                  })
                  .then(() => {
                    req.io.to(`room_${advisor.UserID}`).emit("notifications", { msg: "มีการแจ้งเตือนใหม่" });
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
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member.destroy(
      {
        where: [
          {
            Member_ID: req.params.id
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
