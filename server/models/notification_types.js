module.exports = (sequelize, Sequelize) => {
  const notification_types = sequelize.define(
    "notification_types",
    {
      NotiTypeID: {
        type: Sequelize.INTEGER,
        field: "NotiTypeID",
        primaryKey: true
      },
      NotiTypeName: {
        type: Sequelize.STRING,
        field: "NotiTypeName",
        unique: true
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
  return notification_types;
};
