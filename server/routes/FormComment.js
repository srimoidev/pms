var router = require("express").Router();
var database = require("../database");

// get Comment
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM FormComment AS FC " +
        "LEFT JOIN Form AS F ON FC.Comment_FormID=F.Form_ID " +
        "LEFT JOIN UserTeacher AS T ON FC.Comment_TeacherID=T.Teacher_ID ",
      (err, rows) => {
        if (err) res.status(400).send({ success: false, data: err.sqlMessage });
        else res.status(200).send({ success: true, data: rows });
      }
    );
  } else {
    var condition = "";
    Object.entries(data).forEach(([key, value], index) => {
      if (Object.entries(data).length != index + 1) {
        condition += `${key} = '${value}' AND `;
      } else {
        condition += `${key} = '${value}'`;
      }
    });
    database.query(
      "SELECT * FROM FormComment AS FC " +
        "LEFT JOIN Form AS F ON FC.Comment_FormID=F.Form_ID " +
        "LEFT JOIN UserTeacher AS T ON FC.Comment_TeacherID=T.Teacher_ID " +
        `WHERE ${condition}`,
      (err, rows) => {
        if (err) res.status(400).send({ success: false, data: err.sqlMessage });
        else {
          if (rows.length == 0)
            res.status(404).send({ success: false, data: "404 Not found" });
          else res.status(200).send({ success: true, data: rows });
        }
      }
    );
  }
});

// get single Comment
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM FormComment AS FC " +
      "LEFT JOIN Form AS F ON FC.Comment_FormID=F.Form_ID " +
      "LEFT JOIN UserTeacher AS T ON FC.Comment_TeacherID=T.Teacher_ID " +
      "WHERE Comment_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else {
        if (rows.length == 0)
          res.status(404).send({ success: false, data: "404 Not found" });
        else res.status(200).send({ success: true, data: rows[0] });
      }
    }
  );
});

// add Comment
router.post("/", (req, res) => {
  const data = {
    Comment_Text: req.body.Comment_Text,
    Comment_FormID: req.body.Comment_FormID,
    Comment_DateTime: req.body.Comment_DateTime,
    Comment_TeacherID: req.body.Comment_TeacherID,
  };
  database.query("INSERT INTO FormComment SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update Comment
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM FormComment WHERE Comment_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE FormComment SET ? WHERE Comment_ID = ?",
          [req.body, req.params.id],
          (err) => {
            if (err)
              res.status(400).send({ success: false, data: err.sqlMessage });
            else
              res.status(200).send({
                success: true,
                data: "Updated successfully",
              });
          }
        );
      }
    }
  );
});

// delete Comment
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM FormComment WHERE Comment_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM FormComment WHERE Comment_ID = ?",
          req.params.id,
          (err) => {
            if (err)
              res.status(400).send({ success: false, data: err.sqlMessage });
            else
              res.status(200).send({
                success: true,
                data: "Deleted successfully",
              });
          }
        );
      }
    }
  );
});

module.exports = router;
