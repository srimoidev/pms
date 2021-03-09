const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Advisor_ProjectID: req.query.projectid
            })
        }
        if (req.query.userid) {
            whereStr.push({
                Advisor_UserID: req.query.userid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Advisor_RequestStatusID: req.query.statusid
            })
        }
        const data = await db.project_advisor.findAll({
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
        const data = await db.project_advisor.findAll({
            where: [{
                Advisor_ID: req.params.id
            }]
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;