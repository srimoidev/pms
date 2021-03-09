const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.formid) {
            whereStr.push({
                Comment_FormID: req.query.formid
            })
        }
        if (req.query.userid) {
            whereStr.push({
                Comment_UserID: req.query.userid
            })
        }
        const data = await db.form_comment.findAll({
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
        const data = await db.form_comment.findAll({
            where: [{
                Comment_ID: req.params.id
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