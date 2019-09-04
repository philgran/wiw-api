const shift = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    userId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  });

  Shift.associate = models => {
    Shift.belongsTo(models.User);
  };

  return Shift;
};

export default shift;
