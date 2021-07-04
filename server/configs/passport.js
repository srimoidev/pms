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
      const sqlStr = `SELECT * FROM user_profile ` + `WHERE Username = "${username}" AND Password = "${password}"`;
      database.query(sqlStr, (err, rows) => {
        var data, msg;
        if (rows.length > 0) {
          data = {
            UserID: rows[0].UserID,
            UserTypeID: rows[0].UserTypeID
          };
          msg = "Logged In Successfully!";
        } else {
          msg = "Incorrect Username or Password!";
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
