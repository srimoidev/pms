const router = require("express").Router();
const db = require("../../../models");

// read
router.get("/", async (req, res) => {
  var whereStr = [];
  if (req.query.formid) {
    whereStr.push({
      FormID: req.query.formid
    });
  }
  if (req.query.userid) {
    whereStr.push({
      UserID: req.query.userid
    });
  }
  await db.form_comment
    .findAll({
      include: [
        {
          model: db.user_profile,
          as: "Comment_User",
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "StudentID",
            "Email",
            "TelephoneNo",
            "AcademicYear",
            [db.Sequelize.fn("concat", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
          ]
        }
        // {
        //   model: db.form_sent,
        //   as: "Comment_Form",
        //   include: [
        //     {
        //       model: db.form_type,
        //       as: "Form_Type"
        //     },
        //     {
        //       model: db.form_status,
        //       as: "Form_Status"
        //     }
        //   ]
        // }
      ],
      where: whereStr,
      order: [["CreatedTime", "DESC"]]
    })
    .then(data => res.json(data))
    .catch(err =>
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving!"
      })
    );
});

router.get("/:id", async (req, res) => {
  try {
    const data = await db.form_comment.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Comment_User"
        },
        {
          model: db.form_sent,
          as: "Comment_Form",
          include: [
            {
              model: db.form_type,
              as: "Form_Type"
            },
            {
              model: db.form_status,
              as: "Form_Status"
            }
          ]
        }
      ],
      where: [
        {
          CommentID: req.params.id
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
  await db.form_comment
    .create(req.body)
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
  await db.form_comment
    .update(req.body, {
      where: {
        Comment_ID: req.params.id
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
  await db.form_comment
    .destroy({
      where: [
        {
          Comment_ID: req.params.id
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
module.exports = router;
