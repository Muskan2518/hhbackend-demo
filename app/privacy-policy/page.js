'use client';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const sections = [
  {
    icon: '📋',
    title: 'What We Collect',
    items: [
      'Name, email, phone number & date of birth',
      'Family member details when added as dependents',
      'Payment info processed securely via Razorpay (we never store card details)',
      'Visit records, OTP logs & billing history',
    ],
  },
  {
    icon: '🔧',
    title: 'How We Use It',
    items: [
      'Manage your membership & digital card',
      'Process payments & verify visits via OTP',
      'Track your savings & send important notifications',
      'Improve our app through analytics',
    ],
  },
  {
    icon: '🤝',
    title: 'Who We Share With',
    items: [
      'Partnered hospitals — to verify membership & apply discounts',
      'Razorpay — to process secure payments',
      'Law enforcement — only when legally required',
    ],
  },
  {
    icon: '🔒',
    title: 'How We Protect It',
    items: [
      'SSL/TLS encryption on all data transfers',
      'OTP-based verification for every visit',
      'PCI-DSS compliant payment processing',
      'Restricted access to authorized personnel only',
    ],
  },
  {
    icon: '⚖️',
    title: 'Your Rights',
    items: [
      'Access — Request a copy of your data anytime',
      'Correction — Update your info via the app',
      'Deletion — Delete your account & data within 30 days',
      'Opt-out — Turn off promotional notifications',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-brand-green overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/70 text-lg">Simple, transparent, and honest.</p>
          <p className="text-white/40 text-sm mt-3">Last updated: April 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 -mt-8 relative z-10 mb-8">
            <p className="text-gray-600 leading-relaxed">
              HH Patients Care is committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we keep it safe — in plain, simple language.
            </p>
          </div>
        </ScrollReveal>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="text-lg font-bold text-dark">{section.title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                      <svg className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}

          {/* Extra info */}
          <ScrollReveal animation="fade-up" delay={sections.length * 100}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <span className="text-2xl">🍪</span>
                <h3 className="font-bold text-dark mt-2 mb-1">Cookies</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Our website uses minimal cookies for analytics. You can manage them in your browser settings.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <h3 className="font-bold text-dark mt-2 mb-1">Children&apos;s Privacy</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We don&apos;t collect data from children under 13. Dependents must be added by a parent or guardian.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal animation="fade-up" delay={(sections.length + 1) * 100}>
            <div className="bg-gradient-to-br from-primary to-brand-green rounded-2xl p-6 md:p-8 text-white">
              <h2 className="text-lg font-bold mb-2">Have Questions?</h2>
              <p className="text-white/80 text-sm mb-5">Reach out to us anytime — we&apos;re happy to help.</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:hhpatientscare@gmail.com"
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/25 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hhpatientscare@gmail.com
                </a>
                <a
                  href="https://wa.me/917330677156?text=Hi%2C%20I%20have%20a%20question%20about%20privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-white/25 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  +91 73306 77156
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Back to home */}
        <ScrollReveal animation="fade-up" delay={(sections.length + 2) * 100}>
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-brand-green text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
