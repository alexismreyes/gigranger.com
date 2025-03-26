module.exports = (sequelize, DataTypes) => {
  const JobCategories = sequelize.define(
    'JobCategories',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'job_categories',
      timestamps: false,
    }
  );

  return JobCategories;
};
