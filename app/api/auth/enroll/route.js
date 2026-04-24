import { NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');
const { User, Dependent, Advertiser } = require('@/lib/models');

const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

export async function POST(request) {
  try {
    const { name, mobile, email, age, gender, address, referenceName, referenceEmpId } = await request.json();
    if (!name || !mobile) {
      return NextResponse.json({ message: 'Name and mobile are required' }, { status: 400 });
    }
    let role = 'patient';
    if (mobile.startsWith('000')) role = 'admin';
    else if (mobile.startsWith('111')) role = 'provider';

    let advertiserId = null;
    if (role === 'patient' && referenceEmpId && referenceEmpId.trim()) {
      const advertiser = await Advertiser.findOne({ where: { empId: referenceEmpId.trim(), isActive: true } });
      if (!advertiser) {
        return NextResponse.json({ message: 'Invalid Reference EmpID. Please check and try again.' }, { status: 400 });
      }
      advertiserId = advertiser.id;
    }

    let user = await User.findOne({ where: { mobile } });
    if (user) {
      const update = { name, email, age, gender, address, isEnrolled: true };
      if (advertiserId && !user.advertiserId) update.advertiserId = advertiserId;
      await user.update(update);
    } else {
      user = await User.create({ name, mobile, email, age, gender, address, role, isEnrolled: true, advertiserId });
    }
    const token = generateToken(user.id, user.role);
    const userData = await User.findByPk(user.id, { include: [{ model: Dependent, as: 'dependents' }] });
    return NextResponse.json({ success: true, user: { ...userData.toJSON(), token } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
