var router = require("express").Router();
var database = require("../database");

// get all deadline
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query(
      "SELECT * FROM Deadline AS D " +
        "LEFT JOIN Section AS S ON D.Deadline_SectionID=S.Section_ID LEFT " +
        "LEFT JOIN FormType AS FT ON D.Deadline_FormTypeID=FT.FormType_ID",
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
      "SELECT * FROM Deadline AS D " +
        "LEFT JOIN Section AS S ON D.Deadline_SectionID=S.Section_ID LEFT " +
        "LEFT JOIN FormType AS FT ON D.Deadline_FormTypeID=FT.FormType_ID" +
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

// get single deadline
router.get("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Deadline AS D " +
      "LEFT JOIN Section AS S ON D.Deadline_SectionID=S.Section_ID LEFT " +
      "LEFT JOIN FormType AS FT ON D.Deadline_FormTypeID=FT.FormType_ID" +
      "WHERE Deadline_ID = ?",
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

// add deadline
router.post("/", (req, res) => {
  const data = {
    Deadline_SectionID: req.body.Deadline_SectionID,
    Deadline_FormTypeID: req.body.Deadline_FormTypeID,
    Deadline_DateTime: req.body.Deadline_DateTime,
  };
  database.query("INSERT INTO Deadline SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else
      res.status(200).send({
        success: true,
        data: "Created successfully",
      });
  });
});

// update deadline
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Deadline WHERE Deadline_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE Deadline SET ? WHERE Deadline_ID = ?",
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

// delete deadline
router.delete("/:id", (req, res) => {
  database.query(
    "SELECT * FROM Deadline WHERE Deadline_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM Deadline WHERE Deadline_ID = ?",
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
