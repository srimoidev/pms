module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    "user",
    {
      User_ID: {
        type: Sequelize.INTEGER,
        field: "User_ID",
        primaryKey: true,
      },
      User_Username: {
        type: Sequelize.STRING,
        field: "User_Username",
      },
      User_Password: {
        type: Sequelize.STRING,
        field: "User_Password",
      },
      User_TypeID: {
        type: Sequelize.INTEGER,
        field: "User_TypeID",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return user;
};
