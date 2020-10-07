var router = require("express").Router();
var database = require("../database");

// get
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM Meeting AS M " +
        "LEFT JOIN GroupProject AS P ON M.Meeting_GroupID=P.Project_ID " +
        "LEFT JOIN UserTeacher AS T ON M.Meeting_TeacherID=T.Teacher_ID " +
        "LEFT JOIN RequestStatus AS R ON M.Meeting_RequestStatusID=R.RequestStatus_ID " +
        "LEFT JOIN MeetingType AS MT ON M.Meeting_TypeID=MT.MeetingType_ID",
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
      "SELECT * FROM Meeting AS M " +
        "LEFT JOIN GroupProject AS P ON M.Meeting_GroupID=P.Project_ID " +
        "LEFT JOIN UserTeacher AS T ON M.Meeting_TeacherID=T.Teacher_ID " +
        "LEFT JOIN RequestStatus AS R ON M.Meeting_RequestStatusID=R.RequestStatus_ID " +
        "LEFT JOIN MeetingType AS MT ON M.Meeting_TypeID=MT.MeetingType_ID " +
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
    "SELECT * FROM Meeting AS M " +
      "LEFT JOIN GroupProject AS P ON M.Meeting_GroupID=P.Project_ID " +
      "LEFT JOIN UserTeacher AS T ON M.Meeting_TeacherID=T.Teacher_ID " +
      "LEFT JOIN RequestStatus AS R ON M.Meeting_RequestStatusID=R.RequestStatus_ID " +
      "LEFT JOIN MeetingType AS MT ON M.Meeting_TypeID=MT.MeetingType_ID " +
      "WHERE Meeting_ID = ?",
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
    Meeting_Name: req.body.Meeting_Name,
    Meeting_Detail: req.body.Meeting_Detail,
    Meeting_GroupID: req.body.Meeting_GroupID,
    Meeting_TeacherID: req.body.Meeting_TeacherID,
    Meeting_DateTime: req.body.Meeting_DateTime,
    Meeting_RequestStatusID: req.body.Meeting_RequestStatusID,
    Meeting_TypeID: req.body.Meeting_TypeID,
  };
  database.query("INSERT INTO Meeting SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Meeting WHERE Meeting_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE Meeting SET ? WHERE Meeting_ID = ?",
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
    "SELECT * FROM Meeting WHERE Meeting_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM Meeting WHERE Meeting_ID = ?",
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
