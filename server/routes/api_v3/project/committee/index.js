const router = require("express").Router();
const db = require("../../../../models");
router.use("/committee/role", require("./role"));
const { sequelize } = require("../../../../models");
router.get("/", async (req, res) => {
  try {
    var strSql = `SELECT
                    PC.*
                  FROM
                    project_committee PC
                  INNER JOIN exam EX ON
                      EX.ExamID = PC.ExamID
                  INNER JOIN project_info PI ON
                      PI.ProjectID = EX.ProjectID
                  WHERE
                      PI.ProjectID=${req.query.projectid} AND PC.UserID = ${req.query.userid} AND PI.IsProject=${req.query.isproject}
                      LIMIT 1`;
    const data = await sequelize.query(strSql, {raw: true, type: sequelize.QueryTypes.SELECT });
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    const data = await db.project_info.findOne({
      include: [
        {
          model: db.exam,
          as: "Exam",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          include: [
            {
              model: db.project_committee,
              as: "Project_Score",
              include: [
                {
                  model: db.user_profile,
                  as: "Teacher",
                  
                  attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
                }
              ],
              attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
            }
          ]
        }
      ],
      attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
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
    const data = await db.project_committee.findAll({
      where: [
        {
          CommitteeID: req.params.id
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
    await db.project_committee.create(req.body, { transaction: transaction });
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
    await db.project_committee.update(
      req.body,
      {
        where: {
          CommitteeID: req.params.id
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
    await db.project_committee.destroy(
      {
        where: [
          {
            Committee_ID: req.params.id
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
