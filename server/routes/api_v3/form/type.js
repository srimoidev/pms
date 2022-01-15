const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    let whereStr = [];
    if (req.query.subject == 1) {
      whereStr.push({
        Project: true
      });
    }
    if (req.query.subject == 2) {
      whereStr.push({
        PreProject: true
      });
    }
    whereStr.push({ isActive: true });
    const data = await db.form_type.findAll({
      where: whereStr
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await db.form_type.findAll({
      include: [
        {
          model: db.form_type,
          as: "RequireForms",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
          through: {
            model: db.form_prerequisite,
            as: "Forms",
            attributes: []
          }
        }
      ],
      order: [
        // ["RequireForms", "FormTypeName", "ASC"],
        // ["RequireForms", "Forms", "FormTypeName", "ASC"]
      ]
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
    const data = await db.form_type.findOne({
      where: [
        {
          FormTypeID: req.params.id
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
  req.body.formtype.CreatedBy = req.body.userid;
  req.body.formtype.UpdatedBy = req.body.userid;
  const transaction = await db.sequelize.transaction();
  try {
    const formType = await db.form_type.create(req.body.formtype, { transaction: transaction });
    for (const item of req.body.deadline) {
      await db.deadline.create(
        {
          SectionID: item.SectionID,
          FormTypeID: formType.FormTypeID,
          OnDate: item.OnDate,
          CreatedBy: req.body.userid,
          UpdatedBy: req.body.userid
        },
        { transaction: transaction }
      );
    }
    for (const item of req.body.prerequisite) {
      await db.form_prerequisite.create({ FormTypeID: formType.FormTypeID, FormReqTypeID: item }, { transaction: transaction });
    }
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
  req.body.formType.UpdatedBy = req.body.updatedUser;
  const transaction = await db.sequelize.transaction();
  try {
    await db.form_type.update(req.body.formType, { where: { FormTypeID: req.params.id } }, { transaction: transaction }).then(async () => {
      for (const item of req.body.deadline) {
        await db.deadline.update(
          { OnDate: item.OnDate, UpdatedBy: req.body.updatedUser },
          { where: { DeadlineID: item.DeadlineID } },
          { transaction: transaction }
        );
      }

      await db.form_prerequisite.destroy({ where: { FormTypeID: req.params.id } }, { transaction: transaction }).then(async () => {
        for (const item of req.body.prerequisite) {
          await db.form_prerequisite.create({ FormTypeID: req.params.id, FormReqTypeID: item }, { transaction: transaction });
        }
      });
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
    await db.form_type
      .destroy({ where: [{ FormTypeID: req.params.id }] }, { transaction: transaction })
      .then(async () => {
        await db.form_prerequisite.destroy({ where: [{ FormTypeID: req.params.id }] }, { transaction: transaction });
      })
      .then(async () => {
        await db.deadline.destroy({ where: [{ FormTypeID: req.params.id }] }, { transaction: transaction });
      });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

module.exports = router;
