module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,

      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  );

  User.beforeCreate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("123456", saltRounds);
    user.password = hashedPassword;
  });

  return User;
};
