import { NextResponse } from 'next/server';
const { Advertiser } = require('@/lib/models');

export async function GET() {
  try {
    const advertisers = await Advertiser.findAll({
      where: { isActive: true },
      attributes: ['id', 'empId', 'name'],
      order: [['name', 'ASC']],
    });
    return NextResponse.json({ advertisers });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
