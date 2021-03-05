const router = require("express").Router();
const db = require("../../../models/");

router.get("/", async (req, res) => {
    try {
        const section = await db.section.findAll({});
        return res.json(section);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/info", async (req, res) => {
    try {
        const section = await db.section.findAll({
            where: [{
                Section_ID: req.params.id
            }]
        });
        return res.json(section);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;