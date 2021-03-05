const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const user_type = await db.user_type.findAll({
      // include: [
      //   {
      //     model: db.project_info,
      //     as: "ProjectInfos",
      //     through: { attributes: [] },
      //   },
      // ],
      where: [req.query],
    });
    return res.json(user_type);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
