// models/Company.js
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    'Status',
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
      tableName: 'status',
      timestamps: false,
    }
  );

  return Status;
};
