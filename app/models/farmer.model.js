module.exports = (sequelize, DataTypes) => {
    const Farmer = sequelize.define("farmer", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
    return Farmer;
  };