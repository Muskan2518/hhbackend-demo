import { NextResponse } from 'next/server';
const crypto = require('crypto');
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
const isMembershipActive = (user) => {
  if (!user.hasMembershipCard) return false;
  if (!user.membershipExpiresAt) return false;
  return new Date(user.membershipExpiresAt) > new Date();
};
const getMembershipAmount = (plan) => plan === '5year' ? 1000 : 500;

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const dependents = await Dependent.findAll({ where: { userId: authUser.id }, order: [['createdAt', 'DESC']] });
    return NextResponse.json({ dependents });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const user = await User.findByPk(authUser.id);
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    if (!isMembershipActive(user)) return NextResponse.json({ message: 'Active membership required to add dependents.' }, { status: 400 });
    const count = await Dependent.count({ where: { userId: authUser.id } });
    if (count >= MAX_DEPENDENTS) return NextResponse.json({ message: `Maximum ${MAX_DEPENDENTS} dependents allowed (4 members including yourself)` }, { status: 400 });
    if (!isWithinFreeWindow(user)) {
      const amount = getMembershipAmount(user.membershipPlan);
      return NextResponse.json({ message: `Free window expired. Pay Rs.${amount} to add a dependent.`, requiresPayment: true, paymentAmount: amount }, { status: 402 });
    }
    const { name, age, gender, relation } = await request.json();
    if (!name || !relation) return NextResponse.json({ message: 'Name and relation are required' }, { status: 400 });
    const dependent = await Dependent.create({ userId: authUser.id, name, age, gender, relation });
    return NextResponse.json({ dependent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
