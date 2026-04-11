'use client';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Download & Sign Up',
    description: 'Download HH Patients Care from the Google Play Store. Sign up with your mobile number and verify with OTP.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Choose a Membership Plan',
    description: 'Select from our affordable plans — 1 Year at just Rs.499 or 5 Years at Rs.999 (Best Value). Pay securely via Razorpay.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Your Digital Card',
    description: 'Receive your digital membership card instantly with a unique ID. Add family members as dependents to share the benefits.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Browse & Request Services',
    description: 'Browse partnered hospitals and diagnostic centers. Select a service and send a request. The provider confirms and you get a visit OTP.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Visit & Show OTP',
    description: 'Visit the provider and show your 4-digit OTP for verification. The discount is automatically applied to your bill.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '06',
    title: 'Save & Track',
    description: 'View your detailed invoice with original vs. discounted price. Track all your savings, bills, and request history in the app.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Getting started with HH Patients Care is quick and easy. Start saving on healthcare in just a few minutes.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 150}>
              <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover-lift h-full">
                {/* Step number */}
                <div className="absolute -top-4 left-6 bg-gradient-to-r from-primary to-brand-green text-white text-sm font-bold px-3 py-1 rounded-full">
                  Step {step.number}
                </div>

                <div className="mt-4 mb-4 text-primary">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-dark mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector arrow for non-last items on large screens */}
                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-primary/30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
