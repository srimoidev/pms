module.exports = (sequelize, Sequelize) => {
  const form_prerequisite = sequelize.define(
    "form_prerequisite",
    {
      PrerequisiteID: {
        type: Sequelize.INTEGER,
        field: "PrerequisiteID",
        primaryKey: true
      },
      FormTypeID: {
        type: Sequelize.INTEGER,
        field: "FormTypeID"
      },
      FormReqTypeID: {
        type: Sequelize.INTEGER,
        field: "FormReqTypeID"
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
  return form_prerequisite;
};
