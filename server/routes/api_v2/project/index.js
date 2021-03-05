const router = require("express").Router();
const db = require("../../../models/");

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.typeid) {
            whereStr.push({
                Project_TypeID: req.query.typeid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Project_StatusID: req.query.statusid
            })
        }
        if (req.query.sectionid) {
            whereStr.push({
                Project_StatusID: req.query.sectionid
            })
        }
        if (req.query.advisorid) {
            whereStr.push({
                Project_StatusID: req.query.advisorid
            })
        }
        if (req.query.studentid) {
            whereStr.push({
                Project_StatusID: req.query.studentid
            })
        }
        if (req.query.committeeid) {
            whereStr.push({
                Project_StatusID: req.query.committeeid
            })
        }
        const project_info = await db.project_info.findAll({
            include: [{
                    model: db.project_status,
                    as: "Project_Status",
                },
                {
                    model: db.project_type,
                    as: "Project_Type",
                },
                {
                    model: db.section,
                    as: "Project_Section",
                },
            ],
            attributes: {
                exclude: ["Project_TypeID", "Project_SectionID", "Project_StatusID"],
            },
            where: whereStr,
        });
        return res.json(project_info);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/info", async (req, res) => {
    try {
        const project_info = await db.project_info.findAll({
            include: [{
                    model: db.project_status,
                    as: "Project_Status",
                },
                {
                    model: db.project_type,
                    as: "Project_Type",
                },
                {
                    model: db.section,
                    as: "Project_Section",
                },
            ],
            where: [{
                Project_ID: req.params.id
            }],
            attributes: {
                exclude: ["Project_TypeID", "Project_SectionID", "Project_StatusID"],
            },
        });
        return res.json(project_info);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/member", async (req, res) => {
    try {
        const project_member = await db.project_member.findAll({
            include: [{
                model: db.user_profile,
                as: "Member_Info",
            }, ],
            where: [{
                Member_ProjectID: req.params.id
            }],
            attributes: {
                exclude: ["Member_ID", "Member_UserID", "Member_ProjectID"],
            },
        });
        return res.json(project_member);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/advisor", async (req, res) => {
    try {
        const project_advisor = await db.project_advisor.findAll({
            include: [{
                model: db.user_profile,
                as: "Advisor_Info",
            }, ],
            where: [{
                Advisor_ProjectID: req.params.id
            }],
            attributes: {
                exclude: ["Advisor_ID", "Advisor_UserID", "Advisor_ProjectID"],
            },
        });
        return res.json(project_advisor);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/committee", async (req, res) => {
    try {
        const project_committee = await db.project_committee.findAll({
            include: [{
                    model: db.user_profile,
                    as: "Committee_Info",
                },
                {
                    model: db.project_committee_role,
                    as: "Committee_Role",
                },
            ],
            where: [{
                Committee_ProjectID: req.params.id
            }],
            attributes: {
                exclude: ["Committee_ID", "Committee_UserID", "Committee_ProjectID", "Committee_RoleID"],
            },
        });
        return res.json(project_committee);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;