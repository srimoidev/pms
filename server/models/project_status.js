module.exports = (sequelize, Sequelize) => {
  const project_status = sequelize.define(
    "project_status",
    {
      ProjectStatusID: {
        type: Sequelize.INTEGER,
        field: "ProjectStatusID",
        primaryKey: true
      },
      ProjectStatusName: {
        type: Sequelize.STRING,
        field: "ProjectStatusName"
      },
      ProjectStatusDetail: {
        type: Sequelize.STRING,
        field: "ProjectStatusDetail"
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
  return project_status;
};
