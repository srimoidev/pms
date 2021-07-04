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
      Sequence: {
        type: Sequelize.INTEGER,
        field: "Sequence"
      },
      MenuName: {
        type: Sequelize.STRING,
        field: "MenuName"
      },
      Icon: {
        type: Sequelize.STRING,
        field: "Icon"
      },
      IconAlt: {
        type: Sequelize.STRING,
        field: "IconAlt"
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
  return app_menus;
};
