module.exports = (sequelize, Sequelize) => {
  const meeting = sequelize.define(
    "meeting",
    {
      Meeting_ID: {
        type: Sequelize.INTEGER,
        field: "Meeting_ID",
        primaryKey: true,
      },
      Meeting_Name: {
        type: Sequelize.STRING,
        field: "Meeting_Name",
      },
      Meeting_Detail: {
        type: Sequelize.TEXT,
        field: "Meeting_Detail",
      },
      Meeting_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Meeting_ProjectID",
      },
      Meeting_TeacherID: {
        type: Sequelize.INTEGER,
        field: "Meeting_TeacherID",
      },
      Meeting_DateTime: {
        type: Sequelize.DATE,
        field: "Meeting_DateTime",
      },
      Meeting_RequestStatusID: {
        type: Sequelize.STRING,
        field: "Meeting_RequestStatusID",
      },
      Meeting_TypeID: {
        type: Sequelize.INTEGER,
        field: "Meeting_TypeID",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return meeting;
};
