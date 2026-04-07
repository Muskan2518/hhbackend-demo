import { NextResponse } from 'next/server';
const { authenticate } = require('@/lib/auth');
const { Invoice, ServiceRequest } = require('@/lib/models');

export async function PUT(request, { params }) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    const { id } = await params;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    const transactionRef = 'TXN' + Date.now().toString().slice(-10);
    await invoice.update({ paymentStatus: 'paid', transactionRef, paidAt: new Date() });
    await ServiceRequest.update({ status: 'completed' }, { where: { id: invoice.requestId } });
    return NextResponse.json({ invoice, message: 'Payment successful', transactionRef });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
