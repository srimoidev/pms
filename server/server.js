require("./configs/passport");
const passport = require("passport");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(
  "/api/v1/",
  passport.authenticate("jwt", {
    session: false
  }),
  require("./routes/api_v1")
);
app.use(
  "/api/v2/",
  // passport.authenticate("jwt", { session: false }),
  require("./routes/api_v2")
);
app.use("/api/v3", require("./routes/api_v3"))
app.use("/login", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} | http://localhost:${PORT}`);
});