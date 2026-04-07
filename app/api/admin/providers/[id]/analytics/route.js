import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider } = require('@/lib/models');
const sequelize = require('@/lib/config/database');

export async function GET(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const provider = await Provider.findByPk(id, { attributes: ['id', 'businessName', 'category', 'discountPercent', 'commissionPercent'] });
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });

    const [monthlyRows] = await sequelize.query(
      `SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as totalBills, COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(discountAmount),0) as totalDiscount, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(finalAmount),0) as totalPatientPays, COALESCE(SUM(CASE WHEN paymentStatus='paid' THEN finalAmount ELSE 0 END),0) as paidAmount, COALESCE(SUM(CASE WHEN paymentStatus!='paid' THEN finalAmount ELSE 0 END),0) as unpaidAmount FROM invoices WHERE providerId = :providerId GROUP BY DATE_FORMAT(createdAt, '%Y-%m') ORDER BY month DESC`,
      { replacements: { providerId: provider.id } }
    );
    const monthly = monthlyRows.map(row => ({ month: row.month, totalBills: parseInt(row.totalBills), totalBilling: parseFloat(row.totalBilling), totalDiscount: parseFloat(row.totalDiscount), totalCommission: parseFloat(row.totalCommission), totalPatientPays: parseFloat(row.totalPatientPays), paidAmount: parseFloat(row.paidAmount), unpaidAmount: parseFloat(row.unpaidAmount) }));

    const [[totalsRow]] = await sequelize.query(
      `SELECT COUNT(*) as totalBills, COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(discountAmount),0) as totalDiscount, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(finalAmount),0) as totalPatientPays, COALESCE(SUM(CASE WHEN paymentStatus='paid' THEN finalAmount ELSE 0 END),0) as paidAmount, COALESCE(SUM(CASE WHEN paymentStatus!='paid' THEN finalAmount ELSE 0 END),0) as unpaidAmount FROM invoices WHERE providerId = :providerId`,
      { replacements: { providerId: provider.id } }
    );
    const totals = { totalBills: parseInt(totalsRow.totalBills), totalBilling: parseFloat(totalsRow.totalBilling), totalDiscount: parseFloat(totalsRow.totalDiscount), totalCommission: parseFloat(totalsRow.totalCommission), totalPatientPays: parseFloat(totalsRow.totalPatientPays), paidAmount: parseFloat(totalsRow.paidAmount), unpaidAmount: parseFloat(totalsRow.unpaidAmount) };

    return NextResponse.json({ provider: { id: provider.id, businessName: provider.businessName, category: provider.category, discountPercent: provider.discountPercent, commissionPercent: provider.commissionPercent }, totals, monthly });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
