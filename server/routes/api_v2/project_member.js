const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_member = await db.project_member.findAll({
      // include: [
      //   {
      //     model: db.project_member,
      //     as: "Project_Member",
      //     attributes: ["Member_ID", "Member_UserID"],
      //   },
      // ],
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(project_member);
  } catch (e) {
    return res.status(500).json({ message: "Cannot get data from database." });
  }
});

module.exports = router;

//
