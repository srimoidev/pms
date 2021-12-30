module.exports = (sequelize, Sequelize) => {
  const project_info = sequelize.define(
    "project_info",
    {
      ProjectID: {
        type: Sequelize.INTEGER,
        field: "ProjectID",
        primaryKey: true,
        autoIncrement: true
      },
      ProjectNameTH: {
        type: Sequelize.STRING,
        field: "ProjectNameTH"
      },
      ProjectNameEN: {
        type: Sequelize.STRING,
        field: "ProjectNameEN"
      },
      ProjectDetail: {
        type: Sequelize.STRING,
        field: "ProjectDetail"
      },
      ProjectTypeID: {
        type: Sequelize.STRING,
        field: "ProjectTypeID"
      },
      MaxMember: {
        type: Sequelize.INTEGER,
        field: "MaxMember"
      },
      SectionID: {
        type: Sequelize.INTEGER,
        field: "SectionID"
      },
      ProjectStatusID: {
        type: Sequelize.INTEGER,
        field: "ProjectStatusID"
      },
      RejectedRemark: {
        type: Sequelize.STRING,
        field: "RejectedRemark"
      },
      IsProject: {
        type: Sequelize.BOOLEAN,
        field: "IsProject"
      },
      Grade: {
        type: Sequelize.INTEGER,
        field: "Grade"
      },
      ProjectStatusID: {
        type: Sequelize.FLOAT,
        field: "ProjectStatusID"
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
  return project_info;
};
