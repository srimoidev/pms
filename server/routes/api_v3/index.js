const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API V3");
});
router.use("/form", require("./form"))
router.use("/document", require("./document"))
router.use("/meeting", require("./meeting"))
router.use("/notification", require("./notification"))
router.use("/project", require("./project"))
router.use("/section", require("./section"))
router.use("/user", require("./user"))
module.exports = router;