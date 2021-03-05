const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const form_type = await db.form_type.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(form_type);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
