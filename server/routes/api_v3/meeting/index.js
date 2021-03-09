const router = require("express").Router();
const db = require("../../../models")
router.use("/note", require("./note"))
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Meeting_ProjectID: req.query.projectid
            })
        }
        if (req.query.teacherid) {
            whereStr.push({
                Meeting_TeacherID: req.query.teacherid
            })
        }
        if (req.query.typeid) {
            whereStr.push({
                Meeting_TypeID: req.query.typeid
            })
        }
        const data = await db.meeting.findAll({
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
        const data = await db.meeting.findAll({
            where: [{
                Meeting_ID: req.params.id
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