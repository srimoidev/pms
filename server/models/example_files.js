module.exports = (sequelize, Sequelize) => {
  const example_file = sequelize.define(
    "example_file",
    {
      ExampleFileID: {
        type: Sequelize.INTEGER,
        field: "ExampleFileID",
        autoIncrement: true,
        primaryKey: true
      },
      OriginalFileName: {
        type: Sequelize.STRING,
        field: "OriginalFileName"
      },
      ExampleFileName: {
        type: Sequelize.STRING,
        field: "ExampleFileName"
      },
      FileSize: {
        type: Sequelize.INTEGER,
        field: "FileSize"
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
  return example_file;
};
