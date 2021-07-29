module.exports = (sequelize, Sequelize) => {
  const user_profile = sequelize.define(
    "user_profile",
    {
      UserID: {
        type: Sequelize.INTEGER,
        field: "UserID",
        primaryKey: true
      },
      Username: {
        type: Sequelize.STRING,
        field: "UserName",
        unique: true
      },
      Password: {
        type: Sequelize.STRING,
        field: "Password"
      },
      Prefix: {
        type: Sequelize.STRING,
        field: "Prefix"
      },
      Firstname: {
        type: Sequelize.STRING,
        field: "Firstname"
      },
      Lastname: {
        type: Sequelize.STRING,
        field: "Lastname"
      },
      StudentID: {
        type: Sequelize.STRING,
        field: "StudentID"
      },
      Email: {
        type: Sequelize.STRING,
        field: "Email"
      },
      TelephoneNo: {
        type: Sequelize.STRING,
        field: "TelephoneNo"
      },
      AcademicYear: {
        type: Sequelize.STRING,
        field: "AcademicYear"
      },
      UserTypeID: {
        type: Sequelize.INTEGER,
        field: "UserTypeID"
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        field: "IsActive"
      },
      ImgProfile: {
        type: Sequelize.STRING,
        field: "ImgProfile"
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
  return user_profile;
};
