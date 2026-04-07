import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');
const { User, Dependent } = require('@/lib/models');

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

export async function POST(request) {
  try {
    const { mobile, otp } = await request.json();
    const user = await User.findOne({
      where: { mobile },
      include: [{ model: Dependent, as: 'dependents' }],
    });
    if (user && user.isEnrolled) {
      const token = generateToken(user.id, user.role);
      return NextResponse.json({ success: true, isEnrolled: true, user: { ...user.toJSON(), token } });
    }
    return NextResponse.json({ success: true, isEnrolled: false, mobile });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
