module.exports = (sequelize, Sequelize) => {
  const form_sent = sequelize.define(
    "form_sent",
    {
      Form_ID: {
        type: Sequelize.INTEGER,
        field: "Form_ID",
        primaryKey: true,
      },
      Form_ProjectID: {
        type: Sequelize.INTEGER,
        field: "Form_ProjectID",
      },
      Form_TypeID: {
        type: Sequelize.INTEGER,
        field: "Form_TypeID",
      },
      Form_FileName: {
        type: Sequelize.STRING,
        field: "Form_FileName",
      },
      Form_CreatedTime: {
        type: Sequelize.DATE,
        field: "Form_CreatedTime",
      },
      Form_RevisedTime: {
        type: Sequelize.DATE,
        field: "Form_RevisedTime",
      },
      Form_UpdatedTime: {
        type: Sequelize.DATE,
        field: "Form_UpdatedTime",
      },
      Form_CompletedTime: {
        type: Sequelize.DATE,
        field: "Form_CompletedTime",
      },
      Form_StatusID: {
        type: Sequelize.INTEGER,
        field: "Form_StatusID",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return form_sent;
};
