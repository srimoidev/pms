const router = require("express").Router();
const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const section = await db.section.findAll({});
    return res.json(section);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
});

module.exports = router;

//
