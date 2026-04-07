import { NextResponse } from 'next/server';
const { authenticate, authorize } = require('@/lib/auth');
const { User, Provider, Service } = require('@/lib/models');

export async function POST(request) {
  try {
    const authUser = authenticate(request);
    if (!authUser) return NextResponse.json({ message: 'No token, access denied' }, { status: 401 });
    if (!authorize(authUser, 'admin')) return NextResponse.json({ message: 'Access denied. Insufficient permissions.' }, { status: 403 });

    const { name, mobile, email, businessName, category, contactPerson, phone, providerEmail,
      address, city, licenseNumber, description, services, discountPercent, profitPercent, discountRate, commissionRate } = await request.json();

    if (!name || !mobile || !businessName || !category) {
      return NextResponse.json({ message: 'Name, mobile, business name, and category are required' }, { status: 400 });
    }
    if (email) {
      const emailExists = await User.findOne({ where: { email: email.trim() } });
      if (emailExists && emailExists.mobile !== mobile) {
        return NextResponse.json({ message: 'Email already registered with another account' }, { status: 400 });
      }
    }
    let user = await User.findOne({ where: { mobile } });
    if (user) {
      await user.update({ name, email, role: 'provider', membershipId: user.membershipId || ('HH' + Date.now().toString().slice(-8)), isEnrolled: true });
    } else {
      user = await User.create({ name, mobile, email, role: 'provider', membershipId: 'HH' + Date.now().toString().slice(-8), isEnrolled: true });
    }

    const finalDiscount = parseFloat(discountPercent) || parseFloat(discountRate) || 0;
    const finalCommission = parseFloat(profitPercent) || parseFloat(commissionRate) || 0;

    let provider = await Provider.findOne({ where: { userId: user.id } });
    if (provider) {
      await provider.update({
        businessName, category, contactPerson: contactPerson || name, phone: phone || mobile,
        email: providerEmail || email, address, city, licenseNumber, description,
        discountPercent: finalDiscount, commissionPercent: finalCommission,
      });
    } else {
      provider = await Provider.create({
        userId: user.id, businessName, category, contactPerson: contactPerson || name,
        phone: phone || mobile, email: providerEmail || email, address, city, licenseNumber, description,
        discountPercent: finalDiscount, commissionPercent: finalCommission, status: 'verified',
      });
    }
    if (services && Array.isArray(services) && services.length > 0) {
      for (const svc of services) {
        if (svc.name && svc.basePrice) {
          await Service.create({
            providerId: provider.id, name: svc.name, description: svc.description || '',
            category: svc.category || 'consultation', basePrice: parseFloat(svc.basePrice),
          });
        }
      }
    }
    return NextResponse.json({
      success: true, message: 'Provider created successfully', provider,
      user: { id: user.id, name: user.name, mobile: user.mobile, email: user.email, membershipId: user.membershipId },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
