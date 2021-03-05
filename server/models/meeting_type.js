module.exports = (sequelize, Sequelize) => {
  const meeting_type = sequelize.define(
    "meeting_type",
    {
      MeetingType_ID: {
        type: Sequelize.INTEGER,
        field: "MeetingType_ID",
        primaryKey: true,
      },
      MeetingType_Name: {
        type: Sequelize.STRING,
        field: "MeetingType_Name",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return meeting_type;
};
