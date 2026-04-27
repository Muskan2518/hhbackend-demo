import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { User } = require('@/lib/models');
const { getRazorpay } = require('@/lib/razorpay');

export async function POST(request) {
  try {
    const user = authenticate(request);
    if (!user) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });

    const { plan } = await request.json();
    if (!plan || !['1year', '5year'].includes(plan)) {
      return NextResponse.json({ message: 'Invalid plan. Choose 1year or 5year.' }, { status: 400 });
    }
    const dbUser = await User.findByPk(user.id);
    if (!dbUser) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const amount = plan === '1year' ? 499 : 999;
    const amountInPaise = amount * 100;
    const order = await getRazorpay().orders.create({
      amount: amountInPaise, currency: 'INR',
      receipt: `MEMB_${dbUser.id}_${Date.now()}`,
      notes: { userId: dbUser.id.toString(), plan, type: 'membership_enrollment' },
    });
    return NextResponse.json({ success: true, orderId: order.id, amount: amountInPaise, currency: 'INR', keyId: process.env.RAZORPAY_KEY_ID, plan });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
