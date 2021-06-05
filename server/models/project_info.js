module.exports = (sequelize, Sequelize) => {
  const project_info = sequelize.define(
    "project_info",
    {
      Project_ID: {
        type: Sequelize.INTEGER,
        field: "Project_ID",
        primaryKey: true,
        autoIncrement: true
      },
      Project_NameTH: {
        type: Sequelize.STRING,
        field: "Project_NameTH",
      },
      Project_NameEN: {
        type: Sequelize.STRING,
        field: "Project_NameEN",
      },
      Project_Detail: {
        type: Sequelize.STRING,
        field: "Project_Detail",
      },
      Project_TypeID: {
        type: Sequelize.STRING,
        field: "Project_TypeID",
      },
      Project_MaxMember: {
        type: Sequelize.INTEGER,
        field: "Project_MaxMember",
      },
      Project_SectionID: {
        type: Sequelize.INTEGER,
        field: "Project_SectionID",
      },
      Project_StatusID: {
        type: Sequelize.INTEGER,
        field: "Project_StatusID",
      },
      isAdvisorsConfirm: {
        type:Sequelize.BOOLEAN,
        field:"isAdvisorsConfirm"
      },
      createBy: {
        type:Sequelize.INTEGER,
        field:"createBy"
      },
      createTime: {
        type:Sequelize.DATE,
        field:"createTime"
      },
      updateBy: {
        type:Sequelize.INTEGER,
        field:"updateBy"
      },
      updateTime: {
        type:Sequelize.DATE,
        field:"updateTime"
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return project_info;
};
