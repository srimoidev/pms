require("./configs/passport");
const passport = require("passport");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const uuid = require("uuid").v4;
const path = require("path");
const PORT = 3000;

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
  "/api/v3/form/sent",
  multer({
    storage: forms_storage
  }).any()
);
app.use(
  "/api/v3/user",
  multer({
    storage: img_storage
  }).any()
);
app.use(
  "/api/v3/project/example_files",
  multer({
    storage: example_files_storage
  }).any()
);
// app.use(
//   multer({
//     dest: __dirname + '/uploads/',
//     rename: function (fieldname, filename) {
//       return Date.now()
//     },
//     limits: {
//       fileSize: 100000
//     },
//     onFileSizeLimit: function (file) {
//       console.log('Failed: ' + file.originalname + ' is limited')
//       fs.unlink(file.path)
//     }
//   }).any()
// )
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
app.use(
  "/api/v3",
  // passport.authenticate("jwt", { session: false }),
  require("./routes/api_v3")
);
app.use("/login", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT} | http://localhost:${PORT}`);
});
