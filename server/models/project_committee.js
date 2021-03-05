module.exports = (sequelize, Sequelize) => {
  const project_committee = sequelize.define(
    "project_committee",
    {
      Committee_ID: {
        type: Sequelize.INTEGER,
        field: "Committee_ID",
        primaryKey: true,
      },
      Committee_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Committee_ProjectID",
      },
      Committee_UserID: {
        type: Sequelize.INTEGER,
        field: "Committee_UserID",
      },
      Committee_RoleID: {
        type: Sequelize.INTEGER,
        field: "Committee_RoleID",
      },
      Committee_PresentScore: {
        type: Sequelize.INTEGER,
        field: "Committee_PresentScore",
      },
      Committee_DocumentScore: {
        type: Sequelize.INTEGER,
        field: "Committee_DocumentScore",
      },
      Committee_AdvisorScore: {
        type: Sequelize.INTEGER,
        field: "Committee_AdvisorScore",
      },
      Committee_RequestStatusID: {
        type: Sequelize.INTEGER,
        field: "Committee_RequestStatusID",
      },
      Committee_UpdateTime: {
        type: Sequelize.DATE,
        field: "Committee_UpdateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_committee;
};
