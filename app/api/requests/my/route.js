import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { ServiceRequest, Invoice, Provider, Service, Dependent } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const requests = await ServiceRequest.findAll({
      where: { patientId: authUser.id },
      include: [
        { model: Provider, as: 'provider', attributes: ['businessName', 'category', 'city', 'discountPercent', 'commissionPercent'] },
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
