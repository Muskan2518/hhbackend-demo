'use client';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const steps = [
  {
    step: '01',
    title: 'Open the App',
    description: 'Launch the HH Patients Care app on your mobile device and make sure you are logged in.',
  },
  {
    step: '02',
    title: 'Go to Profile',
    description: 'Tap the Profile icon at the bottom navigation bar or the top-right corner of the home screen.',
  },
  {
    step: '03',
    title: 'Open Account Settings',
    description: 'Scroll down to find "Account Settings" or tap the settings gear icon on your profile page.',
  },
  {
    step: '04',
    title: 'Select Delete Account',
    description: 'Tap "Delete Account" at the bottom of the settings list. You will be asked to confirm your identity via OTP.',
  },
  {
    step: '05',
    title: 'Confirm Deletion',
    description: 'Enter the OTP sent to your registered mobile number and confirm. Your account will be permanently deleted within 30 days.',
  },
];

const deletedData = [
  'Personal profile — name, email, phone number, date of birth',
  'Membership card and all associated subscription data',
  'Family member / dependent records',
  'Visit history and OTP verification logs',
  'Saved payment methods and billing history',
  'Notifications and communication preferences',
];

const retainedData = [
  'Transaction records required by tax or financial regulations (up to 7 years)',
  'Anonymised, aggregated usage data that cannot identify you',
  'Data we are legally obligated to retain under applicable law',
];

export default function DeleteAccount() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-primary overflow-hidden">
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

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Delete Your Account</h1>
          <p className="text-white/70 text-lg">We&apos;re sorry to see you go. Here&apos;s how to delete your account.</p>
          <p className="text-white/40 text-sm mt-3">Last updated: April 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Warning card */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 md:p-8 -mt-8 relative z-10 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-dark mb-1">This action is permanent</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Deleting your account will permanently remove all your personal data, membership, and history from HH Patients Care. This cannot be undone. If you have an active membership, it will be cancelled and no refund will be issued for the remaining period.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-5">
            <h2 className="text-lg font-bold text-dark mb-6">How to Delete Your Account</h2>
            <div className="space-y-6">
              {steps.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-brand-green rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What gets deleted */}
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🗑️</span>
                <h2 className="text-base font-bold text-dark">What Will Be Deleted</h2>
              </div>
              <ul className="space-y-2.5">
                {deletedData.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                    <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📁</span>
                <h2 className="text-base font-bold text-dark">What May Be Retained</h2>
              </div>
              <p className="text-gray-500 text-xs mb-3 leading-relaxed">
                Certain data may be kept as required by law or regulation:
              </p>
              <ul className="space-y-2.5">
                {retainedData.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm leading-relaxed">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Manual request */}
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📩</span>
              <h2 className="text-base font-bold text-dark">Can&apos;t Access the App?</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              If you are unable to delete your account through the app, contact us directly and we will process the deletion within 30 days.
            </p>
            <Link
              href="/#contact-us"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-brand-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Deletion Request Email
            </Link>
          </div>
        </ScrollReveal>

        {/* Related links */}
        <ScrollReveal animation="fade-up" delay={500}>
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/data-deletion-policy" className="inline-flex items-center gap-2 text-sm text-primary font-medium border border-primary/20 bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors">
              Data Deletion Policy
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
        <ScrollReveal animation="fade-up" delay={600}>
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
