module.exports = (sequelize, Sequelize) => {
  const app_menus = sequelize.define(
    "app_menus",
    {
      MenuID: {
        type: Sequelize.INTEGER,
        field: "MenuID",
        primaryKey: true
      },
      ParentID: {
        type: Sequelize.INTEGER,
        field: "ParentID"
      },
      MenuName: {
        type: Sequelize.STRING,
        field: "MenuName"
      },
      Icon: {
        type: Sequelize.STRING,
        field: "Icon"
      },
      IconAlt:{
        type: Sequelize.STRING,
        field: "IconAlt"
      }
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return app_menus;
};
