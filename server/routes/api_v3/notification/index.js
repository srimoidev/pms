const router = require("express").Router();
const db = require("../../../models")

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.userid) {
            whereStr.push({
                Notification_UserID: req.query.userid
            })
        }
        const data = await db.notification.findAll({
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
        const data = await db.notification.findAll({
            where: [{
                Notification_ID: req.params.id
            }]
        });
        return res.json(data);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

// create
router.post("/", async (req, res) => {
    await db.notification.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating!"
            });
        });
})

// update
router.put("/:id", async (req, res) => {
    await db.notification.update(req.body, {
            where: {
                Notification_ID: req.params.id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully!"
                });
            } else {
                res.send({
                    message: `Cann't update, Maybe not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating!"
            });
        });
})

// delete
router.delete("/:id", async (req, res) => {
    await db.notification.destroy({
            where: [{
                Notification_ID: req.params.id
            }]
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Deleted successfully!"
                });
            } else {
                res.send({
                    message: `Can't delete, Maybe not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting!"
            });
        });

});
module.exports = router;