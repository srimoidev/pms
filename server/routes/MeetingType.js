var router = require("express").Router();
var database = require("../database");

// get
router.get("/", (req, res) => {
  var data = req.body;
  if (Object.entries(data).length == 0) {
    database.query("SELECT * FROM MeetingType", (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else res.status(200).send({ success: true, data: rows });
    });
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
      "SELECT * FROM MeetingType " + `WHERE ${condition}`,
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
    "SELECT * FROM MeetingType " + "WHERE MeetingType_ID = ?",
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
    MeetingType_Name: req.body.MeetingType_Name
  };
  database.query("INSERT INTO MeetingType SET ?", data, (err) => {
    if (err) res.status(400).send({ success: false, data: err.sqlMessage });
    else res.status(200).send({ success: true, data: "Created successfully" });
  });
});

// update
router.put("/:id", (req, res) => {
  database.query(
    "SELECT * FROM MeetingType WHERE MeetingType_ID = ?",
    req.params.id,
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "UPDATE MeetingType SET ? WHERE MeetingType_ID = ?",
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
    "SELECT * FROM MeetingType WHERE MeetingType_ID = ?",
    [req.params.id],
    (err, rows) => {
      if (err) res.status(400).send({ success: false, data: err.sqlMessage });
      else if (rows.length == 0)
        res.status(404).send({ success: false, data: "404 Not found" });
      else {
        database.query(
          "DELETE FROM MeetingType WHERE MeetingType_ID = ?",
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
