const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API V2");
});

router.use("/deadline", require("./deadline"));
router.use("/document", require("./document"));
router.use("/form_comment", require("./form_comment"));
router.use("/form_prerequisite", require("./form_prerequisite"));

router.use("/form_status", require("./form_status"));
router.use("/form_sent", require("./form_sent"));
router.use("/form_type", require("./form_type"));
router.use("/meeting", require("./meeting"));
router.use("/meeting_note", require("./meeting_note"));
router.use("/meeting_type", require("./meeting_type"));
router.use("/notification", require("./notification"));
router.use("/notification_status", require("./notification_status"));
router.use("/project_advisor", require("./project_advisor"));
router.use("/project_committee", require("./project_committee"));
router.use("/project_committee_role", require("./project_committee_role"));
router.use("/project_info/", require("./project_info"));
router.use("/project_member/", require("./project_member"));
router.use("/project_progress/", require("./project_progress"));
router.use("/project_status/", require("./project_status"));
router.use("/project_type/", require("./project_type"));
// router.use("/section/", require("./section"));
router.use("/user/", require("./user"));
router.use("/user_profile/", require("./user_profile"));
router.use("/user_type/", require("./user_type"));
// V2 Final
router.use("/project", require("./project"));
router.use("/form", require("./form"))
router.use("/section", require("./section"))
router.use("/user",require("./user"))
router.use("/meeting", require("./meeting"))
module.exports = router;