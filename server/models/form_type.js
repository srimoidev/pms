module.exports = (sequelize, Sequelize) => {
  const form_type = sequelize.define(
    "form_type",
    {
      FormType_ID: {
        type: Sequelize.INTEGER,
        field: "FormType_ID",
        primaryKey: true,
      },
      FormType_Name: {
        type: Sequelize.STRING,
        field: "FormType_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return form_type;
};
