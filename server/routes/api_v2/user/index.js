const router = require("express").Router();
const db = require("../../../models/");

router.get("/", async (req, res) => {
    try {
        const user_profile = await db.user_profile.findAll({});
        return res.json(user_profile);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/info", async (req, res) => {
    try {
        const user_profile = await db.user_profile.findAll({
            where: [{
                User_ID: req.params.id
            }]
        });
        return res.json(user_profile);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;