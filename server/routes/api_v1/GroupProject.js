var router = require("express").Router();
var database = require("../../database");
var { responseByStatus } = require("../../utilities/functions");

// GET ALL
router.get("/", (req, res) => {
  database.query(
    "SELECT * FROM group_project AS GP " +
      "LEFT JOIN group_project_type AS GPT ON GP.Project_TypeID=GPT.ProjectType_ID " +
      "LEFT JOIN group_project_status AS GPS ON GP.Project_StatusID=GPS.ProjectStatus_ID " +
      "LEFT JOIN section AS S ON GP.Project_SectionID=S.Section_ID " +
      "LEFT JOIN user_teacher AS UT ON GP.Project_TeacherID=UT.Teacher_ID ",
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
    "SELECT * FROM group_project AS GP " +
      "LEFT JOIN group_project_type AS GPT ON GP.Project_TypeID=GPT.ProjectType_ID " +
      "LEFT JOIN group_project_status AS GPS ON GP.Project_StatusID=GPS.ProjectStatus_ID " +
      "LEFT JOIN section AS S ON GP.Project_SectionID=S.Section_ID " +
      "LEFT JOIN request_status AS RS ON GP.Project_RequestStatusID=RS.RequestStatus_ID " +
      "LEFT JOIN user_teacher AS UT ON GP.Project_TeacherID=UT.Teacher_ID " +
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
    "SELECT * FROM group_project AS GP " +
      "LEFT JOIN group_project_type AS GPT ON GP.Project_TypeID=GPT.ProjectType_ID " +
      "LEFT JOIN group_project_status AS GPS ON GP.Project_StatusID=GPS.ProjectStatus_ID " +
      "LEFT JOIN section AS S ON GP.Project_SectionID=S.Section_ID " +
      "LEFT JOIN request_status AS RS ON GP.Project_RequestStatusID=RS.RequestStatus_ID " +
      "LEFT JOIN user_teacher AS UT ON GP.Project_TeacherID=UT.Teacher_ID " +
      "WHERE Project_ID = ?",
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
  database.query("INSERT INTO group_project SET ?", reqBodyStr, (err, rows) => {
    if (err) responseByStatus(res, err, 400, rows);
    else responseByStatus(res, err, 200, rows);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  var reqParamStr = req.params;
  var reqBodyStr = req.body;
  database.query(
    "SELECT * FROM group_project WHERE Project_ID = ?",
    reqParamStr.id,
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "UPDATE group_project SET ? WHERE Project_ID = ?",
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
    "SELECT * FROM group_project WHERE Project_ID = ?",
    [reqParamStr.id],
    (err, rows) => {
      if (err) responseByStatus(res, err, 400, rows);
      else if (rows.length == 0) responseByStatus(res, err, 404, rows);
      else {
        database.query(
          "DELETE FROM group_project WHERE Project_ID = ?",
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
