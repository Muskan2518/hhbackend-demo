import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Invoice, ServiceRequest, User, Provider, Service } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const provider = await Provider.findOne({ where: { userId: authUser.id } });
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    const invoices = await Invoice.findAll({
      where: { providerId: provider.id },
      include: [
        { model: User, as: 'patient', attributes: ['name', 'mobile', 'membershipId'] },
        { model: ServiceRequest, as: 'request', attributes: ['id', 'status', 'forWhom'], include: [{ model: Service, as: 'service', attributes: ['name', 'category'] }] },
      ],
      order: [['createdAt', 'DESC']], limit: 50,
    });
    return NextResponse.json({ invoices });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
