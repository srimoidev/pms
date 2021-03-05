const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_type = await db.project_type.findAll({
      // include: [
      //   {
      //     model: db.project_type,
      //     as: "project_type",
      //     attributes: ["Member_ID", "Member_UserID"],
      //   },
      // ],
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(project_type);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
