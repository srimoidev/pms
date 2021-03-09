"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ALLTABLE
db.deadline = require("./deadline")(sequelize, Sequelize);
db.document = require("./document")(sequelize, Sequelize);
db.form_comment = require("./form_comment")(sequelize, Sequelize);
db.form_prerequisite = require("./form_prerequisite")(sequelize, Sequelize);
db.form_sent = require("./form_sent")(sequelize, Sequelize);
db.form_status = require("./form_status")(sequelize, Sequelize);
db.form_type = require("./form_type")(sequelize, Sequelize);
db.meeting = require("./meeting")(sequelize, Sequelize);
db.meeting_note = require("./meeting_note")(sequelize, Sequelize);
db.meeting_type = require("./meeting_type")(sequelize, Sequelize);
db.notification = require("./notification")(sequelize, Sequelize);
db.notification_status = require("./notification_status")(sequelize, Sequelize);
db.project_advisor = require("./project_advisor")(sequelize, Sequelize);
db.project_committee = require("./project_committee")(sequelize, Sequelize);
db.project_committee_role = require("./project_committee_role")(sequelize, Sequelize);
db.project_info = require("./project_info")(sequelize, Sequelize);
db.project_member = require("./project_member")(sequelize, Sequelize);
db.project_progress = require("./project_progress")(sequelize, Sequelize);
db.project_status = require("./project_status")(sequelize, Sequelize);
db.project_type = require("./project_type")(sequelize, Sequelize);
db.section = require("./section")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.user_profile = require("./user_profile")(sequelize, Sequelize);
db.user_type = require("./user_type")(sequelize, Sequelize);

// ALLRELATIONSHIP

// ProjectMember
db.project_info.belongsToMany(db.user_profile, {
    through: db.project_member,
    as: "Project_Members",
    foreignKey: "Member_ProjectID"
});

db.user_profile.belongsToMany(db.project_info, {
    through: db.project_member,
    foreignKey: "Member_UserID"
});

//ProjectType
db.project_info.belongsTo(db.project_type, {
    as: "Project_Type",
    foreignKey: "Project_TypeID"
});

//ProjectSection
db.project_info.belongsTo(db.section, {
    as: "Project_Section",
    foreignKey: "Project_SectionID"
});

//ProjectStatus
db.project_info.belongsTo(db.project_status, {
    as: "Project_Status",
    foreignKey: "Project_StatusID"
});

// FormComments
db.form_sent.hasMany(db.form_comment, {
    as: "Form_Comments",
    foreignKey: "Comment_FormID"
});
db.form_comment.belongsTo(db.form_sent, {
    as: "Form_Comments",
    foreignKey: "Comment_FormID"
});

//ProjectAdvisor
db.project_info.belongsToMany(db.user_profile, {
    through: db.project_advisor,
    as: "Project_Advisors",
    foreignKey: "Advisor_ProjectID",
});

db.user_profile.belongsToMany(db.project_info, {
    through: db.project_advisor,
    foreignKey: "Advisor_UserID"
});

//ProjectCommittee
db.project_info.belongsToMany(db.user_profile, {
    through: db.project_committee,
    as: "Project_Committee",
    foreignKey: "Committee_ProjectID"
});

db.user_profile.belongsToMany(db.project_info, {
    through: db.project_committee,
    foreignKey: "Committee_UserID"
});

db.project_member.belongsTo(db.user_profile, {
    as: "Member_Info",
    foreignKey: "Member_UserID"
});
db.project_advisor.belongsTo(db.user_profile, {
    as: "Advisor_Info",
    foreignKey: "Advisor_UserID"
});
db.project_committee.belongsTo(db.user_profile, {
    as: "Committee_Info",
    foreignKey: "Committee_UserID"
});
db.project_committee.belongsTo(db.project_committee_role, {
    as: "Committee_Role",
    foreignKey: "Committee_RoleID"
});
db.form_sent.belongsTo(db.project_info, {
    as: "Project_Info",
    foreignKey: "Form_ProjectID"
})
db.form_sent.belongsTo(db.form_type, {
    as: "Form_Type",
    foreignKey: "Form_TypeID"
})
db.form_sent.belongsTo(db.form_status, {
    as: "Form_Status",
    foreignKey: "Form_StatusID"
})
module.exports = db;
db.form_comment.belongsTo(db.user_profile, {
    as: "User_Info",
    foreignKey: "Comment_UserID"
})
db.form_comment.belongsTo(db.form_sent, {
    as: "Form_Info",
    foreignKey: "Comment_FormID"
})
db.meeting.belongsTo(db.project_info, {
    as: "Meeting_Project",
    foreignKey: "Meeting_ProjectID"
})
db.meeting.belongsTo(db.meeting_type, {
    as: "Meeting_Type",
    foreignKey: "Meeting_TypeID"
})
db.meeting.belongsTo(db.user_profile, {
    as: "Meeting_Teacher",
    foreignKey: "Meeting_TeacherID"
})
db.meeting_note.belongsTo(db.meeting, {
    as: "MeetingNote_Meeting",
    foreignKey: "MeetingNote_MeetingID"
})
// FormComments