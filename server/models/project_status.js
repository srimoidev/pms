module.exports = (sequelize, Sequelize) => {
  const project_status = sequelize.define(
    "project_status",
    {
      ProjectStatus_ID: {
        type: Sequelize.INTEGER,
        field: "ProjectStatus_ID",
        primaryKey: true,
      },
      ProjectStatus_Name: {
        type: Sequelize.STRING,
        field: "ProjectStatus_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_status;
};
