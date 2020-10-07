var router = require("express").Router();
var database = require("../database");

// get student
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "LEFT JOIN GroupProject AS GP ON S.Student_GroupID=GP.Project_ID",
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
      "LEFT JOIN GroupProject AS GP ON S.Student_GroupID=GP.Project_ID " +
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

// get single student
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM UserStudent AS S " +
      "LEFT JOIN GroupProject AS GP ON S.Student_GroupID=GP.Project_ID " +
      "WHERE Student_ID = ?",
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

// add student
router.post("/", (req, res) => {
  const data = {
    Student_Username: req.body.Student_Username,
    Student_Password: req.body.Student_Password,
    Student_StudentID: req.body.Student_StudentID,
    Student_Firstname: req.body.Student_Firstname,
    Student_Lastname: req.body.Student_Lastname,
    Student_Email: req.body.Student_Email,
    Student_TelephoneNumber: req.body.Student_TelephoneNumber,
    Student_AcademicYear: req.body.Student_AcademicYear,
    Student_GroupID: -1,
  };
  database.query("INSERT INTO UserStudent SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else
      res
        .status(200)
        .send({ success: true, data: "Created successfully" });
  });
});

// update student
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM UserStudent WHERE Student_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE UserStudent SET ? WHERE Student_ID = ?",
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

// delete student
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM UserStudent WHERE Student_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM UserStudent WHERE Student_ID = ?",
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
