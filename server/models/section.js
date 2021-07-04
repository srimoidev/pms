module.exports = (sequelize, Sequelize) => {
  const section = sequelize.define(
    "section",
    {
      SectionID: {
        type: Sequelize.INTEGER,
        field: "SectionID",
        primaryKey: true
      },
      Year: {
        type: Sequelize.DATE,
        field: "Year"
      },
      Term: {
        type: Sequelize.INTEGER,
        field: "Term"
      },
      Detail: {
        type: Sequelize.STRING,
        field: "Detail"
      },
      Instructor: {
        type: Sequelize.INTEGER,
        field: "Instructor"
      },
      DayOfWeek: {
        type: Sequelize.INTEGER,
        field: "DayOfWeek"
      },
      StartTime: {
        type: Sequelize.DATE,
        field: "StartTime"
      },
      EndTime: {
        type: Sequelize.DATE,
        field: "EndTime"
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
  return section;
};
