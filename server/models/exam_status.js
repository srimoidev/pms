module.exports = (sequelize, Sequelize) => {
    const exam_status = sequelize.define(
      "exam_status",
      {
        ExamStatusID: {
          type: Sequelize.INTEGER,
          field: "ExamStatusID",
          primaryKey: true
        },
        ExamStatusName: {
          type: Sequelize.STRING,
          field: "ExamStatusName"
        },
        IsActive: {
          type: Sequelize.BOOLEAN,
          field: "IsActive"
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
    return exam_status;
  };
  