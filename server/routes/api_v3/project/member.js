const router = require("express").Router();
const db = require("../../../models");

router.get("/", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        Member_ProjectID: req.query.projectid
      });
    }
    if (req.query.userid) {
      whereStr.push({
        Member_UserID: req.query.userid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        Member_RequestStatusID: req.query.statusid
      });
    }
    const data = await db.project_member.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Member_Info"
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
        where: { Member_ProjectID: req.body.Member_ProjectID }
      });
      const project = await db.project_info.findOne({
        where: { Project_ID: req.body.Member_ProjectID }
      });
      const createBy = await db.user_profile.findOne({ where: { User_ID: project.createBy } });
      if (members.count == project.Project_MaxMember) {
        /***อัพเดต Project_StatusID ถ้า Member เข้าร่วมกลุ่มครบตามจำนวน
         * เป็น 2 (Wait Advisor เมื่อนักศึกษาเป็นคนสร้างกลุ่ม)
         * เป็น 3 (Inprogress) เมื่ออาจารย์เป็นคนสร้างกลุ่ม
         ***/
        db.project_info.update({ Project_StatusID: createBy.User_TypeID == 1 ? 2 : 3 }, { where: { Project_ID: req.body.Member_ProjectID } });
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
        Member_ID: req.params.id
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
    .catch(err => {
      res.status(500).send({
        message: "Error updating!"
      });
    });
});
router.delete("/", async (req, res) => {
  var whereStr = [];
  if (req.query.projectid) {
    whereStr.push({
      Member_ProjectID: req.query.projectid
    });
  }
  if (req.query.userid) {
    whereStr.push({
      Member_UserID: req.query.userid
    });
  }
  if (whereStr.length > 0) {
    await db.project_member
      .destroy({
        where: whereStr
      })
      .then(num => {
        db.project_info
          .findOne({
            where: {
              Project_ID: req.query.projectid
            }
          })
          .then(res => {
            console.log(res.Project_StatusID);
            if (res.Project_StatusID == 2) {
              db.project_info.update({ Project_StatusID: 1 }, { where: { Project_ID: req.query.projectid } }); //เปลี่ยนกลับเป็น Draft ถ้า Project Status เป็น 2
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
      .catch(err => {
        res.status(500).send({
          message: "Error deleting!"
        });
      });
  } else {
    res.send("gg");
  }
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
    .catch(err => {
      res.status(500).send({
        message: "Error deleting!"
      });
    });
});
module.exports = router;
