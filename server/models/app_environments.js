module.exports = (sequelize, Sequelize) => {
  const app_environments = sequelize.define(
    "app_environments",
    {
      EnvID: {
        type: Sequelize.INTEGER,
        field: "EnvID",
        primaryKey: true
      },
      EnvName: {
        type: Sequelize.STRING,
        field: "EnvName"
      },
      EnvValue: {
        type: Sequelize.STRING,
        field: "EnvValue"
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
  return app_environments;
};
