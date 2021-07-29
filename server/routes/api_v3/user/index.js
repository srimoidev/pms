const router = require("express").Router();
const db = require("../../../models");
router.use("/type", require("./type"));
const fs = require("fs");
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
    if (req.query.all != 1) {
      whereStr.push({
        IsActive: true
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
router.get("/validate", async (req, res) => {
  try {
    var msg = {};
    console.log(req.query.username);
    msg = await db.user_profile.findAndCountAll({ where: { Username: req.query.username } }).then(res => {
      if (res.count > 0) {
        return { isExist: true };
      } else {
        return { isExist: false };
      }
    });
    return res.json(msg);
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
  const user = {
    Username: req.body.Username,
    Password: req.body.Password,
    Prefix: req.body.Prefix,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    StudentID: req.body.StudentID,
    Email: req.body.Email,
    TelephoneNo: req.body.TelephoneNo,
    UserTypeID: req.body.UserTypeID,
    ImgProfile: req.files[0].filename,
    IsActive: true,
    CreatedBy: req.body.CreatedBy,
    UpdatedBy: req.body.UpdatedBy
  };
  const transaction = await db.sequelize.transaction();
  try {
    await db.user_profile.create(user, { transaction: transaction });
    await transaction.commit();
    res.send({
      message: "Updated successfully!"
    });
  } catch (err) {
    await transaction.rollback();
    res.send({
      message: err
    });
  }
});

// import
router.post("/import", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    const UserType = await db.user_type.findAll();
    req.body.importedUser.map(item => {
      item.IsActive = true; //default IsActive : true
      item.CreatedBy = req.body.user;
      item.UpdatedBy = req.body.user;
      item.UserTypeID = UserType.find(o => o.UserTypeNameEN == item.UserType)?.UserTypeID;
      delete item.UserType;
    });
    await db.user_profile.bulkCreate(req.body.importedUser, { transaction: transaction });
    await transaction.commit();
    res.send({
      message: "Updated successfully!"
    });
  } catch (err) {
    await transaction.rollback();
    res.send({
      message: err
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  await db.user_profile
    .update(req.body, {
      where: {
        User_ID: req.params.id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Updated successfully!"
        });
      } else {
        res.send({
          message: `Cann't update, Maybe not found or req.body is empty!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating!"
      });
    });
});

// delete
router.delete("/:id", async (req, res) => {
  await db.user_profile
    .destroy({
      where: [
        {
          UserID: req.params.id
        }
      ]
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Deleted successfully!"
        });
      } else {
        res.send({
          message: `Can't delete, Maybe not found!`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error deleting!"
      });
    });
});

// bulk delete
router.post("/bulkdelete", async (req, res) => {
  await db.user_profile
    .destroy({
      where: { UserID: req.body.ids }
    })
    .then(() => {
      res.send({
        message: "Updated successfully!"
      });
    })
    .catch(err => {
      res.send({
        message: err
      });
    });
});

//import user template
router.get("/template/excel", async (req, res) => {
  try {
    var file = fs.createReadStream("./uploads/templates/ImportUser.xlsx");
    return file.pipe(res);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

module.exports = router;
