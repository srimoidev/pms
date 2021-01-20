var router = require("express").Router();
var database = require("../../database");
var { responseByStatus } = require("../../utilities/functions");

// GET ALL
router.get("/", (req, res) => {
  database.query(
    "SELECT " +
      "FP.Pre_ID, " +
      "FT1.FormType_ID, " +
      "FT1.FormType_Name, " +
      "FT2.FormType_ID AS FormReqType_ID, " +
      "FT2.FormType_Name AS FormReqType_Name " +
      "FROM form_prerequisite AS FP " +
      "LEFT JOIN form_type AS FT1 ON FP.Pre_FormTypeID = FT1.FormType_ID " +
      "LEFT JOIN form_type AS FT2 ON FP.Pre_FormReqTypeID = FT2.FormType_ID ",
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
    "SELECT " +
      "FP.Pre_ID, " +
      "FT1.FormType_ID, " +
      "FT1.FormType_Name, " +
      "FT2.FormType_ID AS FormReqType_ID, " +
      "FT2.FormType_Name AS FormReqType_Name " +
      "FROM form_prerequisite AS FP " +
      "LEFT JOIN form_type AS FT1 ON FP.Pre_FormTypeID = FT1.FormType_ID " +
      "LEFT JOIN form_type AS FT2 ON FP.Pre_FormReqTypeID = FT2.FormType_ID " +
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
    "SELECT " +
      "FP.Pre_ID, " +
      "FT1.FormType_ID, " +
      "FT1.FormType_Name, " +
      "FT2.FormType_ID AS FormReqType_ID, " +
      "FT2.FormType_Name AS FormReqType_Name " +
      "FROM form_prerequisite AS FP " +
      "LEFT JOIN form_type AS FT1 ON FP.Pre_FormTypeID = FT1.FormType_ID " +
      "LEFT JOIN form_type AS FT2 ON FP.Pre_FormReqTypeID = FT2.FormType_ID " +
      "WHERE Pre_ID = ?",
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
    "INSERT INTO form_prerequisite SET ?",
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
    "SELECT " +
      "FP.Pre_ID, " +
      "FT1.FormType_ID, " +
      "FT1.FormType_Name, " +
      "FT2.FormType_ID AS FormReqType_ID, " +
      "FT2.FormType_Name AS FormReqType_Name " +
      "FROM form_prerequisite AS FP " +
      "LEFT JOIN form_type AS FT1 ON FP.Pre_FormTypeID = FT1.FormType_ID " +
      "LEFT JOIN form_type AS FT2 ON FP.Pre_FormReqTypeID = FT2.FormType_ID " +
      `WHERE Pre_ID = ?`,
    reqParamStr.id,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "UPDATE form_prerequisite SET ? WHERE Pre_ID = ?",
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
    "SELECT " +
      "FP.Pre_ID, " +
      "FT1.FormType_ID, " +
      "FT1.FormType_Name, " +
      "FT2.FormType_ID AS FormReqType_ID, " +
      "FT2.FormType_Name AS FormReqType_Name " +
      "FROM form_prerequisite AS FP " +
      "LEFT JOIN form_type AS FT1 ON FP.Pre_FormTypeID = FT1.FormType_ID " +
      "LEFT JOIN form_type AS FT2 ON FP.Pre_FormReqTypeID = FT2.FormType_ID " +
      `WHERE Pre_ID = ?`,
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "DELETE FROM form_prerequisite WHERE Pre_ID = ?",
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
