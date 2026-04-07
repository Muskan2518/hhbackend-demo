import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { ServiceRequest, Invoice, User, Provider, Service, Dependent } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const provider = await Provider.findOne({ where: { userId: authUser.id } });
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    const requests = await ServiceRequest.findAll({
      where: { providerId: provider.id },
      attributes: { exclude: ['visitOtp'] },
      include: [
        { model: User, as: 'patient', attributes: ['name', 'mobile', 'membershipId'] },
        { model: Service, as: 'service', attributes: ['name', 'category', 'basePrice'] },
        { model: Dependent, as: 'dependent', attributes: ['name', 'relation'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoiceNumber', 'originalAmount', 'discountPercent', 'discountAmount', 'finalAmount', 'commissionPercent', 'commissionAmount', 'paymentStatus', 'paidAt', 'transactionRef'] },
      ],
      order: [['createdAt', 'DESC']], limit: 50,
    });
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
