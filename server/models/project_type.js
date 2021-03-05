module.exports = (sequelize, Sequelize) => {
  const project_type = sequelize.define(
    "project_type",
    {
      ProjectType_ID: {
        type: Sequelize.INTEGER,
        field: "ProjectType_ID",
        primaryKey: true,
      },
      ProjectType_Name: {
        type: Sequelize.STRING,
        field: "ProjectType_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_type;
};
