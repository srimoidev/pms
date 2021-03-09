const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Form_ProjectID: req.query.projectid
            })
        }
        if (req.query.formtypeid) {
            whereStr.push({
                Form_TypeID: req.query.formtypeid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Form_StatusID: req.query.statusid
            })
        }
        const data = await db.form_sent.findAll({
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
        const data = await db.form_sent.findAll({
            where: [{
                Form_ID: req.params.id
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