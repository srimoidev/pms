const router = require("express").Router();
const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const user = await db.user.findAll({});
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
});

module.exports = router;