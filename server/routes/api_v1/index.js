const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API V1");
});
router.use("/Deadline/", require("./Deadline"));
router.use("/Document/", require("./Document"));
router.use("/Form/", require("./Form"));
router.use("/FormComment/", require("./FormComment"));
router.use("/FormPrerequisite/", require("./FormPrerequisite"));
router.use("/FormStatus/", require("./FormStatus"));
router.use("/FormType/", require("./FormType"));
router.use("/GroupAdvisor/", require("./GroupAdvisor"));
router.use("/GroupCommittee/", require("./GroupCommittee"));
router.use("/GroupCommitteeRole/", require("./GroupCommitteeRole"));
router.use("/GroupProgress/", require("./GroupProgress"));
router.use("/GroupProject/", require("./GroupProject"));
router.use("/GroupProjectStatus/", require("./GroupProjectStatus"));
router.use("/GroupProjectType/", require("./GroupProjectType"));
router.use("/Meeting/", require("./Meeting"));
router.use("/MeetingNote/", require("./MeetingNote"));
router.use("/MeetingType/", require("./MeetingType"));
router.use("/NotificationStudent/", require("./NotificationStudent"));
router.use("/NotificationTeacher/", require("./NotificationTeacher"));
router.use("/RequestStatus/", require("./RequestStatus"));
router.use("/Section/", require("./Section"));
router.use("/UserAdmin/", require("./UserAdmin"));
router.use("/UserStudent/", require("./UserStudent"));
router.use("/UserTeacher/", require("./UserTeacher"));

module.exports = router;
