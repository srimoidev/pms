const router = require("express").Router();
const db = require("../../../models");
const Op = db.Sequelize.Op;

router.get("/project/type", async (req, res) => {
  try {
    const data = await db.project_type.findAll();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/project", async (req, res) => {
  try {
    var whereStr = [];
    if (req.query.projectid) {
      whereStr.push({
        ProjectID: req.query.projectid
      });
    }
    if (req.query.typeid) {
      whereStr.push({
        ProjectTypeID: req.query.typeid
      });
    }
    if (req.query.sectionid) {
      whereStr.push({
        SectionID: req.query.sectionid
      });
    }
    if (req.query.statusid) {
      whereStr.push({
        ProjectStatusID: req.query.statusid
      });
    }
    if (req.query.advisorid) {
      if (req.query.statusid) {
        var allProject = await db.project_advisor.findAll({
          attributes: ["ProjectID"],
          include: [{ model: db.project_info, as: "Project" }],
          where: {
            UserID: req.query.advisorid,
            [Op.and]: [
              {
                RequestStatus: req.query.reqStatus ? req.query.reqStatus : null
              }
            ]
          },
          raw: true
        });
        allProject = allProject.map(i => i.ProjectID);
        whereStr.push({
          ProjectID: { [Op.in]: allProject },
          [Op.and]: [{ ProjectStatusID: req.query.statusid ? req.query.statusid : null }]
        });
      } else {
        whereStr.push({
          "$Project_Advisors.UserID$": req.query.advisorid,
          [Op.and]: [
            {
              "$Project_Advisors.Advisors.RequestStatus$": req.query.reqStatus ? req.query.reqStatus : null
            }
          ]
        });
      }
    }
    if (req.query.criteria) {
      whereStr.push({
        [Op.or]: [
          {
            ProjectNameEN: {
              [Op.like]: `%${req.query.criteria}%`
            }
          },
          {
            ProjectNameTH: {
              [Op.like]: `%${req.query.criteria}%`
            }
          },
          {
            '$Project_Advisors.Firstname$': {
              [Op.like]: `%${req.query.criteria}%`
            }
          },
          {
            '$Project_Members.Firstname$': {
              [Op.like]: `%${req.query.criteria}%`
            }
          }
        ]
      });
    }
    const data = await db.project_info.findAll({
      include: [
        {
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          },
          attributes: { exclude: ["Username", "Password", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: ["AdvisorID"]
          },
          attributes: { exclude: ["Username", "Password", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.project_status,
          as: "Project_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.section,
          as: "Project_Section",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
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
                [
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Project_Section.Section_Instructor.Firstname"),
                    " ",
                    db.Sequelize.col("Project_Section.Section_Instructor.Lastname")
                  ),
                  "Fullname"
                ]
              ]
            }
          ]
        },
        {
          model: db.project_type,
          as: "Project_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        // {
        //   model: db.project_progress,
        //   as: "Project_Progresses"
        // },
        {
          model: db.user_profile,
          as: "UpdatedUser",
          attributes: { exclude: ["Username", "Password", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        }
      ],
      where: whereStr,
      attributes: { exclude: ["ProjectTypeID", "SectionID", "ProjectStatusID"] }
      //TODO order ตาม กลุ่มที่ยังไม่เต็ม และ ตาม create by
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    const data = await db.project_info.findOne({
      include: [
        {
          model: db.user_profile,
          as: "Project_Members",
          through: {
            attributes: []
          },
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "StudentID",
            "Email",
            "TelephoneNo",
            "AcademicYear",
            [db.Sequelize.fn("concat", db.Sequelize.col("Project_Members.Firstname"), " ", db.Sequelize.col("Project_Members.Lastname")), "Fullname"]
          ]
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            as: "Advisors",
            attributes: ["AdvisorID"]
          },
          attributes: [
            "UserID",
            "Firstname",
            "Lastname",
            "Email",
            "TelephoneNo",
            [
              db.Sequelize.fn("concat", db.Sequelize.col("Project_Advisors.Firstname"), " ", db.Sequelize.col("Project_Advisors.Lastname")),
              "Fullname"
            ]
          ]
        },
        // {
        //   model: db.user_profile,
        //   as: "Project_Committees",
        //   through: {
        //     attributes: []
        //   },
        //   attributes: { exclude: ["User_UserName", "User_Password", "User_StudentID", "User_AcademicYear"] }
        // },
        {
          model: db.project_status,
          as: "Project_Status",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        {
          model: db.section,
          as: "Project_Section",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] },
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
                [
                  db.Sequelize.fn(
                    "concat",
                    db.Sequelize.col("Project_Section.Section_Instructor.Firstname"),
                    " ",
                    db.Sequelize.col("Project_Section.Section_Instructor.Lastname")
                  ),
                  "Fullname"
                ]
              ]
            }
          ]
        },
        {
          model: db.project_type,
          as: "Project_Type",
          attributes: { exclude: ["CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        },
        // {
        //   model: db.project_progress,
        //   as: "Project_Progresses"
        // },
        {
          model: db.user_profile,
          as: "UpdatedUser",
          attributes: { exclude: ["Username", "Password", "StudentID", "AcademicYear", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"] }
        }
      ],
      where: { ProjectID: req.params.id },
      attributes: { exclude: ["ProjectTypeID", "SectionID", "ProjectStatusID"] }
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

router.get("/teacher", async (req, res) => {
  try {
    var excludes = ["Password", "CreatedBy", "CreatedTime", "UpdatedBy", "UpdatedTime"];
    const data = await db.user_profile.findAll({
      attributes: {
        include: [
          [db.Sequelize.fn("concat", db.Sequelize.col("Prefix"), " ", db.Sequelize.col("Firstname"), " ", db.Sequelize.col("Lastname")), "Fullname"]
        ],
        exclude: excludes
      },
      where: [{ UserTypeID: [2, 3, 5] }]
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
});

module.exports = router;
