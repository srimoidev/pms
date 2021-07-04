module.exports = (sequelize, Sequelize) => {
  const project_member = sequelize.define(
    "project_member",
    {
      MemberID: {
        type: Sequelize.INTEGER,
        field: "MemberID",
        primaryKey: true
      },
      UserID: {
        type: Sequelize.INTEGER,
        field: "UserID"
      },
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID"
      },
      RequestStatusID: {
        type: Sequelize.INTEGER,
        field: "RequestStatusID"
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
  return project_member;
};
