import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Invoice, ServiceRequest, Provider, Service } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const invoices = await Invoice.findAll({
      where: { patientId: authUser.id },
      include: [
        { model: ServiceRequest, as: 'request', attributes: ['id', 'status', 'forWhom'], include: [{ model: Service, as: 'service', attributes: ['name', 'category'] }] },
        { model: Provider, as: 'provider', attributes: ['businessName', 'category', 'address', 'city'] },
      ],
      order: [['createdAt', 'DESC']], limit: 50,
    });
    return NextResponse.json({ invoices });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
