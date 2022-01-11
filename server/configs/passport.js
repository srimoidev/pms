const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const db = require("../models");

dotenv.config();
const passport = require("passport"),
  passportJWT = require("passport-jwt"),
  ExtractJWT = passportJWT.ExtractJwt,
  JWTStrategy = passportJWT.Strategy,
  LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, cb) => {
      //this one is typically a DB call.
      const user = await db.user_profile.findOne({
        include: [{ model: db.user_type, as: "UserType" }],
        where: { Username: username }
      });
      var data, msg;
      bcrypt.compare(password, user?.Password || "", (err, res) => {
        if (err) {
          console.log(err)
          throw err;
        }
        if (res) {
          data = {
            UserID: user.UserID,
            UserTypeID: user.UserTypeID,
            UserTypeName: user.UserType.UserTypeNameEN
          };
          if (user.IsActive == 0) {
            msg = "ผู้ใช้นี้ถูกระงับกรุณาติดต่อผู้ดูแลระบบ!";
            data = null;
          } else {
            msg = "เข้าสู่ระบบสำเร็จ!";
          }
        } else {
          data = null;
          msg = "<strong>ชื่อผู้ใช้</strong> หรือ <strong>รหัสผ่าน</strong> ไม่ถูกต้อง!";
        }
        return cb(null, data, msg);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (jwtPayload, cb) => {
      try {
        // find the user in db if needed
        return cb(null, true);
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);
