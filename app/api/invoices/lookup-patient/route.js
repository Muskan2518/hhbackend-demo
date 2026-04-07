import { NextResponse } from 'next/server';
const { Op } = require('sequelize');
const { authenticate, authorize } = require('@/lib/auth');
const { User, Dependent } = require('@/lib/models');

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q || q.trim().length < 3) return NextResponse.json({ message: 'Enter at least 3 characters to search' }, { status: 400 });
    const patients = await User.findAll({
      where: { role: 'patient', isEnrolled: true, [Op.or]: [{ membershipId: { [Op.like]: `%${q.trim()}%` } }, { mobile: { [Op.like]: `%${q.trim()}%` } }, { name: { [Op.like]: `%${q.trim()}%` } }] },
      attributes: ['id', 'name', 'mobile', 'membershipId', 'age', 'gender', 'hasMembershipCard', 'membershipPlan', 'membershipExpiresAt'],
      include: [{ model: Dependent, as: 'dependents', attributes: ['id', 'name', 'relation', 'age'] }], limit: 10,
    });
    return NextResponse.json({ patients });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
