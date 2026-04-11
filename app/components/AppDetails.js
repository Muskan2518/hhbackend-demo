'use client';
import ScrollReveal from './ScrollReveal';

const appDetails = [
  { label: 'App Name', value: 'HH Patients Care', icon: '📱' },
  { label: 'Category', value: 'Health & Fitness', icon: '💊' },
  { label: 'Version', value: '1.0.0', icon: '🔄' },
  { label: 'Size', value: '~25 MB', icon: '💾' },
  { label: 'Platform', value: 'Android', icon: '🤖' },
  { label: 'Requires', value: 'Android 7.0+', icon: '⚙️' },
  { label: 'Developer', value: 'HH Patients Care', icon: '👨‍💻' },
  { label: 'In-App Purchases', value: 'Membership Plans', icon: '💳' },
];

const screenshots = [
  {
    title: 'Dashboard',
    description: 'Quick overview of your requests, savings, and membership status',
    image: '/images/screenshots/dasboard.jpeg',
    gradient: 'from-primary to-primary-light',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: 'Browse Providers',
    description: 'Find hospitals and diagnostic centers with discount info',
    image: '/images/screenshots/providers.jpeg',
    gradient: 'from-blue-500 to-indigo-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Membership Card',
    description: 'Digital membership card with member ID and validity',
    image: '/images/screenshots/membership.jpeg',
    gradient: 'from-brand-teal to-brand-green',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
      </svg>
    ),
  },
  {
    title: 'My Bills',
    description: 'Track invoices, discounts applied, and total savings',
    image: '/images/screenshots/bills.jpeg',
    gradient: 'from-brand-green to-brand-green-dark',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
      </svg>
    ),
  },
];

export default function AppDetails() {
  return (
    <section id="app-details" className="py-20 bg-gradient-to-b from-gray-light via-white to-gray-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              App Overview
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Experience the App <span className="animate-gradient-text">in Action</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Take a closer look at the HH Patients Care app and what you can expect.
            </p>
          </div>
        </ScrollReveal>

        {/* App Screenshots in Phone Mockups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
          {screenshots.map((screen, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 150}>
              <div className="group flex flex-col items-center">
                {/* Phone mockup */}
                <div className="relative mb-5">
                  {/* Gradient glow behind phone */}
                  <div className={`absolute -inset-3 bg-gradient-to-br ${screen.gradient} rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                  {/* Phone frame */}
                  <div className="relative bg-dark rounded-[2rem] p-[6px] shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500 group-hover:-translate-y-2">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-dark rounded-b-xl z-10" />

                    {/* Screen */}
                    <div className="relative rounded-[1.7rem] overflow-hidden bg-white">
                      <div className="aspect-[9/17] overflow-hidden">
                        <img
                          src={screen.image}
                          alt={`${screen.title} - App Screenshot`}
                          className="w-full h-[108%] object-cover object-top -mt-[1%] group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      {/* Shimmer sweep on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full" />
                  </div>
                </div>

                {/* Label with icon */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${screen.gradient} text-white flex items-center justify-center flex-shrink-0`}>
                      {screen.icon}
                    </span>
                    <h4 className="text-dark font-bold text-sm">{screen.title}</h4>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed max-w-[180px] mx-auto">{screen.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* App Info Grid */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10 relative overflow-hidden">
            {/* Decorative corner gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />

            <h3 className="text-xl font-bold text-dark mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-brand-green rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              App Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {appDetails.map((detail, index) => (
                <div key={index} className="group/item bg-gray-light rounded-2xl p-4 hover:bg-gradient-to-br hover:from-primary/5 hover:to-brand-green/5 transition-all duration-300 hover-lift cursor-default">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{detail.icon}</span>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{detail.label}</p>
                  </div>
                  <p className="text-dark font-bold text-sm group-hover/item:text-primary transition-colors">{detail.value}</p>
                </div>
              ))}
            </div>

            {/* Permissions */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-dark mb-4 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                App Permissions
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Internet Access', icon: '🌐' },
                  { name: 'Payment Processing', icon: '💰' },
                  { name: 'Push Notifications', icon: '🔔' },
                  { name: 'Phone (OTP Verification)', icon: '📞' },
                ].map((perm, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3.5 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 cursor-default hover:scale-105">
                    <span>{perm.icon}</span>
                    {perm.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
