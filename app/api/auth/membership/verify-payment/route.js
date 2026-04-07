import { NextResponse } from 'next/server';
const crypto = require('crypto');
const { authenticate } = require('@/lib/auth');
const { User, Dependent } = require('@/lib/models');

const generateMembershipId = () => 'HH' + Date.now().toString().slice(-8);

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan } = await request.json();
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json({ message: 'Missing payment verification fields' }, { status: 400 });
    }
    if (!plan || !['1year', '5year'].includes(plan)) {
      return NextResponse.json({ message: 'Invalid plan.' }, { status: 400 });
    }
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ message: 'Payment verification failed. Invalid signature.' }, { status: 400 });
    }
    const user = await User.findByPk(authUser.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

    const now = new Date();
    const expiresAt = new Date(now);
    if (plan === '1year') expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    else expiresAt.setFullYear(expiresAt.getFullYear() + 5);

    await user.update({
      membershipId: user.membershipId || generateMembershipId(),
      hasMembershipCard: true, membershipPlan: plan,
      membershipExpiresAt: expiresAt, membershipActivatedAt: now,
    });
    const userData = await User.findByPk(user.id, { include: [{ model: Dependent, as: 'dependents' }] });
    return NextResponse.json({
      success: true,
      message: `Membership card activated for ${plan === '1year' ? '1 Year' : '5 Years'}`,
      user: userData.toJSON(), transactionRef: razorpay_payment_id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
