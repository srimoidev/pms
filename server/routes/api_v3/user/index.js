const router = require("express").Router();
const db = require("../../../models");
router.use("/type", require("./type"));
const fs = require("fs");
const Op = db.Sequelize.Op;

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    var excludes = ["Password", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"];
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
      excludes.push("Username");
    }

    const data = await db.user_profile.findAll({
      attributes: {
        include: [
          [db.Sequelize.fn("concat", db.Sequelize.col("Prefix"), " ", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
        ],
        exclude: excludes
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
    ImgProfile: req.files[0]?.filename,
    IsActive: true,
    CreatedBy: req.body.CreatedBy,
    UpdatedBy: req.body.UpdatedBy
  };
  const transaction = await db.sequelize.transaction();
  try {
    await db.user_profile.create(user, { transaction: transaction });
    await transaction.commit().then(() => {
      return res.status(200).send();
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
    let importUserID = [];
    req.body.importedUser.forEach(element => {
      console.log(element);
      importUserID.push(element.Username);
    });
    const checkDuplicated = await db.user_profile.findAll({
      where: { Username: importUserID },
      attributes: ["Username"]
    });
    if (checkDuplicated?.length == 0) {
      req.body.importedUser.map(item => {
        item.IsActive = true; //default IsActive : true
        item.CreatedBy = req.body.user;
        item.UpdatedBy = req.body.user;
        item.UserTypeID = UserType.find(o => o.UserTypeNameEN == item.UserType)?.UserTypeID;
        delete item.UserType;
      });
      await db.user_profile.bulkCreate(req.body.importedUser, { transaction: transaction });
      await transaction.commit().then(() => {
        return res.status(200).send();
      });
    } else {
      var txtUserDuplicate = "";
      checkDuplicated.forEach(item => {
        txtUserDuplicate += ", " + item.Username;
      });
      txtUserDuplicate.substring(2);
      await transaction.commit().then(() => {
        return res.send({ msg: "มี Username ซ้ำ โปรดตรวจสอบและ Import อีกครั้ง", duplicate: txtUserDuplicate.substring(2) });
      });
    }
  } catch (err) {
    await transaction.rollback();
    res.send({
      message: err
    });
  }
});

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  console.log(req.files[0]);
  const user = {
    Password: req.body.Password,
    Prefix: req.body.Prefix,
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    StudentID: req.body.StudentID,
    Email: req.body.Email,
    TelephoneNo: req.body.TelephoneNo,
    IsActive: req.body.IsActive,
    UpdatedBy: req.body.UpdatedBy
  };
  if (req.files[0]) {
    user.ImgProfile = req.files[0]?.filename;
  }
  try {
    await db.user_profile.update(
      user,
      {
        where: {
          UserID: req.params.id
        }
      },
      { transaction: transaction }
    );
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.user_profile
      .destroy(
        {
          where: [
            {
              UserID: req.params.id
            }
          ]
        },
        { transaction: transaction }
      )
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
    await transaction.commit().then(() => {
      return res.status(200).send();
    });
  } catch (error) {
    await transaction.rollback();
    res.send({ message: error.message });
  }
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

router.get("/profile_image/:id", async (req, res) => {
  try {
    const data = await db.user_profile.findOne({
      where: [
        {
          UserID: req.params.id
        }
      ]
    });
    if (data.ImgProfile) {
      const path = `./uploads/profile_images/${data.ImgProfile}`;
      if (fs.existsSync(path)) {
        //file exists
        var file = fs.createReadStream(path);
        return file.pipe(res);
      }
    } else {
      return res.send({ msg: "Not Found!" });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

module.exports = router;
