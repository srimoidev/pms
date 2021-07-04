module.exports = (sequelize, Sequelize) => {
  const project_committee = sequelize.define(
    "project_committee",
    {
      CommitteeID: {
        type: Sequelize.INTEGER,
        field: "CommitteeID",
        primaryKey: true
      },
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID"
      },
      UserID: {
        type: Sequelize.INTEGER,
        field: "UserID"
      },
      CommitteeRoleID: {
        type: Sequelize.INTEGER,
        field: "CommitteeRoleID"
      },
      PresentScore: {
        type: Sequelize.INTEGER,
        field: "PresentScore"
      },
      DocumentScore: {
        type: Sequelize.INTEGER,
        field: "DocumentScore"
      },
      AdvisorScore: {
        type: Sequelize.INTEGER,
        field: "AdvisorScore"
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
  return project_committee;
};
