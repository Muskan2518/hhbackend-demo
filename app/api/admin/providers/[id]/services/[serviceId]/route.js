import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Service } = require('@/lib/models');

export async function DELETE(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id, serviceId } = await params;
    const service = await Service.findOne({ where: { id: serviceId, providerId: id } });
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    await service.update({ isActive: false });
    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
