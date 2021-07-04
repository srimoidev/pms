module.exports = (sequelize, Sequelize) => {
  const form_status = sequelize.define(
    "form_status",
    {
      FormStatusID: {
        type: Sequelize.INTEGER,
        field: "FormStatusID",
        primaryKey: true
      },
      StatusName: {
        type: Sequelize.STRING,
        field: "StatusName"
      },
      StatusDetail: {
        type: Sequelize.STRING,
        field: "StatusDetail"
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
  return form_status;
};
