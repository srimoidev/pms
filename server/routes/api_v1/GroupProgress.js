var router = require("express").Router();
var database = require("../../database");
var { responseByStatus } = require("../../utilities/functions");

// GET ALL
router.get("/", (req, res) => {
  database.query(
    "SELECT * FROM group_progress AS GPG " +
      "LEFT JOIN group_project AS GP ON GPG.Progress_GroupID=GP.Project_ID ",
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else responseByStatus(res, err, 200, rows);
    }
  );
});

// GET BY CONDITION
router.post("/", (req, res) => {
  var reqBodyStr = req.body;
  var whereStr = "";
  Object.entries(reqBodyStr).forEach(([key, value], index) => {
    whereStr += `${key} = '${value}'`;
    if (Object.entries(reqBodyStr).length != index + 1) whereStr += ` AND `;
  });
  database.query(
    "SELECT * FROM group_progress AS GPG " +
      "LEFT JOIN group_project AS GP ON GPG.Progress_GroupID=GP.Project_ID " +
      `WHERE ${whereStr}`,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else {
        if (rows.length == 0) responseByStatus(res, err, 404, rows);
        else responseByStatus(res, err, 200, rows);
      }
    }
  );
});

// GET BY ID
router.get("/:id", (req, res) => {
  var reqParamStr = req.params;
  database.query(
    "SELECT * FROM group_progress AS GPG " +
      "LEFT JOIN group_project AS GP ON GPG.Progress_GroupID=GP.Project_ID " +
      "WHERE Progress_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else {
        if (rows.length == 0) responseByStatus(res, err, 404, rows);
        else responseByStatus(res, err, 200, rows);
      }
    }
  );
});

// CREATE
router.post("/create", (req, res) => {
  var reqBodyStr = req.body;
  database.query(
    "INSERT INTO group_progress SET ?",
    reqBodyStr,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else responseByStatus(res, err, 200, rows);
    }
  );
});

// UPDATE
router.put("/:id", (req, res) => {
  var reqParamStr = req.params;
  var reqBodyStr = req.body;
  database.query(
    "SELECT * FROM group_progress WHERE Progress_ID = ?",
    reqParamStr.id,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "UPDATE group_progress SET ? WHERE Progress_ID = ?",
          [reqBodyStr, reqParamStr.id],
          (err, rows) => {
            if (err) responseByStatus(res, err, 400, rows);
            else responseByStatus(res, err, 200, rows);
          }
        );
      }
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  var reqParamStr = req.params;
  database.query(
    "SELECT * FROM group_progress WHERE Progress_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "DELETE FROM group_progress WHERE Progress_ID = ?",
          reqParamStr.id,
          (err, rows) => {
            if (err) responseByStatus(res, err, 400, rows);
            else responseByStatus(res, err, 200, rows);
          }
        );
      }
    }
  );
});

module.exports = router;
