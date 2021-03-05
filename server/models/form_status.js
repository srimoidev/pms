module.exports = (sequelize, Sequelize) => {
  const form_status = sequelize.define(
    "form_status",
    {
      FormStatus_ID: {
        type: Sequelize.INTEGER,
        field: "FormStatus_ID",
        primaryKey: true,
      },
      FormStatus_Name: {
        type: Sequelize.STRING,
        field: "FormStatus_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return form_status;
};
