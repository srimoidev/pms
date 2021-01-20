var router = require("express").Router();
var database = require("../../database");
var { responseByStatus } = require("../../utilities/functions");

// GET ALL
router.get("/", (req, res) => {
  database.query(
    "SELECT * FROM form AS F " +
      "LEFT JOIN group_project AS GP ON F.Form_GroupID = GP.Project_ID " +
      "LEFT JOIN form_type AS FT ON F.Form_TypeID = FT.FormType_ID " +
      "LEFT JOIN form_status AS FS ON F.Form_StatusID = FS.FormStatus_ID ",
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
    "SELECT * FROM form AS F " +
      "LEFT JOIN group_project AS GP ON F.Form_GroupID = GP.Project_ID " +
      "LEFT JOIN form_type AS FT ON F.Form_TypeID = FT.FormType_ID " +
      "LEFT JOIN form_status AS FS ON F.Form_StatusID = FS.FormStatus_ID " +
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
    "SELECT * FROM form AS F " +
      "LEFT JOIN group_project AS GP ON F.Form_GroupID = GP.Project_ID " +
      "LEFT JOIN form_type AS FT ON F.Form_TypeID = FT.FormType_ID " +
      "LEFT JOIN form_status AS FS ON F.Form_StatusID = FS.FormStatus_ID " +
      "WHERE Form_ID = ?",
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
  database.query("INSERT INTO form SET ?", reqBodyStr, (err, rows) => {
    if (err) responseByStatus(res, err, 400, rows);
    else responseByStatus(res, err, 200, rows);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  var reqParamStr = req.params;
  var reqBodyStr = req.body;
  database.query(
    "SELECT * FROM form WHERE Form_ID = ?",
    reqParamStr.id,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "UPDATE form SET ? WHERE Form_ID = ?",
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
    "SELECT * FROM form WHERE Form_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "DELETE FROM form WHERE Form_ID = ?",
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

// GET LAST FORM PER FORM TYPE
router.get("/group/:groupid/latest", (req, res) => {
  var reqParamStr = req.params;
  database.query(
    "SELECT * FROM `form` AS F1 WHERE Form_ID = (SELECT MAX(Form_ID) from `form` AS F2 WHERE F2.Form_TypeID = F1.Form_TypeID) AND `Form_GroupID` = ? ORDER BY `F1`.`Form_TypeID` ASC",
    [reqParamStr.groupid],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else {
        if (rows.length == 0) responseByStatus(res, err, 404, rows);
        else responseByStatus(res, err, 200, rows);
      }
    }
  );
});

module.exports = router;
