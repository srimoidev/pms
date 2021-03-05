module.exports = (sequelize, Sequelize) => {
  const form_prerequisite = sequelize.define(
    "form_prerequisite",
    {
      Pre_ID: {
        type: Sequelize.INTEGER,
        field: "Pre_ID",
        primaryKey: true,
      },
      Pre_FormTypeID: {
        type: Sequelize.INTEGER,
        field: "Pre_FormTypeID",
      },
      Pre_FormReqTypeID: {
        type: Sequelize.INTEGER,
        field: "Pre_FormReqTypeID",
      },
      Pre_UpdateTime: {
        type: Sequelize.DATE,
        field: "Pre_UpdateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return form_prerequisite;
};
