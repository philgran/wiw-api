const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    fullName: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Shift);
  };

  User.findByUserName = async userName => {
    let user = await User.findOne({
      where: { userName: userName }
    });

    return user;
  }

  return User;
}

export default user;
