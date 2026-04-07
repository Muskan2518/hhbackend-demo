import { NextResponse } from 'next/server';
const crypto = require('crypto');
const { authenticate } = require('@/lib/auth');
const { Invoice, ServiceRequest } = require('@/lib/models');

export async function POST(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await request.json();
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) return NextResponse.json({ message: 'Missing payment verification fields' }, { status: 400 });
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    if (invoice.razorpayOrderId !== razorpay_order_id) return NextResponse.json({ message: 'Order ID mismatch' }, { status: 400 });
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    if (expectedSignature !== razorpay_signature) { await invoice.update({ paymentStatus: 'failed' }); return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 }); }
    await invoice.update({ paymentStatus: 'paid', transactionRef: razorpay_payment_id, paidAt: new Date() });
    await ServiceRequest.update({ status: 'completed' }, { where: { id: invoice.requestId } });
    return NextResponse.json({ invoice, message: 'Payment verified successfully', transactionRef: razorpay_payment_id });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
