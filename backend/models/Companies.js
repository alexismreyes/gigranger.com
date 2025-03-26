// models/Company.js
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define(
    'Company',
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        /* validate: {
          isUrl: true,
        }, */
      },
      foundationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'foundation_date',
      },
      employeesAvgNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'employees_avgnumber',
        validate: {
          min: 1,
        },
      },
      /* active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'logo_url',        
      }, */
    },
    {
      tableName: 'companies',
      timestamps: false,
    }
  );

  return Companies;
};
