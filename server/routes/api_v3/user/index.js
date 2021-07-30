const router = require("express").Router();
const db = require("../../../models");
router.use("/type", require("./type"));
const Op = db.Sequelize.Op;
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.typeid) {
      whereStr.push({
        UserTypeID: {
          [Op.in]: req.query.typeid
        }
      });
    }
    const data = await db.user_profile.findAll({
      attributes: {
        include: [
          [db.Sequelize.fn("concat", db.Sequelize.col("Prefix"), " ", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
        ],
        exclude: ["Username", "Password", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"]
      },
      where: whereStr
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.user_profile.findOne({
      attributes: {
        include: [
          [db.Sequelize.fn("concat", db.Sequelize.col("Prefix"), " ", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
        ],
        exclude: ["Username", "Password", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"]
      },
      where: [
        {
          UserID: req.params.id
        }
      ]
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

// create
router.post("/", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.user_profile.create(req.body, { transaction: transaction });
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
    await db.user_profile.update(
      req.body,
      {
        where: {
          User_ID: req.params.id
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
    await db.user_profile.destroy(
      {
        where: [
          {
            User_ID: req.params.id
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
