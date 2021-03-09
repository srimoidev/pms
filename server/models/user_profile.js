module.exports = (sequelize, Sequelize) => {
  const user_profile = sequelize.define(
    "user_profile", {
      User_ID: {
        type: Sequelize.INTEGER,
        field: "User_ID",
        primaryKey: true,
      },
      User_UserName: {
        type: Sequelize.STRING,
        field: "User_UserName",
      },
      User_Password: {
        type: Sequelize.STRING,
        field: "User_Password",
      },
      User_Firstname: {
        type: Sequelize.STRING,
        field: "User_Firstname",
      },
      User_Lastname: {
        type: Sequelize.STRING,
        field: "User_Lastname",
      },
      User_StudentID: {
        type: Sequelize.STRING,
        field: "User_StudentID",
      },
      User_Email: {
        type: Sequelize.STRING,
        field: "User_Email",
      },
      User_Tel: {
        type: Sequelize.INTEGER,
        field: "User_Tel",
      },
      User_AcademicYear: {
        type: Sequelize.INTEGER,
        field: "User_AcademicYear",
      },
      User_TypeID: {
        type: Sequelize.INTEGER,
        field: "User_TypeID",
      },
    }, {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return user_profile;
};