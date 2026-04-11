'use client';

const items = [
  '500+ Healthcare Providers',
  'Up to 30% Discounts',
  'OTP Verified Visits',
  'Digital Membership Card',
  'Family Coverage (4 Members)',
  'Secure Razorpay Payments',
  'Track Your Savings',
  'Partnered Hospitals & Labs',
];

export default function TrustBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-gradient-to-r from-primary to-brand-green py-3 overflow-hidden relative">
      <div className="animate-scroll-left flex whitespace-nowrap gap-8">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-white/90 text-sm font-medium px-4">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
