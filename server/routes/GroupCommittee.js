var router = require("express").Router();
var database = require("../database");

// get
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM GroupCommittee AS C " +
        "LEFT JOIN GroupProject AS P ON C.Committee_GroupID=P.Project_ID " +
        "LEFT JOIN UserTeacher AS T ON C.Committee_TeacherID=T.Teacher_ID " +
        "LEFT JOIN GroupCommitteeRole AS R ON C.Committee_RoleID=R.CommitteeRole_ID " +
        "LEFT JOIN RequestStatus AS S ON C.Committee_RequestStatusID=S.RequestStatus_ID",
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
      "SELECT * FROM GroupCommittee AS C " +
        "LEFT JOIN GroupProject AS P ON C.Committee_GroupID=P.Project_ID " +
        "LEFT JOIN UserTeacher AS T ON C.Committee_TeacherID=T.Teacher_ID " +
        "LEFT JOIN GroupCommitteeRole AS R ON C.Committee_RoleID=R.CommitteeRole_ID " +
        "LEFT JOIN RequestStatus AS S ON C.Committee_RequestStatusID=S.RequestStatus_ID " +
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

// get single
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupCommittee AS C " +
      "LEFT JOIN GroupProject AS P ON C.Committee_GroupID=P.Project_ID " +
      "LEFT JOIN UserTeacher AS T ON C.Committee_TeacherID=T.Teacher_ID " +
      "LEFT JOIN GroupCommitteeRole AS R ON C.Committee_RoleID=R.CommitteeRole_ID " +
      "LEFT JOIN RequestStatus AS S ON C.Committee_RequestStatusID=S.RequestStatus_ID WHERE Committee_ID = ?",
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

// add
router.post("/", (req, res) => {
  const data = {
    Committee_GroupID: req.body.Committee_GroupID,
    Committee_TeacherID: req.body.Committee_TeacherID,
    Committee_RoleID: req.body.Committee_RoleID,
    Committee_PresentScore: req.body.Committee_PresentScore,
    Committee_DocumentScore: req.body.Committee_DocumentScore,
    Committee_AdvisorScore: req.body.Committee_AdvisorScore,
    Committee_RequestStatusID: req.body.Committee_RequestStatusID,
  };
  database.query("INSERT INTO GroupCommittee SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupCommittee WHERE Committee_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE GroupCommittee SET ? WHERE Committee_ID = ?",
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

// delete
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupCommittee WHERE Committee_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM GroupCommittee WHERE Committee_ID = ?",
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
