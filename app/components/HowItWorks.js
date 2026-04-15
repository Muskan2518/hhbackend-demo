'use client';
import ScrollReveal from './ScrollReveal';
import LottiePlayer from './LottiePlayer';

const steps = [
  {
    number: '1',
    title: 'Download & Sign Up',
    description: 'Get the app from Play Store and sign up with your mobile number.',
    lottie: '/animations/Loading.json',
    color: 'from-primary to-blue-600',
  },
  {
    number: '2',
    title: 'Choose a Plan',
    description: 'Pick a plan — ₹499/year or ₹999 for 5 years. Pay securely via Razorpay.',
    lottie: '/animations/wallet.json',
    color: 'from-brand-green to-emerald-600',
  },
  {
    number: '3',
    title: 'Visit & Save',
    description: 'Browse hospitals, show your OTP, and get instant discounts up to 30%.',
    lottie: '/animations/calender.json',
    color: 'from-brand-teal to-teal-600',
  },
  {
    number: '4',
    title: 'Track Everything',
    description: 'View invoices, savings, and manage your family from one dashboard.',
    lottie: '/animations/ManWithGraphs.json',
    color: 'from-purple-500 to-purple-700',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Start saving on healthcare in just 4 simple steps.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 120}>
              <div className="relative bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover-lift h-full border border-gray-100">
                {/* Step number */}
                <div className={`w-10 h-10 bg-gradient-to-br ${step.color} text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-5 shadow-md`}>
                  {step.number}
                </div>

                {/* Lottie animation */}
                <div className="w-24 h-24 mx-auto mb-5 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  <LottiePlayer src={step.lottie} className="w-20 h-20" />
                </div>

                <h3 className="text-lg font-bold text-dark mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

                {/* Connector arrow between cards on large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
