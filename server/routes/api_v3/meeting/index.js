const router = require("express").Router();
const db = require("../../../models");
router.use("/note", require("./note"));
router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.teacherid) {
      whereStr.push({
        TeacherID: req.query.teacherid
      });
    }
    const data = await db.meeting.findAll({
      include: [
        {
          model: db.project_info,
          as: "Meeting_Project"
        },
        {
          model: db.user_profile,
          as: "Meeting_Teacher"
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

router.get("/:id", async (req, res) => {
  try {
    const data = await db.meeting.findAll({
      include: [
        {
          model: db.project_info,
          as: "Meeting_Project",
          include: [
            {
              model: db.user_profile,
              as: "Project_Members"
            }
          ]
        },
        {
          model: db.user_profile,
          as: "Meeting_Teacher"
        }
      ],
      where: [
        {
          MeetingID: req.params.id
        }
      ]
    });
    return res.json(data[0]);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

// create
router.post("/", async (req, res) => {
  console.log(req);
  await db.meeting
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
  console.log(res.body);
  await db.meeting
    .update(req.body, {
      where: {
        MeetingID: req.params.id
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
  await db.meeting
    .destroy({
      where: [
        {
          MeetingID: req.params.id
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
    .catch(err => {
      res.status(500).send({
        message: "Error deleting!"
      });
    });
});

module.exports = router;
