module.exports = (sequelize, Sequelize) => {
  const form_sent = sequelize.define(
    "form_sent",
    {
      FormID: {
        type: Sequelize.INTEGER,
        field: "FormID",
        primaryKey: true,
        autoIncrement: true
      },
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID"
      },
      FormTypeID: {
        type: Sequelize.INTEGER,
        field: "FormTypeID"
      },
      FileName: {
        type: Sequelize.STRING,
        field: "FileName"
      },
      FormStatusID: {
        type: Sequelize.INTEGER,
        field: "FormStatusID"
      },
      CompletedTime: {
        type: Sequelize.DATE,
        field: "CompletedTime"
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
  return form_sent;
};
