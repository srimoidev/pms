const router = require("express").Router();
const db = require("../../../models")

//#region Read
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.sectionid) {
            whereStr.push({
                Deadline_SectionID: req.query.sectionid
            })
        }
        if (req.query.formtypeid) {
            whereStr.push({
                Deadline_FormTypeID: req.query.formtypeid
            })
        }
        const data = await db.deadline.findAll({
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
        const data = await db.deadline.findAll({
            where: [{
                Deadline_ID: req.params.id
            }]
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});
//#endregion

//#region Delete
router.delete("/:id", async (req, res) => {
    await db.deadline.destroy({
            where: [{
                Deadline_ID: req.params.id
            }]
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete, Maybe not found!`
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: error
            });
        });
})
//#endregion
module.exports = router;