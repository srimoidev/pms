module.exports = (sequelize, Sequelize) => {
  const meeting_note = sequelize.define(
    "meeting_note",
    {
      MeetingNote_ID: {
        type: Sequelize.INTEGER,
        field: "MeetingNote_ID",
        primaryKey: true,
      },
      MeetingNote_MeetingID: {
        type: Sequelize.INTEGER,
        field: "MeetingNote_MeetingID",
      },
      MeetingNote_Text: {
        type: Sequelize.TEXT,
        field: "MeetingNote_Text",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return meeting_note;
};
