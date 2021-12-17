module.exports = (sequelize, Sequelize) => {
  const notifications = sequelize.define(
    "notifications",
    {
      NotiID: {
        type: Sequelize.INTEGER,
        field: "NotiID",
        primaryKey: true
      },
      NotiTypeID: {
        type: Sequelize.STRING,
        field: "NotiTypeID",
        unique: true
      },
      UserID: {
        type: Sequelize.STRING,
        field: "UserID"
      },
      Title: {
        type: Sequelize.STRING,
        field: "Title"
      },
      Message: {
        type: Sequelize.STRING,
        field: "Message"
      },
      IsRead: {
        type: Sequelize.BOOLEAN,
        field: "IsRead"
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
  return notifications;
};
