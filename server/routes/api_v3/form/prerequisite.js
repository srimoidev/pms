const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.formtypeid) {
      whereStr.push({
        PrerequisiteID: req.query.formtypeid
      });
    }
    if (req.query.formreqtypeid) {
      whereStr.push({
        FormReqTypeID: req.query.formreqtypeid
      });
    }
    const data = await db.form_prerequisite.findAll({
      include: [
        {
          model: db.form_type,
          as: "FormType",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.form_type,
          as: "RequireForm",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
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
    const data = await db.form_prerequisite.findAll({
      include: [
        {
          model: db.form_type,
          as: "FormType"
        },
        {
          model: db.form_type,
          as: "RequireForm"
        }
      ],
      where: [
        {
          PrerequisiteID: req.params.id
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
    await db.form_prerequisite.create(req.body, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.form_prerequisite.update(req.body, { where: { Pre_ID: req.params.id } }, { transaction: transaction });
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
    await db.form_prerequisite.destroy({ where: [{ Pre_ID: req.params.id }] }, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

module.exports = router;
