const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const History = sequelize.define("history", {
  barang: DataTypes.STRING,
  mean: DataTypes.FLOAT,
  median: DataTypes.FLOAT,
  modus: DataTypes.FLOAT,
  toko: DataTypes.STRING,
  harga: DataTypes.FLOAT
});

module.exports = History;
