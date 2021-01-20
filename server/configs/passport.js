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
      passwordField: "password",
    },
    (username, password, cb) => {
      //this one is typically a DB call.
      database.query(
        `SELECT * FROM user_student WHERE Student_Username = "${username}" AND Student_Password = "${password}"`,
        (err, rows) => {
          var data, msg;
          if (rows.length > 0) {
            data = {
              Student_ID: rows[0].Student_ID,
              Student_Name:
                rows[0].Student_Firstname + " " + rows[0].Student_Lastname,
            };
            msg = "Logged In Successfully!";
          } else {
            msg = "Incorrect Username or Password!";
          }
          return cb(null, data, msg);
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
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
