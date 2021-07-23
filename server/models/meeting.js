module.exports = (sequelize, Sequelize) => {
  const meeting = sequelize.define(
    "meeting",
    {
      MeetingID: {
        type: Sequelize.INTEGER,
        field: "MeetingID",
        primaryKey: true
      },
      Title: {
        type: Sequelize.STRING,
        field: "Title"
      },
      Detail: {
        type: Sequelize.TEXT,
        field: "Detail"
      },
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID"
      },
      TeacherID: {
        type: Sequelize.INTEGER,
        field: "TeacherID"
      },
      OnDate: {
        type: Sequelize.DATE,
        field: "OnDate"
      },
      RequestStatus: {
        type: Sequelize.STRING,
        field: "RequestStatus"
      },
      MeetingType: {
        type: Sequelize.STRING,
        field: "MeetingType"
      },
      Note: {
        type: Sequelize.TEXT,
        field: "Note"
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        field: "IsActive"
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
        field: "CreatedBy"
      },
      CreatedTime: {
        type: Sequelize.DATE,
        field: "CreatedTime"
      },
      UpdatedBy: {
        type: Sequelize.INTEGER,
        field: "UpdatedBy"
      },
      UpdatedTime: {
        type: Sequelize.DATE,
        field: "UpdatedTime"
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return meeting;
};
