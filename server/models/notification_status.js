module.exports = (sequelize, Sequelize) => {
  const notification_status = sequelize.define(
    "notification_status",
    {
      NotificationStatus_ID: {
        type: Sequelize.INTEGER,
        field: "NotificationStatus_ID",
        primaryKey: true,
      },
      NotificationStatus_Name: {
        type: Sequelize.STRING,
        field: "NotificationStatus_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return notification_status;
};
