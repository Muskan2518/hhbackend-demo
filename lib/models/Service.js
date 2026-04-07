const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  providerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'providers', key: 'id' } },
  name: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  category: { type: DataTypes.ENUM('consultation', 'test', 'medicine', 'procedure'), allowNull: false },
  basePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'services', timestamps: true });

module.exports = Service;
