'use client';
import ScrollReveal from './ScrollReveal';

const values = [
  {
    title: 'Affordable Healthcare',
    description: 'We believe quality healthcare should be accessible to everyone, regardless of their financial situation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Transparency',
    description: 'Every discount, every transaction, and every visit is tracked and verified through our OTP system.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Family First',
    description: 'Our membership covers up to 4 family members because we know health is a family matter.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Trusted Network',
    description: 'We partner only with verified hospitals, clinics, and diagnostic centers to ensure quality care.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="py-20 bg-gradient-to-b from-white via-gray-light to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Who We <span className="animate-gradient-text">Are</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Helping Hands Patient Care is on a mission to make healthcare affordable and accessible for every family in India.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission Section */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-brand-green rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Our Mission
                </h3>
                <p className="text-gray-500 leading-relaxed mb-4">
                  We started HH Patients Care with a simple belief: no one should have to choose between their health and their savings. Healthcare costs in India continue to rise, and many families struggle to afford quality medical care.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Through our network of partnered hospitals and diagnostic centers, we provide exclusive discounts that make a real difference. Our digital membership card makes it easy to access savings anytime, anywhere.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">500+</p>
                  <p className="text-gray-500 text-sm font-medium">Healthcare Partners</p>
                </div>
                <div className="bg-gradient-to-br from-brand-green/5 to-brand-green/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-brand-green mb-1">30%</p>
                  <p className="text-gray-500 text-sm font-medium">Max Discounts</p>
                </div>
                <div className="bg-gradient-to-br from-brand-teal/5 to-brand-teal/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-brand-teal mb-1">4</p>
                  <p className="text-gray-500 text-sm font-medium">Members Per Card</p>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-brand-green/10 rounded-2xl p-6 text-center">
                  <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                  <p className="text-gray-500 text-sm font-medium">Digital Access</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-brand-green rounded-xl flex items-center justify-center text-white mb-4">
                  {value.icon}
                </div>
                <h4 className="text-dark font-bold text-lg mb-2">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
