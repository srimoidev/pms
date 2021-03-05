const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const user_profile = await db.user_profile.findAll({
      // include: [
      //   {
      //     model: db.project_info,
      //     as: "ProjectInfos",
      //     through: { attributes: [] },
      //   },
      // ],
      where: [req.query],
    });
    return res.json(user_profile);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
