const router = require("express").Router();
const db = require("../../../../models")
router.use("/committee/role", require("./role"))
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Committee_ProjectID: req.query.projectid
            })
        }
        if (req.query.userid) {
            whereStr.push({
                Committee_UserID: req.query.userid
            })
        }
        if (req.query.roleid) {
            whereStr.push({
                Committee_RoleID: req.query.roleid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Committee_RequestStatusID: req.query.statusid
            })
        }
        const data = await db.project_committee.findAll({
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
        const data = await db.project_committee.findAll({
            where: [{
                Committee_ID: req.params.id
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