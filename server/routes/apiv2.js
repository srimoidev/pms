const router = require("express").Router();
const home = require("./api/v2/home");

router.get("/", (req, res) => {
  res.send("api page");
});

router.use("/v2/", home);

module.exports = router;
