const sequelize = require('../config/database');
const User = require('./User');
const Dependent = require('./Dependent');
const Provider = require('./Provider');
const Service = require('./Service');
const ServiceRequest = require('./ServiceRequest');
const Invoice = require('./Invoice');

User.hasMany(Dependent, { foreignKey: 'userId', as: 'dependents' });
Dependent.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Provider, { foreignKey: 'userId', as: 'provider' });
Provider.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Provider.hasMany(Service, { foreignKey: 'providerId', as: 'services' });
Service.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

User.hasMany(ServiceRequest, { foreignKey: 'patientId', as: 'requests' });
ServiceRequest.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

Provider.hasMany(ServiceRequest, { foreignKey: 'providerId', as: 'requests' });
ServiceRequest.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

Service.hasMany(ServiceRequest, { foreignKey: 'serviceId', as: 'requests' });
ServiceRequest.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

Dependent.hasMany(ServiceRequest, { foreignKey: 'dependentId', as: 'requests' });
ServiceRequest.belongsTo(Dependent, { foreignKey: 'dependentId', as: 'dependent' });

ServiceRequest.hasOne(Invoice, { foreignKey: 'requestId', as: 'invoice' });
Invoice.belongsTo(ServiceRequest, { foreignKey: 'requestId', as: 'request' });

User.hasMany(Invoice, { foreignKey: 'patientId', as: 'invoices' });
Invoice.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

Provider.hasMany(Invoice, { foreignKey: 'providerId', as: 'invoices' });
Invoice.belongsTo(Provider, { foreignKey: 'providerId', as: 'provider' });

module.exports = { sequelize, User, Dependent, Provider, Service, ServiceRequest, Invoice };
