const router = require("express").Router();

const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const form_sent = await db.form_sent.findAll({
      include: [
        {
          model: db.form_comment,
          as: "Form_Comments",
        },
      ],
      // where: {
      //   Member_ProjectID: req.query.id,
      // },
    });
    return res.json(form_sent);
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;

//
