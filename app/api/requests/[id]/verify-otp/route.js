import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { ServiceRequest, Provider } = require('@/lib/models');

const MAX_OTP_ATTEMPTS = 5;

export async function POST(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { id } = await params;
    const { otp } = await request.json();
    if (!otp || otp.length !== 6) return NextResponse.json({ message: 'Please enter a valid 6-digit OTP' }, { status: 400 });
    const provider = await Provider.findOne({ where: { userId: authUser.id } });
    if (!provider) return NextResponse.json({ message: 'Provider not found' }, { status: 404 });
    const serviceRequest = await ServiceRequest.findOne({ where: { id, providerId: provider.id } });
    if (!serviceRequest) return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    if (serviceRequest.otpUsed) return NextResponse.json({ message: 'OTP already verified for this request' }, { status: 400 });
    if (serviceRequest.otpAttempts >= MAX_OTP_ATTEMPTS) return NextResponse.json({ message: 'Too many failed attempts. Ask patient to regenerate OTP.' }, { status: 429 });
    if (!serviceRequest.otpExpiresAt || new Date() > new Date(serviceRequest.otpExpiresAt)) return NextResponse.json({ message: 'OTP has expired. Ask patient to regenerate OTP.' }, { status: 400 });
    if (serviceRequest.visitOtp !== otp) {
      await serviceRequest.update({ otpAttempts: (serviceRequest.otpAttempts || 0) + 1 });
      const remaining = MAX_OTP_ATTEMPTS - serviceRequest.otpAttempts;
      return NextResponse.json({ message: `Invalid OTP. ${remaining} attempt(s) remaining.` }, { status: 400 });
    }
    await serviceRequest.update({ otpUsed: true, otpVerifiedAt: new Date() });
    return NextResponse.json({ message: 'Visit verified successfully! You can now generate the bill.', verified: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
