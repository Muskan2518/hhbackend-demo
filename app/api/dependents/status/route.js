import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Dependent, User } = require('@/lib/models');

const MAX_DEPENDENTS = 3;
const FREE_WINDOW_MONTHS = 6;
const getActivationDate = (user) => {
  if (user.membershipActivatedAt) return new Date(user.membershipActivatedAt);
  if (user.membershipExpiresAt && user.membershipPlan) {
    const expiresAt = new Date(user.membershipExpiresAt);
    if (user.membershipPlan === '1year') expiresAt.setFullYear(expiresAt.getFullYear() - 1);
    else if (user.membershipPlan === '5year') expiresAt.setFullYear(expiresAt.getFullYear() - 5);
    return expiresAt;
  }
  return user.createdAt ? new Date(user.createdAt) : null;
};
const isWithinFreeWindow = (user) => {
  const activatedAt = getActivationDate(user);
  if (!activatedAt) return false;
  const windowEnd = new Date(activatedAt);
  windowEnd.setMonth(windowEnd.getMonth() + FREE_WINDOW_MONTHS);
  return new Date() <= windowEnd;
};
const isMembershipActive = (user) => user.hasMembershipCard && user.membershipExpiresAt && new Date(user.membershipExpiresAt) > new Date();
const getMembershipAmount = (plan) => plan === '5year' ? 1000 : 500;

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const user = await User.findByPk(authUser.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    const activeMembership = isMembershipActive(user);
    const count = await Dependent.count({ where: { userId: authUser.id } });
    const remainingSlots = Math.max(0, MAX_DEPENDENTS - count);
    const freeWindow = activeMembership ? isWithinFreeWindow(user) : false;
    let freeWindowEndsAt = null;
    const activatedAt = getActivationDate(user);
    if (activatedAt) { freeWindowEndsAt = new Date(activatedAt); freeWindowEndsAt.setMonth(freeWindowEndsAt.getMonth() + FREE_WINDOW_MONTHS); }
    const paymentAmount = (!freeWindow && activeMembership) ? getMembershipAmount(user.membershipPlan) : 0;
    return NextResponse.json({ currentCount: count, maxDependents: MAX_DEPENDENTS, remainingSlots, activeMembership, canAddFree: activeMembership && freeWindow && remainingSlots > 0, requiresPayment: activeMembership && !freeWindow && remainingSlots > 0, paymentAmount, membershipPlan: user.membershipPlan, membershipActivatedAt: user.membershipActivatedAt || activatedAt, freeWindowEndsAt });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
