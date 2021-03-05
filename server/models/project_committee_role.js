module.exports = (sequelize, Sequelize) => {
  const project_committee_role = sequelize.define(
    "project_committee_role",
    {
      CommitteeRole_ID: {
        type: Sequelize.INTEGER,
        field: "CommitteeRole_ID",
        primaryKey: true,
      },
      CommitteeRole_Name: {
        type: Sequelize.STRING,
        field: "CommitteeRole_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_committee_role;
};
