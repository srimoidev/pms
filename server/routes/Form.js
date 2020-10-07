var router = require("express").Router();
var database = require("../database");

// get Form
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM Form AS F " +
        "LEFT JOIN GroupProject AS G ON F.Form_GroupID=G.Project_ID " +
        "LEFT JOIN FormType AS T ON F.Form_TypeID=T.FormType_ID " +
        "LEFT JOIN Section AS S ON F.Form_SectionID=S.Section_ID " +
        "LEFT JOIN FormStatus AS FS ON F.Form_StatusID=FS.FormStatus_ID",
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
      "SELECT * FROM Form AS F " +
        "LEFT JOIN GroupProject AS G ON F.Form_GroupID=G.Project_ID " +
        "LEFT JOIN FormType AS T ON F.Form_TypeID=T.FormType_ID " +
        "LEFT JOIN Section AS S ON F.Form_SectionID=S.Section_ID " +
        "LEFT JOIN FormStatus AS FS ON F.Form_StatusID=FS.FormStatus_ID " +
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

// get single Form
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Form AS F " +
      "LEFT JOIN GroupProject AS G ON F.Form_GroupID=G.Project_ID " +
      "LEFT JOIN FormType AS T ON F.Form_TypeID=T.FormType_ID " +
      "LEFT JOIN Section AS S ON F.Form_SectionID=S.Section_ID " +
      "LEFT JOIN FormStatus AS FS ON F.Form_StatusID=FS.FormStatus_ID " +
      "WHERE Form_ID = ?",
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

// add Form
router.post("/", (req, res) => {
  const data = {
    Form_GroupID: req.body.Form_GroupID,
    Form_FileName: req.body.Form_FileName,
    Form_TypeID: req.body.Form_TypeID,
    Form_SectionID: req.body.Form_SectionID,
    Form_DateTime: req.body.Form_DateTime,
    Form_StatusID: req.body.Form_StatusID,
  };
  database.query("INSERT INTO Form SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update Form
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Form WHERE Form_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE Form SET ? WHERE Form_ID = ?",
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

// delete Form
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Form WHERE Form_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM Form WHERE Form_ID = ?",
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
