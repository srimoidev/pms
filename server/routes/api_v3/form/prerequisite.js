const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.formtypeid) {
            whereStr.push({
                Pre_FormTypeID: req.query.formtypeid
            })
        }
        if (req.query.formreqtypeid) {
            whereStr.push({
                Pre_FormReqTypeID: req.query.formreqtypeid
            })
        }
        const data = await db.form_prerequisite.findAll({
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
        const data = await db.form_prerequisite.findAll({
            where: [{
                Pre_ID: req.params.id
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