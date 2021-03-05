module.exports = (sequelize, Sequelize) => {
  const document = sequelize.define(
    "document",
    {
      Document_ID: {
        type: Sequelize.INTEGER,
        field: "Document_ID",
        primaryKey: true,
      },
      Document_DateTime: {
        type: Sequelize.DATE,
        field: "Document_DateTime",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return document;
};
