'use client';
import ScrollReveal from './ScrollReveal';
import LottiePlayer from './LottiePlayer';

const features = [
  {
    lottie: '/animations/IncreasingCoin.json',
    title: 'Exclusive Discounts',
    description: 'Get up to 30% off on consultations, lab tests, diagnostics, and treatments at all partnered healthcare providers.',
    color: 'bg-green-50',
  },
  {
    lottie: '/animations/card.json',
    title: 'Digital Membership Card',
    description: 'Carry your membership digitally. Show your unique membership ID at any partnered provider to avail instant discounts.',
    color: 'bg-blue-50',
  },
  {
    lottie: '/animations/SearchDoctor.json',
    title: 'Family Coverage',
    description: 'Add up to 3 dependents (spouse, children, parents) under one membership. Up to 4 family members covered with a single plan.',
    color: 'bg-purple-50',
  },
  {
    lottie: '/animations/HospitalPreloaded.json',
    title: 'Partnered Hospitals & Labs',
    description: 'Access a wide network of trusted hospitals, clinics, and diagnostic centers. Browse providers, check ratings, and view available services.',
    color: 'bg-orange-50',
  },
  {
    lottie: '/animations/RequestChecklist.json',
    title: 'OTP Verified Visits',
    description: 'Secure OTP-based verification for every visit. Your visit is confirmed with a unique code ensuring transparent and safe transactions.',
    color: 'bg-teal-50',
  },
  {
    lottie: '/animations/BarGraph.json',
    title: 'Track Your Savings',
    description: 'View your total savings, request history, invoices, and discounts applied — all in one clean dashboard.',
    color: 'bg-pink-50',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal animation="zoom-in">
            <div className="flex justify-center mb-4">
              <img src="/images/logo_icon.png" alt="HH Patients Care" className="h-16 w-auto" />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Everything You Need to Save on Healthcare
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              HH Patients Care is designed to make healthcare affordable for everyone.
              Here&apos;s what makes our app stand out.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} animation="flip-up" delay={index * 120}>
              <div className="group p-6 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover-lift h-full">
                <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 overflow-hidden`}>
                  <LottiePlayer src={feature.lottie} className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
