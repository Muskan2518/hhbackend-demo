import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { User, Dependent } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });

    const user = await User.findByPk(authUser.id, { include: [{ model: Dependent, as: 'dependents' }] });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
