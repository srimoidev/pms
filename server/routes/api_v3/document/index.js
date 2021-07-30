const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  await db.document
    .findAll()
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

router.get("/:id", async (req, res) => {
  await db.document
    .findAll({
      where: [
        {
          Document_ID: req.params.id
        }
      ]
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

// create
router.post("/", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.document.create(
      {
        Document_Name: req.body.Document_Name,
        Document_FileName: req.body.Document_FileName,
        Document_DateTime: req.body.Document_DateTime
      },
      { transaction: transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.document.update(
      req.body,
      {
        where: {
          Document_ID: req.params.id
        }
      },
      { transaction: transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.document.destroy(
      {
        where: [
          {
            Document_ID: req.params.id
          }
        ]
      },
      { transaction: transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

module.exports = router;
