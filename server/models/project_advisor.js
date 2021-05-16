module.exports = (sequelize, Sequelize) => {
  const project_advisor = sequelize.define(
    "project_advisor",
    {
      Advisor_ID: {
        type: Sequelize.INTEGER,
        field: "Advisor_ID",
        primaryKey: true,
        autoIncrement: true
      },
      Advisor_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Advisor_ProjectID",
      },
      Advisor_UserID: {
        type: Sequelize.INTEGER,
        field: "Advisor_UserID",
      },
      Advisor_RequestStatus: {
        type: Sequelize.BOOLEAN,
        field: "Advisor_RequestStatus",
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
