module.exports = (sequelize, Sequelize) => {
  const project_committee_role = sequelize.define(
    "project_committee_role",
    {
      CommitteeRoleID: {
        type: Sequelize.INTEGER,
        field: "CommitteeRoleID",
        primaryKey: true
      },
      CommitteeRoleName: {
        type: Sequelize.STRING,
        field: "CommitteeRoleName"
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return project_committee_role;
};
