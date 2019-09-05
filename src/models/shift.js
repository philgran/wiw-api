const shift = (sequelize, DataTypes) => {
  const Shift = sequelize.define('shift', {
    userId: DataTypes.INTEGER,
    position: DataTypes.STRING,
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   fn: async (val) => {
      //     console.log('val:', val)
      //     if (this) {
      //       const user = await this.getUser();
      //       const shifts = await user.getShifts();
      //     }
      //     debugger;
      //   },
      // },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Shift.associate = models => {
    Shift.belongsTo(models.User);
  };

  return Shift;
};

export default shift;
