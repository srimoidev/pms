const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("default api v2 page");
});

module.exports = router;
