import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Service, Provider } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const provider = await Provider.findOne({ where: { userId: authUser.id } });
    if (!provider) return NextResponse.json({ message: 'Provider profile not found' }, { status: 404 });
    const services = await Service.findAll({ where: { providerId: provider.id }, order: [['createdAt', 'DESC']] });
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
