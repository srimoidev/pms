module.exports = (sequelize, Sequelize) => {
  const user_type = sequelize.define(
    "user_type",
    {
      UserTypeID: {
        type: Sequelize.INTEGER,
        field: "UserTypeID",
        primaryKey: true
      },
      UserTypeName: {
        type: Sequelize.STRING,
        field: "UserTypeName"
      },
      UserTypeNameEN: {
        type: Sequelize.STRING,
        field: "UserTypeNameEN"
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
  return user_type;
};
