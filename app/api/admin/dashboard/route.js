import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { User, Provider, ServiceRequest, Dependent } = require('@/lib/models');
const sequelize = require('@/lib/config/database');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const [totalMembers, totalProviders, pendingProviders, verifiedProviders, suspendedProviders, totalRequests, totalDependents, [[sums]], allProviders] = await Promise.all([
      User.count({ where: { role: 'patient', isEnrolled: true } }),
      Provider.count(),
      Provider.count({ where: { status: 'pending' } }),
      Provider.count({ where: { status: 'verified' } }),
      Provider.count({ where: { status: 'suspended' } }),
      ServiceRequest.count(),
      Dependent.count(),
      sequelize.query('SELECT COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(discountAmount),0) as totalDiscount FROM invoices'),
      Provider.findAll({ attributes: ['id', 'businessName', 'category', 'discountPercent', 'commissionPercent'], where: { status: 'verified' }, order: [['businessName', 'ASC']] }),
    ]);
    const totalBilling = parseFloat(sums.totalBilling);
    const totalCommission = parseFloat(sums.totalCommission);
    const totalDiscount = parseFloat(sums.totalDiscount);

    const providerIds = allProviders.map(p => p.id);
    let providerSummaries = [];
    if (providerIds.length > 0) {
      const [providerRows] = await sequelize.query(
        `SELECT providerId, COUNT(*) as totalBills, COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(discountAmount),0) as totalDiscount, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(finalAmount),0) as totalPatientPays, COALESCE(SUM(CASE WHEN paymentStatus='paid' THEN finalAmount ELSE 0 END),0) as paidAmount, COALESCE(SUM(CASE WHEN paymentStatus!='paid' THEN finalAmount ELSE 0 END),0) as unpaidAmount FROM invoices WHERE providerId IN (${providerIds.join(',')}) GROUP BY providerId`
      );
      const summaryMap = {};
      providerRows.forEach(row => { summaryMap[row.providerId] = { totalBills: parseInt(row.totalBills), totalBilling: parseFloat(row.totalBilling), totalDiscount: parseFloat(row.totalDiscount), totalCommission: parseFloat(row.totalCommission), totalPatientPays: parseFloat(row.totalPatientPays), paidAmount: parseFloat(row.paidAmount), unpaidAmount: parseFloat(row.unpaidAmount) }; });

      const [monthlyRows] = await sequelize.query(
        `SELECT providerId, DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as totalBills, COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(discountAmount),0) as totalDiscount, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(finalAmount),0) as totalPatientPays, COALESCE(SUM(CASE WHEN paymentStatus='paid' THEN finalAmount ELSE 0 END),0) as paidAmount, COALESCE(SUM(CASE WHEN paymentStatus!='paid' THEN finalAmount ELSE 0 END),0) as unpaidAmount FROM invoices WHERE providerId IN (${providerIds.join(',')}) GROUP BY providerId, DATE_FORMAT(createdAt, '%Y-%m') ORDER BY month DESC`
      );
      const monthlyMap = {};
      monthlyRows.forEach(row => { if (!monthlyMap[row.providerId]) monthlyMap[row.providerId] = []; monthlyMap[row.providerId].push({ month: row.month, totalBills: parseInt(row.totalBills), totalBilling: parseFloat(row.totalBilling), totalDiscount: parseFloat(row.totalDiscount), totalCommission: parseFloat(row.totalCommission), totalPatientPays: parseFloat(row.totalPatientPays), paidAmount: parseFloat(row.paidAmount), unpaidAmount: parseFloat(row.unpaidAmount) }); });

      providerSummaries = allProviders.map(p => ({ id: p.id, businessName: p.businessName, category: p.category, discountPercent: p.discountPercent, commissionPercent: p.commissionPercent, ...(summaryMap[p.id] || { totalBills: 0, totalBilling: 0, totalDiscount: 0, totalCommission: 0, totalPatientPays: 0, paidAmount: 0, unpaidAmount: 0 }), monthly: monthlyMap[p.id] || [] }));
    }

    return NextResponse.json({ stats: { totalMembers, totalProviders, pendingProviders, verifiedProviders, suspendedProviders, totalRequests, totalDependents, totalBilling, totalCommission, totalDiscount }, providerSummaries });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
