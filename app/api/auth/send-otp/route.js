import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { mobile } = await request.json();
    if (!mobile || mobile.length < 10) {
      return NextResponse.json({ message: 'Valid mobile number required' }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
