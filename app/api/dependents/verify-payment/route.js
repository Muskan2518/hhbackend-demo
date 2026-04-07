import { NextResponse } from 'next/server';
const crypto = require('crypto');
const { authenticate } = require('@/lib/auth');
const { Dependent, User } = require('@/lib/models');

const MAX_DEPENDENTS = 3;
const isMembershipActive = (user) => user.hasMembershipCard && user.membershipExpiresAt && new Date(user.membershipExpiresAt) > new Date();

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, name, age, gender, relation } = await request.json();
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) return NextResponse.json({ message: 'Missing payment verification fields' }, { status: 400 });
    if (!name || !relation) return NextResponse.json({ message: 'Dependent name and relation are required' }, { status: 400 });
    const user = await User.findByPk(authUser.id);
    if (!user || !isMembershipActive(user)) return NextResponse.json({ message: 'Active membership required' }, { status: 400 });
    const count = await Dependent.count({ where: { userId: authUser.id } });
    if (count >= MAX_DEPENDENTS) return NextResponse.json({ message: `Maximum ${MAX_DEPENDENTS} dependents already added` }, { status: 400 });
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (expectedSignature !== razorpay_signature) return NextResponse.json({ message: 'Payment verification failed. Invalid signature.' }, { status: 400 });
    const dependent = await Dependent.create({ userId: authUser.id, name, age, gender, relation });
    return NextResponse.json({ success: true, message: 'Payment verified. Dependent added successfully!', dependent, transactionRef: razorpay_payment_id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
