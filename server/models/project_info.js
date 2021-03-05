module.exports = (sequelize, Sequelize) => {
  const project_info = sequelize.define(
    "project_info",
    {
      Project_ID: {
        type: Sequelize.INTEGER,
        field: "Project_ID",
        primaryKey: true,
      },
      Project_NameTH: {
        type: Sequelize.STRING,
        field: "Project_NameTH",
        primaryKey: true,
      },
      Project_NameEN: {
        type: Sequelize.STRING,
        field: "Project_NameEN",
        primaryKey: true,
      },
      Project_Detail: {
        type: Sequelize.STRING,
        field: "Project_Detail",
        primaryKey: true,
      },
      Project_TypeID: {
        type: Sequelize.STRING,
        field: "Project_TypeID",
        primaryKey: true,
      },
      Project_MaxMember: {
        type: Sequelize.INTEGER,
        field: "Project_MaxMember",
        primaryKey: true,
      },
      Project_SectionID: {
        type: Sequelize.INTEGER,
        field: "Project_SectionID",
        primaryKey: true,
      },
      Project_StatusID: {
        type: Sequelize.INTEGER,
        field: "Project_StatusID",
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_info;
};
