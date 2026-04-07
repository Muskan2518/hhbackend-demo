import { NextResponse } from 'next/server';
const { User } = require('@/lib/models');

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email || !email.trim()) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
    const user = await User.findOne({ where: { email: email.trim() }, attributes: ['id', 'isEnrolled'] });
    if (user && user.isEnrolled) {
      return NextResponse.json({ exists: true });
    }
    return NextResponse.json({ exists: false });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
