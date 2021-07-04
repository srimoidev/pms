const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.userid) {
      whereStr.push({
        UserID: req.query.userid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        RequestStatusID: req.query.statusid
      });
    }
    const data = await db.project_member.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Member_Info",
          attributes: []
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
    const data = await db.project_member.findAll({
      where: [
        {
          Member_ID: req.params.id
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
  await db.project_member
    .create(req.body)
    .then(async data => {
      const members = await db.project_member.findAndCountAll({
        where: { ProjectID: req.body.ProjectID }
      });
      const project = await db.project_info.findOne({
        where: { ProjectID: req.body.ProjectID }
      });
      const createBy = await db.user_profile.findOne({ where: { User_ID: project.CreatedBy } });
      if (members.count == project.MaxMember) {
        /***อัพเดต Project_StatusID ถ้า Member เข้าร่วมกลุ่มครบตามจำนวน
         * เป็น 2 (Wait Advisor เมื่อนักศึกษาเป็นคนสร้างกลุ่ม)
         * เป็น 3 (Inprogress) เมื่ออาจารย์เป็นคนสร้างกลุ่ม
         ***/
        db.project_info.update({ ProjectStatusID: createBy.UserTypeID == 1 ? 2 : 3 }, { where: { ProjectID: req.body.ProjectID } });
      }
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
  await db.project_member
    .update(req.body, {
      where: {
        MemberID: req.params.id
      }
    })
    .then(async num => {
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
router.delete("/", async (req, res) => {
  await db.project_member
    .destroy({
      where: { ProjectID: req.query.projectid, UserID: req.query.userid }
    })
    .then(num => {
      db.project_info
        .findOne({
          where: {
            ProjectID: req.query.projectid
          }
        })
        .then(res => {
          if (res.ProjectStatusID == 2) {
            db.project_info.update({ ProjectStatusID: 1, CreatedBy: req.query.userid }, { where: { ProjectID: req.query.projectid } }); //เปลี่ยนกลับเป็น Draft ถ้า Project Status เป็น 2
          }
        });
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
// delete
router.delete("/:id", async (req, res) => {
  await db.project_member
    .destroy({
      where: [
        {
          Member_ID: req.params.id
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
