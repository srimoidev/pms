module.exports = (sequelize, Sequelize) => {
  const form_comment = sequelize.define(
    "form_comment",
    {
      Comment_ID: {
        type: Sequelize.INTEGER,
        field: "Comment_ID",
        primaryKey: true,
      },
      Comment_FormID: {
        type: Sequelize.INTEGER,
        field: "Comment_FormID",
      },
      Comment_UserID: {
        type: Sequelize.INTEGER,
        field: "Comment_UserID",
      },
      Comment_Text: {
        type: Sequelize.TEXT,
        field: "Comment_Text",
      },
      Comment_DateTime: {
        type: Sequelize.DATE,
        field: "Comment_DateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return form_comment;
};
