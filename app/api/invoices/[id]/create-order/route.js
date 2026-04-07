import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Invoice } = require('@/lib/models');
const { getRazorpay } = require('@/lib/razorpay');

export async function POST(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    if (invoice.paymentStatus === 'paid') return NextResponse.json({ message: 'Invoice already paid' }, { status: 400 });
    const amountInPaise = Math.round(parseFloat(invoice.finalAmount) * 100);
    const order = await getRazorpay().orders.create({ amount: amountInPaise, currency: 'INR', receipt: invoice.invoiceNumber, notes: { invoiceId: invoice.id.toString(), patientId: invoice.patientId.toString() } });
    await invoice.update({ razorpayOrderId: order.id });
    return NextResponse.json({ orderId: order.id, amount: amountInPaise, currency: 'INR', keyId: process.env.RAZORPAY_KEY_ID, invoiceNumber: invoice.invoiceNumber });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
