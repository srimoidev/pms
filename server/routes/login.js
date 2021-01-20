const dotenv = require("dotenv"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  router = require("express").Router();

dotenv.config();

router.post("/", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, data, msg) => {
    if (err) return next(err);
    if (data) {
      return res.json({
        msg: msg,
        token: jwt.sign(data, process.env.JWT_SECRET),
      });
    } else {
      return res.status(422).json(msg);
    }
  })(req, res, next);
});

module.exports = router;
