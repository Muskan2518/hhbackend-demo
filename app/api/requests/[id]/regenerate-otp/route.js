import { NextResponse } from 'next/server';
const crypto = require('crypto');
const { authenticate } = require('@/lib/auth');
const { ServiceRequest } = require('@/lib/models');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();
const OTP_EXPIRY_DAYS = 7;

export async function POST(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const serviceRequest = await ServiceRequest.findOne({ where: { id, patientId: authUser.id } });
    if (!serviceRequest) return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    if (serviceRequest.otpUsed) return NextResponse.json({ message: 'OTP already verified. Cannot regenerate.' }, { status: 400 });
    if (serviceRequest.status === 'completed' || serviceRequest.status === 'cancelled') return NextResponse.json({ message: 'Cannot regenerate OTP for this request.' }, { status: 400 });
    const otp = generateOtp();
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + OTP_EXPIRY_DAYS);
    await serviceRequest.update({ visitOtp: otp, otpGeneratedAt: now, otpExpiresAt: expiresAt, otpAttempts: 0 });
    const updated = await ServiceRequest.findByPk(serviceRequest.id);
    return NextResponse.json({ message: 'OTP regenerated successfully', request: updated });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
