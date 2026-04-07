const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  mobile: { type: DataTypes.STRING(15), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(100), allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
  gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: true },
  address: { type: DataTypes.TEXT, allowNull: true },
  role: { type: DataTypes.ENUM('admin', 'provider', 'patient'), defaultValue: 'patient' },
  membershipId: { type: DataTypes.STRING(20), unique: true, allowNull: true },
  isEnrolled: { type: DataTypes.BOOLEAN, defaultValue: false },
  hasMembershipCard: { type: DataTypes.BOOLEAN, defaultValue: false },
  membershipPlan: { type: DataTypes.ENUM('none', '1year', '5year'), defaultValue: 'none' },
  membershipExpiresAt: { type: DataTypes.DATE, allowNull: true },
  membershipActivatedAt: { type: DataTypes.DATE, allowNull: true },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'users', timestamps: true });

module.exports = User;
