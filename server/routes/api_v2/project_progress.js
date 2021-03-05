const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_progress = await db.project_progress.findAll({
      // include: [
      //   {
      //     model: db.project_progress,
      //     as: "project_progress",
      //     attributes: ["Member_ID", "Member_UserID"],
      //   },
      // ],
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(project_progress);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
