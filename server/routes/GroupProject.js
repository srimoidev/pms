var router = require("express").Router();
var database = require("../database");

// get group
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM GroupProject AS GP " +
        "JOIN GroupProjectType AS PT ON GP.Project_typeID=PT.ProjectType_ID " +
        "JOIN RequestStatus AS RS ON GP.Project_RequestStatusID=RS.RequestStatus_ID " +
        "JOIN GroupProjectStatus AS PS ON GP.Project_StatusID=PS.ProjectStatus_ID " +
        "JOIN Section AS S ON GP.Project_SectionID=S.Section_ID",
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
      "SELECT * FROM GroupProject AS GP " +
        "JOIN GroupProjectType AS PT ON GP.Project_typeID=PT.ProjectType_ID " +
        "JOIN RequestStatus AS RS ON GP.Project_RequestStatusID=RS.RequestStatus_ID " +
        "JOIN GroupProjectStatus AS PS ON GP.Project_StatusID=PS.ProjectStatus_ID " +
        "JOIN Section AS S ON GP.Project_SectionID=S.Section_ID " +
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

// get single group
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupProject AS GP " +
      "JOIN GroupProjectType AS PT ON GP.Project_typeID=PT.ProjectType_ID " +
      "JOIN RequestStatus AS RS ON GP.Project_RequestStatusID=RS.RequestStatus_ID " +
      "JOIN GroupProjectStatus AS PS ON GP.Project_StatusID=PS.ProjectStatus_ID " +
      "JOIN Section AS S ON GP.Project_SectionID=S.Section_ID " +
      "WHERE Project_ID = ?",
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

// add group
router.post("/", (req, res) => {
  const data = {
    Project_Name: req.body.Project_Name,
    Project_Detail: req.body.Project_Detail,
    Project_TypeID: req.body.Project_TypeID,
    Project_MemberNumber: req.body.Project_MemberNumber,
    Project_SectionID: req.body.Project_SectionID,
    Project_StatusID: 1,
    Project_RequestStatusID: 1,
  };
  database.query("INSERT INTO GroupProject SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update group
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupProject WHERE Project_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE GroupProject SET ? WHERE Project_ID = ?",
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

//  delete group
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM GroupProject WHERE Project_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM GroupProject WHERE Project_ID = ?",
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
