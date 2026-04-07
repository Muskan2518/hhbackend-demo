import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Dependent, User } = require('@/lib/models');
const { getRazorpay } = require('@/lib/razorpay');

const MAX_DEPENDENTS = 3;
const FREE_WINDOW_MONTHS = 6;
const getActivationDate = (user) => {
  if (user.membershipActivatedAt) return new Date(user.membershipActivatedAt);
  if (user.membershipExpiresAt && user.membershipPlan) { const e = new Date(user.membershipExpiresAt); if (user.membershipPlan === '1year') e.setFullYear(e.getFullYear() - 1); else if (user.membershipPlan === '5year') e.setFullYear(e.getFullYear() - 5); return e; }
  return user.createdAt ? new Date(user.createdAt) : null;
};
const isWithinFreeWindow = (user) => { const a = getActivationDate(user); if (!a) return false; const w = new Date(a); w.setMonth(w.getMonth() + FREE_WINDOW_MONTHS); return new Date() <= w; };
const isMembershipActive = (user) => user.hasMembershipCard && user.membershipExpiresAt && new Date(user.membershipExpiresAt) > new Date();
const getMembershipAmount = (plan) => plan === '5year' ? 1000 : 500;

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const user = await User.findByPk(authUser.id);
    if (!user || !isMembershipActive(user)) return NextResponse.json({ message: 'Active membership required' }, { status: 400 });
    const count = await Dependent.count({ where: { userId: authUser.id } });
    if (count >= MAX_DEPENDENTS) return NextResponse.json({ message: `Maximum ${MAX_DEPENDENTS} dependents already added` }, { status: 400 });
    if (isWithinFreeWindow(user)) return NextResponse.json({ message: 'You are still within the free window. Add dependents for free.' }, { status: 400 });
    const amount = getMembershipAmount(user.membershipPlan);
    const amountInPaise = amount * 100;
    const order = await getRazorpay().orders.create({ amount: amountInPaise, currency: 'INR', receipt: `DEP_${user.id}_${Date.now()}`, notes: { userId: user.id.toString(), type: 'dependent_addition', membershipPlan: user.membershipPlan } });
    return NextResponse.json({ success: true, orderId: order.id, amount: amountInPaise, currency: 'INR', keyId: process.env.RAZORPAY_KEY_ID, paymentAmount: amount });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
