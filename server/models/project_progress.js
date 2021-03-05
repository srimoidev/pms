module.exports = (sequelize, Sequelize) => {
  const project_progress = sequelize.define(
    "project_progress",
    {
      Progress_ID: {
        type: Sequelize.INTEGER,
        field: "Progress_ID",
        primaryKey: true,
      },
      Progress_Name: {
        type: Sequelize.STRING,
        field: "Progress_Name",
      },
      Progress_Start: {
        type: Sequelize.DATE,
        field: "Progress_Start",
      },
      Progress_End: {
        type: Sequelize.DATE,
        field: "Progress_End",
      },
      Progress_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Progress_ProjectID",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_progress;
};
