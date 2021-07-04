module.exports = (sequelize, Sequelize) => {
  const project_advisor = sequelize.define(
    "project_advisor",
    {
      AdvisorID: {
        type: Sequelize.INTEGER,
        field: "AdvisorID",
        primaryKey: true,
        autoIncrement: true
      },
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID"
      },
      UserID: {
        type: Sequelize.INTEGER,
        field: "UserID"
      },
      RequestStatus: {
        type: Sequelize.BOOLEAN,
        field: "RequestStatus"
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
  return project_advisor;
};
