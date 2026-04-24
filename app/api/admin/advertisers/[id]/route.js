import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Advertiser, User } = require('@/lib/models');

export async function GET(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const { id } = await params;
    const advertiser = await Advertiser.findByPk(id);
    if (!advertiser) return NextResponse.json({ message: 'Advertiser not found' }, { status: 404 });

    const users = await User.findAll({
      where: { advertiserId: id },
      attributes: ['id', 'name', 'mobile', 'email', 'age', 'gender', 'address', 'membershipPlan', 'membershipId', 'isEnrolled', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    return NextResponse.json({ advertiser, users });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
