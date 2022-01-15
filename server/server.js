require("./configs/passport");
const passport = require("passport");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const uuid = require("uuid").v4;
const path = require("path");
const PORT = 3333;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
var forms_storage = multer.diskStorage({
  destination: "./uploads/forms",
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const originalname = `${uuid()}${ext}`;
    cb(null, originalname);
  }
});

var img_storage = multer.diskStorage({
  destination: "./uploads/profile_images",
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const originalname = `${uuid()}${ext}`;
    cb(null, originalname);
  }
});

var example_files_storage = multer.diskStorage({
  destination: "./uploads/example_files",
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const originalname = `${uuid()}${ext}`;
    cb(null, originalname);
  }
});
app.use(
  "/v3/form/sent",
  multer({
    storage: forms_storage
  }).any()
);
app.use(
  "/v3/user",
  multer({
    storage: img_storage
  }).any()
);
app.use(
  "/v3/project/example_files",
  multer({
    storage: example_files_storage
  }).any()
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// app.use(
//   "/api/v1/",
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   require("./routes/api_v1")
// );
// app.use(
//   "/api/v2/",
//   // passport.authenticate("jwt", { session: false }),
//   require("./routes/api_v2")
// );
app.use((req, res, next) => {
  req.io = io;
  return next();
});
app.use(
  "/v3",
  passport.authenticate("jwt", { session: false }),
  require("./routes/api_v3")
);
app.use("/login", require("./routes/login"));

io.on("connect", socket => {
  socket.on("create", function(id) {
    socket.join(`room_${id}`);
  });
});

server.listen(PORT);

// app.listen(PORT, () => {
//   console.log(`server is listening on port ${PORT} | http://localhost:${PORT}`);
// });
