const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  await db.app_environments
    .findOne({
      attributes: ["EnvName","EnvValue"],
      where: { EnvName: req.query.envname }
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

module.exports = router;
