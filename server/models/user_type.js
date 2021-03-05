module.exports = (sequelize, Sequelize) => {
  const user_type = sequelize.define(
    "user_type",
    {
      UserType_ID: {
        type: Sequelize.INTEGER,
        field: "UserType_ID",
        primaryKey: true,
      },
      UserType_Name: {
        type: Sequelize.INTEGER,
        field: "UserType_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return user_type;
};
