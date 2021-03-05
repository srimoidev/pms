const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_status = await db.project_status.findAll({
      // include: [
      //   {
      //     model: db.project_status,
      //     as: "project_status",
      //     attributes: ["Member_ID", "Member_UserID"],
      //   },
      // ],
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(project_status);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
