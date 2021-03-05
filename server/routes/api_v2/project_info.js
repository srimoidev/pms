const router = require("express").Router();
const db = require("../../models/index");

router.get("/", async (req, res) => {
  try {
    const project_info = await db.project_info.findAll({
      include: [
        {
          model: db.project_type,
          as: "Project_Type",
        },
        {
          model: db.section,
          as: "Project_Section",
        },
        {
          model: db.project_status,
          as: "Project_Status",
        },
        {
          model: db.user_profile,
          as: "Project_Members",
          through: {
            where: { Member_RequestStatusID: 1 },
            attributes: [],
          },
        },
        {
          model: db.user_profile,
          as: "Project_Advisors",
          through: {
            where: { Advisor_RequestStatusID: 1 },
            attributes: [],
          },
        },
        {
          model: db.user_profile,
          as: "Project_Committee",
          through: {
            where: { Committee_RequestStatusID: 1 },
            attributes: [
              "Committee_PresentScore",
              "Committee_DocumentScore",
              "Committee_AdvisorScore",
            ],
            as: "Committee_Points",
          },
        },
      ],
      where: [req.query],
      attributes: {
        exclude: ["Project_TypeID", "Project_SectionID", "Project_StatusID"],
      },
    });
    return res.json(project_info);
  } catch (e) {
    return res.status(500).json({ msg: e });
  }
});

module.exports = router;

//
