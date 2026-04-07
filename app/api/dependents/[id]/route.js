import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Dependent } = require('@/lib/models');

export async function DELETE(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const dependent = await Dependent.findOne({ where: { id, userId: authUser.id } });
    if (!dependent) return NextResponse.json({ message: 'Dependent not found' }, { status: 404 });
    await dependent.destroy();
    return NextResponse.json({ message: 'Dependent removed' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
