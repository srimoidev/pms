module.exports = (sequelize, Sequelize) => {
  const form_type = sequelize.define(
    "form_type",
    {
      FormTypeID: {
        type: Sequelize.INTEGER,
        field: "FormTypeID",
        primaryKey: true
      },
      FormTypeName: {
        type: Sequelize.STRING,
        field: "FormTypeName"
      },
      FormTypeDetail: {
        type: Sequelize.STRING,
        field: "FormTypeDetail"
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
  return form_type;
};
