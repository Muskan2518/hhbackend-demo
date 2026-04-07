import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Provider, Service, User } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const providers = await Provider.findAll({ include: [{ model: User, as: 'user', attributes: ['name', 'mobile', 'email'] }, { model: Service, as: 'services' }], order: [['createdAt', 'DESC']] });
    return NextResponse.json({ providers });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
