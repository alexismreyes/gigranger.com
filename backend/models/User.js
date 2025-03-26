module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'role',
          key: 'id',
        },
      },
      resumeUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'resume_url',
      },
      /* isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }, */
    },
    {
      tableName: 'user',
      timestamps: false,
    }
  );

  return User;
};
