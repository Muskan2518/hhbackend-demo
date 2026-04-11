'use client';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

const plans = [
  {
    name: '1 Year Plan',
    price: 499,
    period: '/year',
    badge: null,
    features: [
      'Digital Membership Card',
      'Discounts at all partnered providers',
      'Add up to 3 dependents',
      'Free dependent addition (within 6 months)',
      'OTP-verified visits',
      'Invoice & savings tracking',
      'Access to hospitals & diagnostic centers',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: '5 Year Plan',
    price: 999,
    period: '/5 years',
    badge: 'Best Value',
    features: [
      'Everything in 1 Year Plan',
      '5 years of uninterrupted coverage',
      'Save Rs.1,496 compared to yearly',
      'Add up to 3 dependents',
      'Free dependent addition (within 6 months)',
      'Priority support',
      'Extended family protection',
    ],
    cta: 'Get Best Value',
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/3 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Affordable Plans</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Membership Plans
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Choose the plan that works best for you and your family. Both plans give you full access to all discounts and features.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollReveal key={index} animation={index === 0 ? 'fade-left' : 'fade-right'} delay={index * 200}>
              <div
                className={`relative rounded-3xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-primary to-brand-green text-white shadow-2xl shadow-primary/30 scale-105 animate-gradient hover-glow'
                    : 'bg-white border-2 border-gray-100 hover:border-primary/20 hover-lift'
                } transition-all`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-dark text-sm font-bold px-4 py-1 rounded-full shadow-lg animate-bounce-in">
                    {plan.badge}
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-dark'}`}>
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-lg ${plan.highlighted ? 'text-white/70' : 'text-gray-400'}`}>&#8377;</span>
                  <span className={`text-5xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-dark'}`}>
                    <CountUp end={plan.price} duration={1800} />
                  </span>
                  <span className={`text-lg ${plan.highlighted ? 'text-white/70' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 group/item">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform group-hover/item:scale-125 ${plan.highlighted ? 'text-green-200' : 'text-brand-green'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm transition-colors ${plan.highlighted ? 'text-white/90 group-hover/item:text-white' : 'text-gray-600 group-hover/item:text-dark'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#download"
                  className={`ripple-container block text-center py-3.5 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                    plan.highlighted
                      ? 'bg-white text-primary hover:bg-gray-100 hover:shadow-lg'
                      : 'bg-gradient-to-r from-primary to-brand-green text-white hover:shadow-lg hover:shadow-primary/25'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Info */}
        <ScrollReveal animation="fade-in" delay={400}>
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              All plans include secure Razorpay payment processing. No hidden charges. Cancel anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
