module.exports = (sequelize, Sequelize) => {
  const project_type = sequelize.define(
    "project_type",
    {
      ProjectTypeID: {
        type: Sequelize.INTEGER,
        field: "ProjectTypeID",
        primaryKey: true
      },
      ProjectTypeNameTH: {
        type: Sequelize.STRING,
        field: "ProjectTypeNameTH"
      },
      ProjectTypeNameEN: {
        type: Sequelize.STRING,
        field: "ProjectTypeNameEN"
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
  return project_type;
};
