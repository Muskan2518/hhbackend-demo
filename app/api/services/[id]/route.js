import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Service } = require('@/lib/models');

export async function PUT(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const service = await Service.findByPk(id);
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    const body = await request.json();
    await service.update(body);
    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const service = await Service.findByPk(id);
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    await service.update({ isActive: false });
    return NextResponse.json({ message: 'Service removed' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
