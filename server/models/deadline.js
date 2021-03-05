module.exports = (sequelize, Sequelize) => {
  const deadline = sequelize.define(
    "deadline",
    {
      Deadline_ID: {
        type: Sequelize.INTEGER,
        field: "Deadline_ID",
        primaryKey: true,
      },
      Deadline_SectionID: {
        type: Sequelize.INTEGER,
        field: "Deadline_SectionID",
      },
      Deadline_FormTypeID: {
        type: Sequelize.INTEGER,
        field: "Deadline_FormTypeID",
      },
      Deadline_DateTime: {
        type: Sequelize.DATE,
        field: "Deadline_DateTime",
      },
      Deadline_UpdatedTime: {
        type: Sequelize.DATE,
        field: "Deadline_UpdatedTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return deadline;
};
