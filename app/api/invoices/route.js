import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { Invoice, ServiceRequest, User, Provider } = require('@/lib/models');

const generateInvoiceNumber = () => { const year = new Date().getFullYear(); const rand = Math.floor(1000 + Math.random() * 9000); return `INV-${year}-${rand}`; };

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'provider')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });
    const { requestId, originalAmount } = await request.json();
    const serviceRequest = await ServiceRequest.findByPk(requestId);
    if (!serviceRequest) return NextResponse.json({ message: 'Request not found' }, { status: 404 });
    if (serviceRequest.visitOtp && !serviceRequest.otpUsed) {
      return NextResponse.json({ message: 'Visit OTP must be verified before generating a bill. Ask the patient for their 6-digit visit code.', requiresOtp: true }, { status: 403 });
    }
    const patient = await User.findByPk(serviceRequest.patientId);
    const hasActiveMembership = patient?.hasMembershipCard && patient?.membershipExpiresAt && new Date(patient.membershipExpiresAt) > new Date();
    const provider = await Provider.findByPk(serviceRequest.providerId);
    const discountPercent = hasActiveMembership ? (provider?.discountPercent ?? 0) : 0;
    const commissionPercent = hasActiveMembership ? (provider?.commissionPercent ?? 0) : 0;
    const discountAmount = Math.round((originalAmount * discountPercent) / 100);
    const finalAmount = originalAmount - discountAmount;
    const commissionAmount = Math.round((originalAmount * commissionPercent) / 100);
    const invoice = await Invoice.create({ invoiceNumber: generateInvoiceNumber(), requestId, patientId: serviceRequest.patientId, providerId: serviceRequest.providerId, originalAmount, discountPercent, discountAmount, finalAmount, commissionPercent, commissionAmount, paymentStatus: 'paid', paidAt: new Date() });
    await serviceRequest.update({ status: 'completed' });
    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
