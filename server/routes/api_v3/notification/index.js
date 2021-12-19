const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    const data = await db.notifications.findAll({
      include: [
        {
          model: db.notification_types,
          as: "NotiType",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.user_profile,
          as: "CreatedUser",
          attributes: { exclude: ["Username", "Password", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        }
      ],
      where: { UserID: req.query.userid },
      order: [["CreatedTime", "DESC"]]
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
    const data = await db.notification.findAll({
      where: [
        {
          Notification_ID: req.params.id
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
    req.body.CreatedBy = 1581;
    req.body.UpdatedBy = 1581;
    await db.notifications.create(req.body, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
    console.log(req.body);
    req.io.to(`room_${req.body.UserID}`).emit("notifications", { msg: "add new Project" });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.notification.update(req.body, { where: { Notification_ID: req.params.id } }, { transaction: transaction });
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
    await db.notification.destroy({ where: [{ Notification_ID: req.params.id }] }, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
module.exports = router;
