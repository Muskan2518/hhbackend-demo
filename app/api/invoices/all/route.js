import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Invoice, ServiceRequest, User, Provider, Service } = require('@/lib/models');
const sequelize = require('@/lib/config/database');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const [invoices, [[sums]]] = await Promise.all([
      Invoice.findAll({
        include: [
          { model: User, as: 'patient', attributes: ['name', 'mobile', 'membershipId'] },
          { model: Provider, as: 'provider', attributes: ['businessName', 'category'] },
          { model: ServiceRequest, as: 'request', attributes: ['id', 'status'], include: [{ model: Service, as: 'service', attributes: ['name', 'category'] }] },
        ],
        order: [['createdAt', 'DESC']], limit: 100,
      }),
      sequelize.query(
        `SELECT COALESCE(SUM(originalAmount),0) as totalBilling, COALESCE(SUM(discountAmount),0) as totalDiscount, COALESCE(SUM(commissionAmount),0) as totalCommission, COALESCE(SUM(CASE WHEN paymentStatus='paid' THEN finalAmount ELSE 0 END),0) as totalPaid, COALESCE(SUM(CASE WHEN paymentStatus='unpaid' THEN finalAmount ELSE 0 END),0) as totalUnpaid FROM invoices`
      ),
    ]);
    return NextResponse.json({ invoices, summary: { totalBilling: parseFloat(sums.totalBilling), totalDiscount: parseFloat(sums.totalDiscount), totalCommission: parseFloat(sums.totalCommission), totalPaid: parseFloat(sums.totalPaid), totalUnpaid: parseFloat(sums.totalUnpaid) } });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
