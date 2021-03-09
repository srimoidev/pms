const router = require("express").Router();
router.use("/deadline", require("./deadline"))
router.use("/comment", require("./comment"))
router.use("/prerequisite", require("./prerequisite"))
router.use("/sent", require("./sent"))
router.use("/status", require("./status"))
router.use("/type", require("./type"))

router.get("/", (req, res) => {
    res.send("Form V3");
});

module.exports = router;