const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Provider = sequelize.define('Provider', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  businessName: { type: DataTypes.STRING(200), allowNull: false },
  category: { type: DataTypes.ENUM('hospital', 'diagnostics', 'medical'), allowNull: false },
  contactPerson: { type: DataTypes.STRING(100), allowNull: true },
  phone: { type: DataTypes.STRING(15), allowNull: true },
  email: { type: DataTypes.STRING(100), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  city: { type: DataTypes.STRING(50), allowNull: true },
  licenseNumber: { type: DataTypes.STRING(50), allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: true },
  rating: { type: DataTypes.FLOAT, defaultValue: 0 },
  discountPercent: { type: DataTypes.FLOAT, defaultValue: 0 },
  commissionPercent: { type: DataTypes.FLOAT, defaultValue: 0 },
  status: { type: DataTypes.ENUM('pending', 'verified', 'suspended'), defaultValue: 'pending' },
}, { tableName: 'providers', timestamps: true });

module.exports = Provider;
