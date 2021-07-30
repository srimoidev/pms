const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport"),
  passportJWT = require("passport-jwt"),
  ExtractJWT = passportJWT.ExtractJwt,
  JWTStrategy = passportJWT.Strategy,
  LocalStrategy = require("passport-local").Strategy;

const database = require("../database/index");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, cb) => {
      //this one is typically a DB call.
      const sqlStr = `SELECT UserID,UserTypeID,IsActive FROM user_profile ` + `WHERE Username = "${username}" AND Password = "${password}"`;
      database.query(sqlStr, (err, rows) => {
        var data, msg;
        if (rows?.length > 0) {
          data = {
            UserID: rows[0].UserID,
            UserTypeID: rows[0].UserTypeID
          };
          console.log(rows[0]);
          if (rows[0].IsActive == 0) {
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
