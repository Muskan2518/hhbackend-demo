import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { User, Dependent } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const members = await User.findAll({ where: { role: 'patient' }, include: [{ model: Dependent, as: 'dependents' }], order: [['createdAt', 'DESC']], limit: 100 });
    return NextResponse.json({ members });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
