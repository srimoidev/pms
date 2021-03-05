const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const form_prerequisite = await db.form_prerequisite.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(form_prerequisite);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
