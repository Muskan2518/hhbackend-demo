'use client';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const deletionScope = [
  {
    icon: '👤',
    title: 'Account & Profile Data',
    items: [
      'Full name, email address, and phone number',
      'Date of birth and profile photo',
      'Login credentials and authentication tokens',
      'App preferences and notification settings',
    ],
  },
  {
    icon: '💳',
    title: 'Membership & Subscription Data',
    items: [
      'Active and expired membership records',
      'Digital membership card details',
      'Subscription plan history and renewal logs',
      'Family member and dependent profiles linked to the account',
    ],
  },
  {
    icon: '🏥',
    title: 'Usage & Activity Data',
    items: [
      'Hospital and diagnostic centre visit records',
      'OTP verification logs',
      'Discount redemption history',
      'In-app activity and session logs',
    ],
  },
  {
    icon: '💰',
    title: 'Payment Data',
    items: [
      'Saved payment methods (processed by Razorpay — we hold no card details)',
      'Payment reference IDs linked to your profile',
      'Billing and invoice history stored in our system',
    ],
  },
];

const timeline = [
  {
    phase: 'Immediate',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    description: 'Your account is deactivated the moment deletion is confirmed. You will be logged out of all devices and unable to use membership benefits.',
  },
  {
    phase: 'Within 7 Days',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    description: 'Personal profile data, membership card, and dependent records are removed from our active databases.',
  },
  {
    phase: 'Within 30 Days',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    description: 'All remaining personal data including usage logs, activity history, and communications are permanently purged from all systems including backups.',
  },
  {
    phase: 'Up to 7 Years',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    description: 'Certain financial transaction records may be retained in anonymised form as required by Indian financial regulations (GST, Income Tax Act). This data cannot identify you personally.',
  },
];

export default function DataDeletionPolicy() {
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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Data Deletion Policy</h1>
          <p className="text-white/70 text-lg">Clear and transparent — what happens to your data when you leave.</p>
          <p className="text-white/40 text-sm mt-3">Last updated: April 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 -mt-8 relative z-10 mb-8">
            <p className="text-gray-600 leading-relaxed">
              At HH Patients Care, you have the right to request the deletion of your personal data at any time. This policy explains exactly what data we delete, what we are legally required to retain, and the timeline for each. We do not sell your data to third parties.
            </p>
          </div>
        </ScrollReveal>

        {/* How to request */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📋</span>
              <h2 className="text-lg font-bold text-dark">How to Request Data Deletion</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              You can submit a data deletion request in two ways:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-dark text-sm mb-1">Via the App</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Go to <span className="font-medium text-primary">Profile → Account Settings → Delete Account</span>. Verify with your OTP to confirm.
                </p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="font-semibold text-dark text-sm mb-1">Via Email</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  Send your registered phone number and deletion request to:
                </p>
                <a
                  href="mailto:hhpatientscare@gmail.com?subject=Data%20Deletion%20Request&body=Hello%2C%0A%0AI%20request%20the%20permanent%20deletion%20of%20all%20my%20personal%20data%20from%20HH%20Patients%20Care.%0A%0ARegistered%20Phone%20Number%3A%20%5Byour%20number%5D%0A%0AThank%20you."
                  className="text-primary text-sm font-medium hover:underline"
                >
                  hhpatientscare@gmail.com
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Deletion timeline */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⏱️</span>
              <h2 className="text-lg font-bold text-dark">Deletion Timeline</h2>
            </div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className={`rounded-xl border ${item.border} ${item.bg} p-4`}>
                  <p className={`font-bold text-sm mb-1 ${item.color}`}>{item.phase}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What gets deleted */}
        <div className="space-y-5 mb-5">
          {deletionScope.map((section, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={(index + 3) * 100}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h2 className="text-base font-bold text-dark">{section.title}</h2>
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
        </div>

        {/* Third-party data */}
        <ScrollReveal animation="fade-up" delay={700}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔗</span>
              <h2 className="text-base font-bold text-dark">Third-Party Data Processors</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              We use Razorpay for payment processing. Upon account deletion we will request Razorpay to remove any data associated with your account that is within their control. However, Razorpay may retain certain records as required by RBI and financial regulations.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Partner hospitals are notified of your membership cancellation, but their own records are governed by their respective privacy policies.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal animation="fade-up" delay={800}>
          <div className="bg-gradient-to-br from-primary to-brand-green rounded-2xl p-6 md:p-8 text-white mb-5">
            <h2 className="text-lg font-bold mb-2">Questions About Your Data?</h2>
            <p className="text-white/80 text-sm mb-5">
              For any data-related queries, deletion status updates, or to exercise any of your privacy rights, reach out to us directly.
            </p>
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
                href="https://wa.me/917330677156?text=Hi%2C%20I%20have%20a%20question%20about%20my%20data%20deletion"
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

        {/* Related links */}
        <ScrollReveal animation="fade-up" delay={900}>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/delete-account" className="inline-flex items-center gap-2 text-sm text-red-600 font-medium border border-red-200 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
              Delete Account
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/privacy-policy" className="inline-flex items-center gap-2 text-sm text-gray-500 font-medium border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              Privacy Policy
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* Back to home */}
        <ScrollReveal animation="fade-up" delay={1000}>
          <div className="text-center mt-4">
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
