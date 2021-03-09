const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Member_ProjectID: req.query.projectid
            })
        }
        if (req.query.userid) {
            whereStr.push({
                Member_UserID: req.query.userid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Member_RequestStatusID: req.query.statusid
            })
        }
        const data = await db.project_member.findAll({
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
            where: [{
                Member_ID: req.params.id
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