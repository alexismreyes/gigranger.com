// models/Company.js
module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define(
    'JobApplication',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'User',
          key: 'id',
        },
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'job_id',
        references: {
          model: 'Jobs',
          key: 'id',
        },
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'status_id',
        references: {
          model: 'ApplicationStatus',
          key: 'id',
        },
      },
      requestDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'request_date',
      },
    },
    {
      tableName: 'job_application',
      timestamps: false,
    }
  );

  return JobApplication;
};
