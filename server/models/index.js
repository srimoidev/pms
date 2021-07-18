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
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ALLTABLE
db.app_menus = require("./app_menus")(sequelize, Sequelize);
db.app_privileges = require("./app_privileges")(sequelize, Sequelize);
db.deadline = require("./deadline")(sequelize, Sequelize);
db.document = require("./document")(sequelize, Sequelize);
db.form_comment = require("./form_comment")(sequelize, Sequelize);
db.form_prerequisite = require("./form_prerequisite")(sequelize, Sequelize);
db.form_sent = require("./form_sent")(sequelize, Sequelize);
db.form_status = require("./form_status")(sequelize, Sequelize);
db.form_type = require("./form_type")(sequelize, Sequelize);
db.meeting = require("./meeting")(sequelize, Sequelize);
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

//#region App
db.app_privileges.belongsTo(db.app_menus, {
  foreignKey: "MenuID"
});

//#endregion

//#region Project
db.project_info.belongsToMany(db.user_profile, {
  through: db.project_member,
  as: "Project_Members",
  foreignKey: "ProjectID"
});

db.user_profile.belongsToMany(db.project_info, {
  through: db.project_member,
  foreignKey: "UserID"
});
db.project_info.belongsTo(db.user_profile, {
  as: "UpdatedUser",
  foreignKey: "UpdatedBy"
});

db.project_member.belongsTo(db.project_info, {
  foreignKey: "ProjectID",
  as: "Project_Info"
});
//ProjectType
db.project_info.belongsTo(db.project_type, {
  as: "Project_Type",
  foreignKey: "ProjectTypeID"
});

//ProjectSection
db.project_info.belongsTo(db.section, {
  as: "Project_Section",
  foreignKey: "SectionID"
});
db.section.belongsTo(db.user_profile, {
  as: "Section_Instructor",
  foreignKey: "Instructor"
});

//ProjectStatus
db.project_info.belongsTo(db.project_status, {
  as: "Project_Status",
  foreignKey: "ProjectStatusID"
});

//ProjectAdvisor
db.project_info.belongsToMany(db.user_profile, {
  through: db.project_advisor,
  as: "Project_Advisors",
  foreignKey: "ProjectID"
});

db.user_profile.belongsToMany(db.project_info, {
  through: db.project_advisor,
  foreignKey: "UserID"
});

db.project_advisor.belongsTo(db.project_info, {
  as: "Project",
  foreignKey: "ProjectID"
});
//ProjectCommittee
db.project_info.belongsToMany(db.user_profile, {
  through: db.project_committee,
  as: "Project_Committees",
  foreignKey: "ProjectID"
});
//ProjectProgress
db.project_info.hasMany(db.project_progress, {
  foreignKey: "Progress_ProjectID",
  as: "Project_Progresses"
});
db.user_profile.belongsToMany(db.project_info, {
  through: db.project_committee,
  foreignKey: "UserID"
});

db.project_member.belongsTo(db.user_profile, {
  as: "Member_Info",
  foreignKey: "UserID"
});
db.project_advisor.belongsTo(db.user_profile, {
  as: "Advisor_Info",
  foreignKey: "UserID"
});
db.project_committee.belongsTo(db.user_profile, {
  as: "Committee_Info",
  foreignKey: "UserID"
});
db.project_committee.belongsTo(db.project_committee_role, {
  as: "Committee_Role",
  foreignKey: "CommitteeRoleID"
});

//#endregion

//#region Form
db.form_sent.belongsTo(db.project_info, {
  as: "Project_Info",
  foreignKey: "ProjectID"
});
db.form_sent.belongsTo(db.form_status, {
  as: "Form_Status",
  foreignKey: "FormStatusID"
});
db.form_sent.belongsTo(db.project_advisor, {
  as: "Advisors",
  targetKey: "ProjectID",
  foreignKey: "ProjectID"
});
db.form_comment.belongsTo(db.user_profile, {
  as: "Comment_User",
  foreignKey: "CreatedBy"
});
db.form_comment.belongsTo(db.form_sent, {
  as: "Comment_Form",
  foreignKey: "FormID"
});

db.form_sent.hasMany(db.form_comment, {
  as: "Form_Comments",
  foreignKey: "FormID"
});
db.form_comment.belongsTo(db.form_sent, {
  as: "Form_Comments",
  foreignKey: "FormID"
});
db.form_sent.belongsTo(db.form_type, {
  as: "Form_Type",
  foreignKey: "FormTypeID"
});
db.form_prerequisite.belongsTo(db.form_type, {
  as: "FormType",
  foreignKey: "FormTypeID"
});
db.form_prerequisite.belongsTo(db.form_type, {
  as: "RequireForm",
  foreignKey: "FormReqTypeID"
});
db.form_type.belongsToMany(db.form_type, {
  through: db.form_prerequisite,
  as: "RequireForms",
  foreignKey: "FormTypeID"
});

db.form_type.belongsToMany(db.form_type, {
  as: "Forms",
  through: db.form_prerequisite,
  foreignKey: "FormReqTypeID"
});

db.form_sent.belongsTo(db.deadline, {
  as: "Deadline",
  targetKey: "FormTypeID",
  foreignKey: "FormTypeID"
});
db.deadline.belongsTo(db.form_type, {
  as: "FormType",
  foreignKey: "FormTypeID"
});
db.deadline.belongsTo(db.section, {
  as: "Section",
  foreignKey: "SectionID"
});
db.form_sent.belongsTo(db.project_info, {
  as: "Form_Project",
  foreignKey: "ProjectID"
});
db.form_sent.belongsTo(db.user_profile, {
  as: "UpdatedUser",
  foreignKey: "UpdatedBy"
});
//#endregion

//#region Meeting
db.meeting.belongsTo(db.project_info, {
  as: "Meeting_Project",
  foreignKey: "Meeting_ProjectID"
});
db.meeting.belongsTo(db.user_profile, {
  as: "Meeting_Teacher",
  foreignKey: "Meeting_TeacherID"
});
//#endregion

//#region Form Type
// db.form_type.belongsTo(db.deadline, {
//   as: "Deadlines",
//   targetKey: "FormTypeID",
//   foreignKey: "FormTypeID"
// });
// db.deadline.belongsTo(db.section, {
//   as: "Sections",
//   targetKey: "SectionID",
//   foreignKey: "SectionID"
// });
//#endregion

module.exports = db;
