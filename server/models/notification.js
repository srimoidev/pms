module.exports = (sequelize, Sequelize) => {
  const notification = sequelize.define(
    "notification",
    {
      Notification_ID: {
        type: Sequelize.INTEGER,
        field: "Notification_ID",
        primaryKey: true,
      },
      Notification_Name: {
        type: Sequelize.STRING,
        field: "Notification_Name",
      },
      Notification_Detail: {
        type: Sequelize.STRING,
        field: "Notification_Detail",
      },
      Notification_UserID: {
        type: Sequelize.INTEGER,
        field: "Notification_UserID",
      },
      Notification_StatusID: {
        type: Sequelize.INTEGER,
        field: "Notification_StatusID",
      },
      Notification_DateTime: {
        type: Sequelize.DATE,
        field: "Notification_DateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return notification;
};
