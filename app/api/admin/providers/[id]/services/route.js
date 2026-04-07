import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider, Service } = require('@/lib/models');

export async function POST(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const provider = await Provider.findByPk(id);
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    const { name, description, basePrice, category } = await request.json();
    if (!name || !basePrice) return NextResponse.json({ message: 'Name and base price are required' }, { status: 400 });
    await Service.create({ providerId: provider.id, name, description: description || '', basePrice: parseFloat(basePrice) || 0, category: category || 'consultation' });
    const updatedProvider = await Provider.findByPk(provider.id, { include: [{ model: Service, as: 'services' }] });
    return NextResponse.json({ success: true, provider: updatedProvider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
