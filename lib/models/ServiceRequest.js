const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patientId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  providerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'providers', key: 'id' } },
  serviceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'services', key: 'id' } },
  dependentId: { type: DataTypes.INTEGER, allowNull: true, references: { model: 'dependents', key: 'id' } },
  forWhom: { type: DataTypes.STRING(100), defaultValue: 'Self' },
  notes: { type: DataTypes.TEXT, allowNull: true },
  status: { type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'), defaultValue: 'pending' },
  visitOtp: { type: DataTypes.STRING(6), allowNull: true },
  otpGeneratedAt: { type: DataTypes.DATE, allowNull: true },
  otpExpiresAt: { type: DataTypes.DATE, allowNull: true },
  otpUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  otpVerifiedAt: { type: DataTypes.DATE, allowNull: true },
  otpAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
}, { tableName: 'service_requests', timestamps: true });

module.exports = ServiceRequest;
