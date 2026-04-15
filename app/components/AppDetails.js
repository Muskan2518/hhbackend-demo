'use client';
import ScrollReveal from './ScrollReveal';

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

      </div>
    </section>
  );
}
