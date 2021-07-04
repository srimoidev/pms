module.exports = (sequelize, Sequelize) => {
  const form_comment = sequelize.define(
    "form_comment",
    {
      CommentID: {
        type: Sequelize.INTEGER,
        field: "CommentID",
        primaryKey: true
      },
      FormID: {
        type: Sequelize.INTEGER,
        field: "FormID"
      },
      CommentText: {
        type: Sequelize.TEXT,
        field: "CommentText"
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
  return form_comment;
};
