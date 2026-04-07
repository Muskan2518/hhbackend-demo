import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider } = require('@/lib/models');
const sequelize = require('@/lib/config/database');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get('providerId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let whereClause = '';
    const replacements = {};
    if (providerId && providerId !== 'all') { whereClause += ' AND i.providerId = :providerId'; replacements.providerId = parseInt(providerId); }
    if (startDate) { whereClause += ' AND i.createdAt >= :startDate'; replacements.startDate = startDate; }
    if (endDate) { whereClause += ' AND i.createdAt <= :endDate'; replacements.endDate = endDate + ' 23:59:59'; }

    const [[totals]] = await sequelize.query(`SELECT COUNT(*) as totalBills, COALESCE(SUM(i.originalAmount),0) as totalBilling, COALESCE(SUM(i.discountAmount),0) as totalDiscount, COALESCE(SUM(i.commissionAmount),0) as totalCommission, COALESCE(SUM(i.finalAmount),0) as totalPatientPays FROM invoices i WHERE 1=1 ${whereClause}`, { replacements });

    const [providerBreakdown] = await sequelize.query(`SELECT i.providerId, p.businessName, p.category, p.commissionPercent, p.discountPercent, COUNT(*) as totalBills, COALESCE(SUM(i.originalAmount),0) as totalBilling, COALESCE(SUM(i.discountAmount),0) as totalDiscount, COALESCE(SUM(i.commissionAmount),0) as totalCommission, COALESCE(SUM(i.finalAmount),0) as totalPatientPays FROM invoices i JOIN providers p ON i.providerId = p.id WHERE 1=1 ${whereClause} GROUP BY i.providerId, p.businessName, p.category, p.commissionPercent, p.discountPercent ORDER BY totalCommission DESC`, { replacements });

    const [dailyBreakdown] = await sequelize.query(`SELECT DATE(i.createdAt) as date, COUNT(*) as totalBills, COALESCE(SUM(i.originalAmount),0) as totalBilling, COALESCE(SUM(i.commissionAmount),0) as totalCommission, COALESCE(SUM(i.discountAmount),0) as totalDiscount FROM invoices i WHERE 1=1 ${whereClause} GROUP BY DATE(i.createdAt) ORDER BY date DESC LIMIT 60`, { replacements });

    const providers = await Provider.findAll({ attributes: ['id', 'businessName', 'category'], order: [['businessName', 'ASC']] });

    return NextResponse.json({
      totals: { totalBills: parseInt(totals.totalBills), totalBilling: parseFloat(totals.totalBilling), totalDiscount: parseFloat(totals.totalDiscount), totalCommission: parseFloat(totals.totalCommission), totalPatientPays: parseFloat(totals.totalPatientPays) },
      providerBreakdown: providerBreakdown.map(r => ({ providerId: r.providerId, businessName: r.businessName, category: r.category, commissionPercent: r.commissionPercent, discountPercent: r.discountPercent, totalBills: parseInt(r.totalBills), totalBilling: parseFloat(r.totalBilling), totalDiscount: parseFloat(r.totalDiscount), totalCommission: parseFloat(r.totalCommission), totalPatientPays: parseFloat(r.totalPatientPays) })),
      dailyBreakdown: dailyBreakdown.map(r => ({ date: r.date, totalBills: parseInt(r.totalBills), totalBilling: parseFloat(r.totalBilling), totalCommission: parseFloat(r.totalCommission), totalDiscount: parseFloat(r.totalDiscount) })),
      providers: providers.map(p => ({ id: p.id, businessName: p.businessName, category: p.category })),
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
