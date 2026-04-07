import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { ServiceRequest } = require('@/lib/models');

export async function PUT(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const { status } = await request.json();
    const serviceRequest = await ServiceRequest.findByPk(id);
    if (!serviceRequest) return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    await serviceRequest.update({ status });
    return NextResponse.json({ request: serviceRequest, message: `Request ${status}` });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
