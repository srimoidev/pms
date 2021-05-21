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
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return app_privileges;
};
