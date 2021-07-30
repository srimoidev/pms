const router = require("express").Router();
const db = require("../../../models");

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
    await db.form_comment.create(req.body, { transaction: transaction });
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
