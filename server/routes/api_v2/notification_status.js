const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const notification_status = await db.notification_status.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(notification_status);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
