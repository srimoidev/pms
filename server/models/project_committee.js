module.exports = (sequelize, Sequelize) => {
  const project_committee = sequelize.define(
    "project_committee",
    {
      CommitteeID: {
        type: Sequelize.INTEGER,
        field: "CommitteeID",
        primaryKey: true
      },
      ExamID: {
        type: Sequelize.INTEGER,
        field: "ExamID"
      },
      UserID: {
        type: Sequelize.INTEGER,
        field: "UserID"
      },
      PresentScore: {
        type: Sequelize.FLOAT,
        field: "PresentScore"
      },
      DocumentScore: {
        type: Sequelize.FLOAT,
        field: "DocumentScore"
      },
      AdvisorScore: {
        type: Sequelize.FLOAT,
        field: "AdvisorScore"
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
