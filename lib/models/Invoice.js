const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoiceNumber: { type: DataTypes.STRING(30), unique: true, allowNull: false },
  requestId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'service_requests', key: 'id' } },
  patientId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  providerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'providers', key: 'id' } },
  originalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discountPercent: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  discountAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  finalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  commissionPercent: { type: DataTypes.DECIMAL(5, 2), defaultValue: 0 },
  commissionAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  paymentStatus: { type: DataTypes.ENUM('unpaid', 'paid', 'failed', 'refunded'), defaultValue: 'unpaid' },
  transactionRef: { type: DataTypes.STRING(100), allowNull: true },
  razorpayOrderId: { type: DataTypes.STRING(100), allowNull: true },
  paidAt: { type: DataTypes.DATE, allowNull: true },
}, { tableName: 'invoices', timestamps: true });

module.exports = Invoice;
