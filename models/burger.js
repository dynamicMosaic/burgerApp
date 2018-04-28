module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("burger", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    return Burger;
  };
  