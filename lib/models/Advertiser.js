const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Advertiser = sequelize.define('Advertiser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  empId: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  phone: { type: DataTypes.STRING(15), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'advertisers', timestamps: true });

module.exports = Advertiser;
