const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dependent = sequelize.define('Dependent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  name: { type: DataTypes.STRING(100), allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: true },
  gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: true },
  relation: { type: DataTypes.ENUM('Spouse', 'Child', 'Parent', 'Sibling'), allowNull: false },
}, { tableName: 'dependents', timestamps: true });

module.exports = Dependent;
