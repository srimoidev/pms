const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  await db.app_environments
    .findOne({
      attributes: ["EnvName", "EnvValue"],
      where: { EnvName: req.query.envname }
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});
router.post("/", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  await db.app_environments.findOne({ where: { EnvName: req.body.EnvName } }).then(async env => {
    if (!env) {
      await db.app_environments
        .create(req.body, { transaction: transaction })
        .then(async () => {
          await transaction.commit().then(() => {
            return res.status(200).send();
          });
        })
        .catch(err =>
          res.status(500).json({
            message: err.message || "Some error occurred while retrieving!"
          })
        );
    } else {
      await db.app_environments
        .update({ EnvValue: req.body.EnvValue }, { where: { EnvName: req.body.EnvName } }, { transaction: transaction })
        .then(async () => {
          await transaction.commit().then(() => {
            return res.status(200).send();
          });
        })
        .catch(err =>
          res.status(500).json({
            message: err.message || "Some error occurred while retrieving!"
          })
        );
    }
  });
});
module.exports = router;
