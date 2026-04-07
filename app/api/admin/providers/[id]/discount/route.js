import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider } = require('@/lib/models');

export async function PUT(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const provider = await Provider.findByPk(id);
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    const { discountPercent, commissionPercent } = await request.json();
    if (discountPercent != null) provider.discountPercent = parseFloat(discountPercent);
    if (commissionPercent != null) provider.commissionPercent = parseFloat(commissionPercent);
    await provider.save();
    return NextResponse.json({ provider });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
