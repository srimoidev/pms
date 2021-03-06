const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API V3");
});
router.use("/app_menus", require("./app"));
router.use("/form", require("./form"));
router.use("/document", require("./document"));
router.use("/meeting", require("./meeting"));
router.use("/notifications", require("./notification"));
router.use("/project", require("./project"));
router.use("/section", require("./section"));
router.use("/user", require("./user"));
router.use("/app_env",require("./environments"))
// router.use("/uploads", require("./uploads"));
module.exports = router;
