import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { ServiceRequest, Invoice, User, Provider, Service } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const requests = await ServiceRequest.findAll({
      attributes: { exclude: ['visitOtp'] },
      include: [
        { model: User, as: 'patient', attributes: ['name', 'mobile', 'membershipId'] },
        { model: Provider, as: 'provider', attributes: ['businessName', 'category', 'discountPercent', 'commissionPercent'] },
        { model: Service, as: 'service', attributes: ['name', 'category', 'basePrice'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoiceNumber', 'originalAmount', 'discountPercent', 'discountAmount', 'finalAmount', 'commissionPercent', 'commissionAmount', 'paymentStatus'] },
      ],
      order: [['createdAt', 'DESC']], limit: 100,
    });
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
