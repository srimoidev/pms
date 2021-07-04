module.exports = (sequelize, Sequelize) => {
  const meeting = sequelize.define(
    "meeting",
    {
      Meeting_ID: {
        type: Sequelize.INTEGER,
        field: "Meeting_ID",
        primaryKey: true
      },
      Meeting_Name: {
        type: Sequelize.STRING,
        field: "Meeting_Name"
      },
      Meeting_Detail: {
        type: Sequelize.TEXT,
        field: "Meeting_Detail"
      },
      Meeting_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Meeting_ProjectID"
      },
      Meeting_TeacherID: {
        type: Sequelize.INTEGER,
        field: "Meeting_TeacherID"
      },
      Meeting_DateTime: {
        type: Sequelize.DATE,
        field: "Meeting_DateTime"
      },
      Meeting_RequestStatusID: {
        type: Sequelize.STRING,
        field: "Meeting_RequestStatusID"
      },
      Meeting_TypeID: {
        type: Sequelize.STRING,
        field: "Meeting_TypeID"
      },
      Meeting_Note: {
        type: Sequelize.TEXT,
        field: "Meeting_Note"
      },
      Meeting_IsActive: {
        type: Sequelize.BOOLEAN,
        field: "Meeting_IsActive"
      },
      Meeting_CreatedBy: {
        type: Sequelize.INTEGER,
        field: "Meeting_CreatedBy"
      },
      Meeting_CreatedTime: {
        type: Sequelize.DATE,
        field: "Meeting_CreatedTime"
      },
      Meeting_UpdatedBy: {
        type: Sequelize.INTEGER,
        field: "Meeting_UpdatedBy"
      },
      Meeting_UpdatedTime: {
        type: Sequelize.DATE,
        field: "Meeting_UpdatedTime"
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return meeting;
};
