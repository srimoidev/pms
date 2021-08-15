const router = require("express").Router();
const db = require("../../../models");
const fs = require("fs");
const mime = require("mime-types");

router.get("/", async (req, res) => {
  try {
    const data = await db.example_files.findAll({
      include: [
        {
          model: db.user_profile,
          as: "CreatedUser",
          attributes: [
            "UserID",
            [db.Sequelize.fn("concat", db.Sequelize.col("CreatedUser.Firstname"), " ", db.Sequelize.col("CreatedUser.Lastname")), "Fullname"]
          ]
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

router.get("/:id", async (req, res) => {
  try {
    const data = await db.example_files.findOne({
      where: [
        {
          ExampleFileID: req.params.id
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

router.get("/file/:id", async (req, res) => {
  try {
    const data = await db.example_files.findOne({
      where: [
        {
          ExampleFileID: req.params.id
        }
      ]
    });
    if (data.ExampleFileName) {
      const path = `./uploads/example_files/${data.ExampleFileName}`;
      if (fs.existsSync(path)) {
        //file exists
        var file = fs.createReadStream(path);
        res.set("Content-Type", mime.contentType(data.ExampleFileName));
        return file.pipe(res);
      }
    } else {
      return res.send({ msg: "Not Found!" });
    }
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

// create
router.post("/", async (req, res) => {
  let example_file = {
    OriginalFileName: req.files[0]?.originalname,
    ExampleFileName: req.files[0]?.filename,
    FileSize: req.files[0]?.size,
    CreatedBy: req.body.CreatedBy,
    UpdatedBy: req.body.UpdatedBy
  };

  const transaction = await db.sequelize.transaction();
  try {
    await db.example_files.create(example_file, { transaction: transaction });
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

// update
router.put("/:id", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member.update(
      req.body,
      {
        where: {
          MemberID: req.params.id
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
    let deletedFile = await db.example_files.findOne({
      where: {
        ExampleFileID: req.params.id
      }
    });
    await db.example_file
      .destroy(
        {
          where: {
            ExampleFileID: req.params.id
          }
        },
        { transaction: transaction }
      )
      .then(() => {
        fs.unlink(`./uploads/example_files/${deletedFile.ExampleFileName}`, err => {
          if (err) {
            throw err;
          }
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
module.exports = router;
