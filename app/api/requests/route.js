import { NextResponse } from 'next/server';
const crypto = require('crypto');
const { authenticate } = require('@/lib/auth');
const { ServiceRequest } = require('@/lib/models');

const generateOtp = () => crypto.randomInt(100000, 999999).toString();
const OTP_EXPIRY_DAYS = 7;

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { providerId, serviceId, dependentId, forWhom, notes } = await request.json();
    const otp = generateOtp();
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + OTP_EXPIRY_DAYS);
    const serviceRequest = await ServiceRequest.create({
      patientId: authUser.id, providerId, serviceId, dependentId,
      forWhom: forWhom || 'Self', notes, visitOtp: otp, otpGeneratedAt: now, otpExpiresAt: expiresAt,
    });
    return NextResponse.json({ request: serviceRequest }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
