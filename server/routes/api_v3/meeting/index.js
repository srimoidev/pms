const router = require("express").Router();
const db = require("../../../models");
router.use("/note", require("./note"));
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.teacherid) {
      whereStr.push({
        TeacherID: req.query.teacherid
      });
    }
    const data = await db.meeting.findAll({
      include: [
        {
          model: db.project_info,
          as: "Meeting_Project"
        },
        {
          model: db.user_profile,
          as: "Meeting_Teacher"
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
    const data = await db.meeting.findAll({
      include: [
        {
          model: db.project_info,
          as: "Meeting_Project",
          include: [
            {
              model: db.user_profile,
              as: "Project_Members",
              attributes: [
                "UserID",
                "Firstname",
                "Lastname",
                "StudentID",
                "Email",
                "TelephoneNo",
                "AcademicYear",
                [
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Meeting_Project.Project_Members.Firstname"),
                    " ",
                    db.Sequelize.col("Meeting_Project.Project_Members.Lastname")
                  ),
                  "Fullname"
                ]
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
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Meeting_Project.Project_Advisors.Firstname"),
                    " ",
                    db.Sequelize.col("Meeting_Project.Project_Advisors.Lastname")
                  ),
                  "Fullname"
                ]
              ]
            }
          ]
        },
        {
          model: db.user_profile,
          as: "Meeting_Teacher"
        }
      ],
      where: [
        {
          MeetingID: req.params.id
        }
      ]
    });
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

// create
router.post("/", async (req, res) => {
  console.log(req);
  const transaction = await db.sequelize.transaction();
  try {
    await db.meeting.create(req.body, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  console.log(req.body);
  const transaction = await db.sequelize.transaction();
  try {
    await db.meeting.update(req.body, { where: { MeetingID: req.params.id } }, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.meeting.destroy({ where: [{ MeetingID: req.params.id }] }, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

module.exports = router;
