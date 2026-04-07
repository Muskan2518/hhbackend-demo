import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider } = require('@/lib/models');

export async function PUT(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const { status } = await request.json();
    const provider = await Provider.findByPk(id);
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    await provider.update({ status });
    return NextResponse.json({ provider, message: `Provider ${status}` });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
