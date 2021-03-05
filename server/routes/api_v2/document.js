const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const document = await db.document.findAll({
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(document);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
