module.exports = (sequelize, Sequelize) => {
  const notification_types = sequelize.define(
    "notification_types",
    {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true
      },
      NotiTypeID: {
        type: Sequelize.INTEGER,
        field: "NotiTypeID"
      },
      UserTypeID: {
        type: Sequelize.INTEGER,
        field: "UserTypeID"
      },
      NotiTypeName: {
        type: Sequelize.STRING,
        field: "NotiTypeName"
      },
      TitleTemplate: {
        type: Sequelize.STRING,
        field: "TitleTemplate"
      },
      MessageTemplate: {
        type: Sequelize.STRING,
        field: "MessageTemplate"
      },
      ActionPage: {
        type: Sequelize.STRING,
        field: "ActionPage"
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
