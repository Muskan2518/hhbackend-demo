import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Advertiser, User, sequelize } = require('@/lib/models');
const { sendMail, advertiserWelcomeEmail } = require('@/lib/utils/mailer');

function formatEmpId(n) {
  return 'HHCARE' + String(n).padStart(6, '0');
}

async function generateEmpId() {
  const last = await Advertiser.findOne({ order: [['id', 'DESC']] });
  const next = last ? last.id + 1 : 1;
  return formatEmpId(next);
}

export async function GET(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const advertisers = await Advertiser.findAll({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('referredUsers.id')), 'referredCount'],
        ],
      },
      include: [{ model: User, as: 'referredUsers', attributes: [] }],
      group: ['Advertiser.id'],
      order: [['createdAt', 'DESC']],
      subQuery: false,
    });

    return NextResponse.json({ advertisers });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const { name, email, phone } = await request.json();
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json({ message: 'Name, email and phone are required' }, { status: 400 });
    }

    const existing = await Advertiser.findOne({ where: { email: email.trim() } });
    if (existing) {
      return NextResponse.json({ message: 'An advertiser with this email already exists' }, { status: 409 });
    }

    const empId = await generateEmpId();
    const advertiser = await Advertiser.create({
      empId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });

    let emailStatus = { delivered: false };
    try {
      const msg = advertiserWelcomeEmail({
        name: advertiser.name,
        empId: advertiser.empId,
        email: advertiser.email,
        phone: advertiser.phone,
      });
      emailStatus = await sendMail({ to: advertiser.email, ...msg });
    } catch (mailErr) {
      console.error('[advertisers] email send failed:', mailErr.message);
    }

    return NextResponse.json({ success: true, advertiser, emailStatus }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
