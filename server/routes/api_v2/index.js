const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API V2");
});

module.exports = router;
