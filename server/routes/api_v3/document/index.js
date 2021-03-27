const router = require("express").Router();
const db = require("../../../models")

// read
router.get("/", async (req, res) => {
    await db.document.findAll()
        .then(data => res.json(data))
        .catch(err => res.status(500).json({
            message: err.message || "Some error occurred while retrieving!"
        }))
});

router.get("/:id", async (req, res) => {
    await db.document.findAll({
            where: [{
                Document_ID: req.params.id
            }]
        })
        .then(data => res.json(data))
        .catch(err => res.status(500).json({
            message: err.message || "Some error occurred while retrieving!"
        }))

});

// create
router.post("/", async (req, res) => {
    await db.document.create({
            Document_Name: req.body.Document_Name,
            Document_FileName: req.body.Document_FileName,
            Document_DateTime: req.body.Document_DateTime
        })
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
    await db.document.update(req.body, {
            where: {
                Document_ID: req.params.id
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
    await db.document.destroy({
            where: [{
                Document_ID: req.params.id
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