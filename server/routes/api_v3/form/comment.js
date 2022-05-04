const router = require("express").Router();
const { sequelize } = require("../../../models");
const db = require("../../../models");
const { QueryTypes } = require("sequelize");
// read
router.get("/", async (req, res) => {
  var whereStr = [];
  if (req.query.formid) {
    whereStr.push({
      FormID: req.query.formid
    });
  }
  if (req.query.userid) {
    whereStr.push({
      UserID: req.query.userid
    });
  }
  await db.form_comment
    .findAll({
      include: [
        {
          model: db.user_profile,
          as: "Comment_User",
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "StudentID",
            "Email",
            "TelephoneNo",
            "AcademicYear",
            [db.Sequelize.fn("concat", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
          ]
        }
      ],
      where: whereStr,
      order: [["CreatedTime", "DESC"]]
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.form_comment.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Comment_User"
        },
        {
          model: db.form_sent,
          as: "Comment_Form",
          include: [
            {
              model: db.form_type,
              as: "Form_Type"
            },
            {
              model: db.form_status,
              as: "Form_Status"
            }
          ]
        }
      ],
      where: [
        {
          CommentID: req.params.id
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
    await db.form_comment
      .create(req.body, { transaction: transaction })
      .then(async () => {
        const user = await db.user_profile.findOne({ where: { UserID: req.body.CreatedBy } });
        // let project = await sequelize.query(
        //   "SELECT * FROM project_info as PI where EXISTS (SELECT * From project_advisor AS PM where PI.ProjectID=PM.ProjectID AND PM.UserID=" +
        //     req.body.CreatedBy +
        //     ")",
        //   { raw: false, type: QueryTypes.SELECT }
        // );
        // project = project.length > 0 ? project[0] : {};
        const formSent = await db.form_sent.findOne({
          where: { FormID: req.body.FormID },
          raw: true
        });
        const form = await db.form_type.findOne({ where: { FormTypeID: formSent.FormTypeID }, raw: true });

        await db.notification_types
          .findAll({
            where: { NotiTypeID: 20, UserTypeID: 1 }, //นักศึกษาและที่ปรึกษา
            raw: true
          })
          .then(async notiTemplate => {
            const members = await db.project_member.findAll({ where: { ProjectID: formSent.ProjectID }, raw: true });
            // const advisors = await db.project_advisor.findAll({ where: { ProjectID: project.ProjectID }, raw: true });
            // const preProjectInstructor = await db.user_profile.findAll({ where: { UserTypeID: 3 }, raw: true });
            // const projectInstructor =await db.user_profile.findAll({ where: { UserTypeID: 5 }, raw: true });
            let template;
            members.forEach(async member => {
              if (member.UserID != req.body.CreatedBy) {
                template = notiTemplate.find(item => item.UserTypeID == 1);

                template.MessageTemplate = template.MessageTemplate.replace("{FormName}", form.FormTypeName);
                template.ActionTemplate = template.ActionTemplate.replace("{FormID}", formSent.FormID);

                await db.notifications
                  .create({
                    NotiTypeID: 20,
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

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.form_comment.update(req.body, { where: { Comment_ID: req.params.id } }, { transaction: transaction });
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
    await db.form_comment.destroy(
      {
        where: [{ Comment_ID: req.params.id }]
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
