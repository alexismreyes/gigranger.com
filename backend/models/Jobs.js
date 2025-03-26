module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    'Jobs',
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
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: {
          model: 'JobCategories',
          key: 'id',
        },
      },
      companyId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'company_id',
      },
      salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      requirements: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailContact: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email_contact',
      },
      phoneContact: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone_contact',
      },
      vacancies: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'created_by',
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      tableName: 'jobs',
      timestamps: false,
    }
  );

  return Jobs;
};
