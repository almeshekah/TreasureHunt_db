module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          unique: {
            args: true,
            msg: "Username already exists",
          },
        },
        // allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          allowNull: false,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {

        // }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return User;
};
