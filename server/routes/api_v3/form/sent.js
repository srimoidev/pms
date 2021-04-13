const router = require("express").Router();
const db = require("../../../models");
const {
  Op
} = require("sequelize");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        Form_ProjectID: req.query.projectid
      });
    }
    if (req.query.formtypeid) {
      whereStr.push({
        Form_TypeID: req.query.formtypeid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        Form_StatusID: req.query.statusid
      });
    }
    const data = await db.form_sent.findAll({
      include: [{
          model: db.form_type,
          as: "Form_Type"
        },
        {
          model: db.form_status,
          as: "Form_Status"
        },
        {
          model: db.project_info,
          as: "Form_Project",
          include: [{
              model: db.project_status,
              as: "Project_Status"
            },
            {
              model: db.section,
              as: "Project_Section"
            },
            {
              model: db.project_type,
              as: "Project_Type"
            },
          ]
        }
      ],
      where: whereStr
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});
router.get("/:id/latest", async (req, res) => {
  await db.form_sent.findAll({
      attributes: [
        [db.sequelize.fn('max', db.sequelize.col('Form_ID')), 'Form_IDMax'],
      ],
      group: ["Form_TypeID"],
      where: {
        Form_ProjectID: req.params.id
      },
      raw: true,
      nast: true
    })
    .then(async maxIds => {
      var formMaxIds = []
      maxIds.forEach(item => {
        formMaxIds.push(item.Form_IDMax)
      });
      await db.form_sent.findAll({
        where: {
          Form_ID: {
            [Op.in]: formMaxIds
          }
        }
      }).then(result => {
        res.json(result)
      })
    })
    .catch(err => {
      res.json({
        err: err.message
      })
    })
})
router.get("/:id", async (req, res) => {
  try {
    const data = await db.form_sent.findOne({
      include: [{
          model: db.form_type,
          as: "Form_Type"
        },
        {
          model: db.form_status,
          as: "Form_Status"
        },
        {
          model: db.project_info,
          as: "Form_Project",
          include: [{
              model: db.project_status,
              as: "Project_Status"
            },
            {
              model: db.section,
              as: "Project_Section"
            },
            {
              model: db.project_type,
              as: "Project_Type"
            },
          ]
        }
      ],
      where: [{
        Form_ID: req.params.id
      }]
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
  console.log(req.body);
  await db.form_sent
    .create({
      Form_ProjectID: req.body.Form_ProjectID,
      Form_TypeID: req.body.Form_TypeID,
      Form_FileName: req.files[0].originalname,
      Form_StatusID: req.body.Form_StatusID,
      Form_CreatedTime: req.body.Form_CreatedTime || Date(),
      Form_RevisedTime: req.body.Form_RevisedTime || Date(),
      Form_CompletedTime: req.body.Form_CompletedTime || Date(),
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
  await db.form_sent
    .update(req.body, {
      where: {
        Form_ID: req.params.id
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
    .catch(err => {
      res.status(500).send({
        message: "Error updating!"
      });
    });
});

// delete
router.delete("/:id", async (req, res) => {
  await db.form_sent
    .destroy({
      where: [{
        Form_ID: req.params.id
      }]
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
    .catch(err => {
      res.status(500).send({
        message: "Error deleting!"
      });
    });
});

module.exports = router;