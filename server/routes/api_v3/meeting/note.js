const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.meetingid) {
      whereStr.push({
        MeetingNote_MeetingID: req.query.meetingid
      });
    }
    const data = await db.meeting_note.findAll({
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
    const data = await db.meeting_note.findAll({
      where: [
        {
          MeetingNote_ID: req.params.id
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
    await db.meeting_note.create(req.body, { transaction: transaction });
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
    await db.meeting_note.update(req.body, { where: { MeetingNote_ID: req.params.id } }, { transaction: transaction });
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
    await db.meeting_note.destroy({ where: [{ MeetingNote_ID: req.params.id }] }, { transaction: transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});
module.exports = router;
