const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_committee = await db.project_committee.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(project_committee);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
