const router = require("express").Router();
const db = require("../../../../models")
router.use("/committee/role", require("./role"))
router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Committee_ProjectID: req.query.projectid
            })
        }
        if (req.query.userid) {
            whereStr.push({
                Committee_UserID: req.query.userid
            })
        }
        if (req.query.roleid) {
            whereStr.push({
                Committee_RoleID: req.query.roleid
            })
        }
        if (req.query.statusid) {
            whereStr.push({
                Committee_RequestStatusID: req.query.statusid
            })
        }
        const data = await db.project_committee.findAll({
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
        const data = await db.project_committee.findAll({
            where: [{
                Committee_ID: req.params.id
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
    await db.project_committee.create(req.body)
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
    await db.project_committee.update(req.body, {
            where: {
                Committee_ID: req.params.id
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
    await db.project_committee.destroy({
            where: [{
                Committee_ID: req.params.id
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