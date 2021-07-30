const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.sectionid) {
      whereStr.push({
        SectionID: req.query.sectionid
      });
    }
    if (req.query.formtypeid) {
      whereStr.push({
        FormTypeID: req.query.formtypeid
      });
    }
    const data = await db.deadline.findAll({
      include: [
        {
          model: db.form_type,
          as: "FormType",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.section,
          as: "Section",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
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
    const data = await db.deadline.findAll({
      include: [
        {
          model: db.form_type,
          as: "Deadline_FormType"
        },
        {
          model: db.section,
          as: "Deadline_Section"
        }
      ],
      where: [
        {
          DeadlineID: req.params.id
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
    await db.deadline.create(req.body, { transaction: transaction });
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
    await db.deadline.update(req.body, { where: { DeadlineID: req.params.id } });
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
    await db.deadline.destroy({ where: [{ DeadlineID: req.params.id }] }, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
module.exports = router;
