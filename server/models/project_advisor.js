module.exports = (sequelize, Sequelize) => {
  const project_advisor = sequelize.define(
    "project_advisor",
    {
      Advisor_ID: {
        type: Sequelize.INTEGER,
        field: "Advisor_ID",
        primaryKey: true,
      },
      Advisor_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Advisor_ProjectID",
      },
      Advisor_UserID: {
        type: Sequelize.INTEGER,
        field: "Advisor_UserID",
      },
      Advisor_RequestStatusID: {
        type: Sequelize.INTEGER,
        field: "Advisor_RequestStatusID",
      },
      Advisor_UpdatedTime: {
        type: Sequelize.DATE,
        field: "Advisor_UpdatedTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_advisor;
};
