const router = require("express").Router();
const db = require("../../../models/");

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.typeid) {
            whereStr.push({
                Form_TypeID: req.query.typeid
            })
        }
        if (req.query.projectid) {
            whereStr.push({
                Form_ProjectID: req.query.projectid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Form_StatusID: req.query.statusid
            })
        }
        const form_sent = await db.form_sent.findAll({
            include: [{
                    model: db.project_info,
                    as: "Project_Info",
                },
                {
                    model: db.form_type,
                    as: "Form_Type",
                },
                {
                    model: db.form_status,
                    as: "Form_Status",
                }
            ],
            attributes: {
                exclude: ["Form_ProjectID", "Form_TypeID", "Form_StatusID"],
            },
            where: whereStr,
        });
        return res.json(form_sent);
    } catch (error) {
        return res.status(500).json({
            msg: error.sql
        });
    }
});
router.get("/:id/info", async (req, res) => {
    try {
        const form_sent = await db.form_sent.findAll({
            include: [{
                    model: db.project_info,
                    as: "Project_Info",
                },
                {
                    model: db.form_type,
                    as: "Form_Type",
                },
                {
                    model: db.form_status,
                    as: "Form_Status",
                }
            ],
            attributes: {
                exclude: ["Form_ProjectID", "Form_TypeID", "Form_StatusID"],
            },
            where: [{
                Form_ID: req.params.id
            }],
        });
        return res.json(form_sent);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});
router.get("/:id/comment", async (req, res) => {
    try {
        const form_comment = await db.form_comment.findAll({
            include: [{
                    model: db.form_sent,
                    as: "Form_Info"
                },
                {
                    model: db.user_profile,
                    as: "User_Info"
                }
            ],
            attributes: {
                exclude: ["Comment_FormID", "Comment_UserID"],
            },
            where: [{
                Comment_FormID: req.params.id
            }],
        });
        return res.json(form_comment);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});
module.exports = router;