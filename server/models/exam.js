module.exports = (sequelize, Sequelize) => {
    const exam = sequelize.define(
      "exam",
      {
        ExamID: {
          type: Sequelize.INTEGER,
          field: "ExamID",
          primaryKey: true
        },
        ProjectID: {
          type: Sequelize.INTEGER,
          field: "ProjectID"
        },
        OnDate: {
          type: Sequelize.DATE,
          field: "OnDate"
        },
        IsProjectExam: {
          type: Sequelize.BOOLEAN,
          field: "IsProjectExam"
        },
        ExamStatusID: {
          type: Sequelize.INTEGER,
          field: "ExamStatusID",
          defaultValue:1
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
    return exam;
  };
  