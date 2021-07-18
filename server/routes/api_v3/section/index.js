const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    const data = await db.section.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Section_Instructor",
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "Email",
            "TelephoneNo",
            [db.Sequelize.fn("concat", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
          ]
        }
      ],
      order: [["Subject", "ASC"]]
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
    const data = await db.section.findAll({
      where: [
        {
          Section_ID: req.params.id
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
  console.log(req.body.section);
  await db.section
    .findAndCountAll({ where: [{ Subject: req.body.section.Subject }] })
    .then(async res => {
      req.body.section.Sequence = res.count + 1;
      req.body.section.CreatedBy = req.body.userid;
      req.body.section.UpdatedBy = req.body.userid;
      return await db.section.create(req.body.section);
    })
    .then(async data => {
      await db.form_type.findAll().then(async form => {
        for (const item of form) {
          await db.deadline.create({
            SectionID: data.SectionID,
            FormTypeID: item.FormTypeID,
            CreatedBy: req.body.userid,
            UpdatedBy: req.body.userid
          });
        }
      });

      return data;
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating!"
      });
    });
});

// update
router.put("/:id", async (req, res) => {
  req.body.section.UpdatedBy = req.body.userid;
  await db.section
    .update(req.body.section, {
      where: {
        SectionID: req.params.id
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
  await db.section
    .destroy({
      where: [
        {
          SectionID: req.params.id
        }
      ]
    })
    .then(async () => {
      await db.deadline.destroy({
        where: [{ SectionID: req.params.id }]
      });
      return true;
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

module.exports = router;
