module.exports = (sequelize, DataTypes) => {
  const JobApplicationHistory = sequelize.define(
    'JobApplicationHistory',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      jobAppId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'job_app_id',
        references: {
          model: 'JobApplication',
          key: 'id',
        },
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'updated_by',
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'updated_at',
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'updated_status',
      },
    },
    {
      tableName: 'job_application_history',
      timestamps: false,
    }
  );

  return JobApplicationHistory;
};
