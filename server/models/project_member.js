module.exports = (sequelize, Sequelize) => {
  const project_member = sequelize.define(
    "project_member",
    {
      Member_ID: {
        type: Sequelize.INTEGER,
        field: "Member_ID",
        primaryKey: true,
      },
      Member_UserID: {
        type: Sequelize.INTEGER,
        field: "Member_UserID",
      },
      Member_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Member_ProjectID",
      },
      Member_RequestStatusID: {
        type: Sequelize.INTEGER,
        field: "Member_RequestStatusID",
      },
      Member_UpdateTime: {
        type: Sequelize.DATE,
        field: "Member_UpdateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_member;
};
