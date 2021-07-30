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
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member.create(req.body, { transaction: transaction }).then(async data => {
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
        db.project_info.update(
          { ProjectStatusID: createBy.UserTypeID == 1 ? 2 : 3 },
          { where: { ProjectID: req.body.ProjectID } },
          { transaction: transaction }
        );
      }
    });
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
    await db.project_member.update(
      req.body,
      {
        where: {
          MemberID: req.params.id
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
router.delete("/", async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.project_member
      .destroy(
        {
          where: { ProjectID: req.query.projectid, UserID: req.query.userid }
        },
        { transaction: transaction }
      )
      .then(num => {
        db.project_info
          .findOne({
            where: {
              ProjectID: req.query.projectid
            }
          })
          .then(res => {
            if (res.ProjectStatusID == 2) {
              db.project_info.update(
                { ProjectStatusID: 1, CreatedBy: req.query.userid },
                { where: { ProjectID: req.query.projectid } },
                { transaction: transaction }
              ); //เปลี่ยนกลับเป็น Draft ถ้า Project Status เป็น 2
            }
          });
      });
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
    await db.project_member.destroy(
      {
        where: [
          {
            Member_ID: req.params.id
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
