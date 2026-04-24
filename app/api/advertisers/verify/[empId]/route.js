import { NextResponse } from 'next/server';
const { Advertiser } = require('@/lib/models');

export async function GET(_request, { params }) {
  try {
    const { empId } = await params;
    const advertiser = await Advertiser.findOne({
      where: { empId: empId.trim(), isActive: true },
      attributes: ['id', 'empId', 'name'],
    });
    if (!advertiser) {
      return NextResponse.json({ valid: false, message: 'Advertiser not found' }, { status: 404 });
    }
    return NextResponse.json({ valid: true, advertiser });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
