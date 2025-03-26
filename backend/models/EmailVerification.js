module.exports = (sequelize, DataTypes) => {
  const EmailVerification = sequelize.define(
    'EmailVerification',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    },
    {
      tableName: 'email_verifications',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return EmailVerification;
};
