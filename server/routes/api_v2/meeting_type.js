const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const meeting_type = await db.meeting_type.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(meeting_type);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
