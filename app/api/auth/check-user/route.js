import { NextResponse } from 'next/server';
const { User } = require('@/lib/models');

export async function POST(request) {
  try {
    const { mobile } = await request.json();
    if (!mobile || mobile.length < 10) {
      return NextResponse.json({ message: 'Valid mobile number required' }, { status: 400 });
    }
    const user = await User.findOne({ where: { mobile }, attributes: ['id', 'isEnrolled', 'role'] });
    if (user && user.isEnrolled) {
      return NextResponse.json({ exists: true, role: user.role });
    }
    return NextResponse.json({ exists: false });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
