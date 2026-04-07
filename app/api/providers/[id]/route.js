import { NextResponse } from 'next/server';
const { Provider, Service } = require('@/lib/models');

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const provider = await Provider.findByPk(id, { include: [{ model: Service, as: 'services', where: { isActive: true }, required: false }] });
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    return NextResponse.json({ provider });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
