import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider, Service } = require('@/lib/models');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const where = { status: 'verified' };
    if (category && category !== 'all') where.category = category;
    const providers = await Provider.findAll({ where, include: [{ model: Service, as: 'services', where: { isActive: true }, required: false }], order: [['rating', 'DESC']] });
    return NextResponse.json({ providers });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { businessName, category, contactPerson, phone, email, address, city, licenseNumber, description } = await request.json();
    let provider = await Provider.findOne({ where: { userId: authUser.id } });
    if (provider) {
      await provider.update({ businessName, category, contactPerson, phone, email, address, city, licenseNumber, description });
    } else {
      provider = await Provider.create({ userId: authUser.id, businessName, category, contactPerson, phone, email, address, city, licenseNumber, description });
    }
    return NextResponse.json({ provider });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
