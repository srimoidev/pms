const router = require("express").Router();
const db = require("../../../models")
router.use("/type", require("./type"))
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.typeid) {
            whereStr.push({
                User_TypeID: req.query.typeid
            })
        }
        const data = await db.user_profile.findAll({
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
        const data = await db.user_profile.findAll({
            where: [{
                User_ID: req.params.id
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