const router = require("express").Router();
const db = require("../../../models/");

router.get("/", async (req, res) => {
    try {
        var whereStr = []
        if (req.query.projectid) {
            whereStr.push({
                Meeting_ProjectID: req.query.projectid
            })
        }
        if (req.query.teacherid) {
            whereStr.push({
                Meeting_TeacherID: req.query.teacherid
            })
        }
        if (req.query.typeid) {
            whereStr.push({
                Meeting_TypeID: req.query.typeid
            })
        }
        const meeting = await db.meeting.findAll({
            include: [{
                    model: db.project_info,
                    as: "Meeting_Project"
                },
                {
                    model: db.meeting_type,
                    as: "Meeting_Type"
                },
                {
                    model: db.user_profile,
                    as: "Meeting_Teacher"
                }
            ],
            attributes: {
                exclude: ["Meeting_ProjectID", "Meeting_TypeID", "Meeting_TeacherID"],
            },
            where: whereStr
        });
        return res.json(meeting);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/:id/info", async (req, res) => {
    try {
        const meeting = await db.meeting.findAll({
            include: [{
                    model: db.project_info,
                    as: "Meeting_Project"
                },
                {
                    model: db.meeting_type,
                    as: "Meeting_Type"
                },
                {
                    model: db.user_profile,
                    as: "Meeting_Teacher"
                }
            ],
            attributes: {
                exclude: ["Meeting_ProjectID", "Meeting_TypeID", "Meeting_TeacherID"],
            },
            where: [{
                User_ID: req.params.id
            }]
        });
        return res.json(meeting);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

// Meeting Note
router.get("/:id/note", async (req, res) => {
    try {
        const meeting_note = await db.meeting_note.findAll({
            include: [{
                model: db.meeting,
                as: "MeetingNote_Meeting"
            }],
            attributes: {
                exclude: ["MeetingNote_MeetingID"],
            },
            where: [{
                MeetingNote_MeetingID: req.params.id
            }]
        });
        return res.json(meeting_note);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/note/", async (req, res) => {
    try {
        const meeting_note = await db.meeting_note.findAll({
            include: [{
                model: db.meeting,
                as: "MeetingNote_Meeting"
            }],
            attributes: {
                exclude: ["MeetingNote_MeetingID"],
            },
        });
        return res.json(meeting_note);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

router.get("/note/:id/info", async (req, res) => {
    try {
        const meeting_note = await db.meeting_note.findAll({
            include: [{
                model: db.meeting,
                as: "MeetingNote_Meeting"
            }],
            attributes: {
                exclude: ["MeetingNote_MeetingID"],
            },
            where: [{
                MeetingNote_ID: req.params.id
            }]
        });
        return res.json(meeting_note);
    } catch (error) {
        return res.status(500).json({
            msg: error
        });
    }
});

module.exports = router;