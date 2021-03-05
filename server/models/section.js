module.exports = (sequelize, Sequelize) => {
  const section = sequelize.define(
    "section",
    {
      Section_ID: {
        type: Sequelize.INTEGER,
        field: "Section_ID",
        primaryKey: true,
      },
      Section_Year: {
        type: Sequelize.INTEGER,
        field: "Section_Year",
      },
      Section_Term: {
        type: Sequelize.INTEGER,
        field: "Section_Term",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return section;
};
