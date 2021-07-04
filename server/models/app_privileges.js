module.exports = (sequelize, Sequelize) => {
  const app_privileges = sequelize.define(
    "app_privileges",
    {
      UserTypeID: {
        type: Sequelize.INTEGER,
        field: "UserTypeID",
        primaryKey: true
      },
      MenuID: {
        type: Sequelize.INTEGER,
        field: "MenuID"
      },
      Route: {
        type: Sequelize.STRING,
        field: "Route"
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
  return app_privileges;
};
