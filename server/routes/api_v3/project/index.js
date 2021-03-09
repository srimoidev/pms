const router = require("express").Router();
const db = require("../../../models")

router.use("/advisor", require("./advisor"))
router.use("/committee", require("./committee"))
router.use("/member", require("./member"))
router.use("/progress", require("./progress"))
router.use("/status", require("./status"))
router.use("/type", require("./type"))
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.typeid) {
            whereStr.push({
                Project_TypeID: req.query.typeid
            })
        }
        if (req.query.sectionid) {
            whereStr.push({
                Project_SectionID: req.query.sectionid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Project_StatusID: req.query.statusid
            })
        }
        const data = await db.project_info.findAll({
            where: whereStr
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const data = await db.project_info.findAll({
            where: [{
                Project_ID: req.params.id
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