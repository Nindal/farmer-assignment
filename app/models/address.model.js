module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("address", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
          },
          state: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          district: {
            type: DataTypes.STRING,
            allowNull: false,
          },village: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
    });
    return Address;
  };