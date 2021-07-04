module.exports = (sequelize, Sequelize) => {
  const deadline = sequelize.define(
    "deadline",
    {
      DeadlineID: {
        type: Sequelize.INTEGER,
        field: "DeadlineID",
        primaryKey: true
      },
      SectionID: {
        type: Sequelize.INTEGER,
        field: "SectionID"
      },
      FormTypeID: {
        type: Sequelize.INTEGER,
        field: "FormTypeID"
      },
      OnDate: {
        type: Sequelize.DATE,
        field: "OnDate"
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
  return deadline;
};
