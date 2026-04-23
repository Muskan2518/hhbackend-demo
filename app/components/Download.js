'use client';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import ParticleField from './ParticleField';

export default function Download() {
  const [showToast, setShowToast] = useState(false);

  const handleComingSoon = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section id="download" className="py-20 bg-gradient-to-br from-primary via-primary-light to-brand-green relative overflow-hidden animate-gradient">
      {/* Background decoration */}
      <ParticleField count={25} />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-float" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full animate-orb-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center md:text-left">
            <ScrollReveal animation="fade-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Download HH Patients Care Today
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150}>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Start saving on healthcare right away. Download the app from Google Play Store,
                sign up in minutes, and unlock exclusive discounts at hundreds of healthcare providers.
              </p>
            </ScrollReveal>

            {/* Play Store Button */}
            <ScrollReveal animation="fade-up" delay={300}>
              <button
                onClick={handleComingSoon}
                className="inline-flex items-center gap-4 bg-dark text-white px-6 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-2xl group hover:scale-105 cursor-pointer"
              >
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.916V2.73a.996.996 0 01.609-.916zM14.852 13.06l2.341 2.342-8.27 4.742a1 1 0 01-.462.148l6.391-7.232zm3.558-2.2l2.059 1.18a1 1 0 010 1.72l-2.059 1.18-2.59-2.08 2.59-2zm-4.617-1.92l-6.391-7.232a1 1 0 01.462.148l8.27 4.742-2.341 2.342z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Get it on</p>
                  <p className="text-xl font-semibold group-hover:text-brand-green transition-colors">Google Play</p>
                </div>
              </button>
            </ScrollReveal>

            {/* Download stats */}
            <ScrollReveal animation="fade-up" delay={450}>
              <div className="flex gap-8 mt-10 justify-center md:justify-start">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm">4.8 Rating</p>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <p className="text-white font-bold text-lg">Free</p>
                  <p className="text-white/60 text-sm">To Download</p>
                </div>
                <div className="w-px bg-white/20" />
                <div>
                  <p className="text-white font-bold text-lg">~25 MB</p>
                  <p className="text-white/60 text-sm">App Size</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Download Guide */}
          <ScrollReveal animation="fade-right" delay={200}>
            <div className="flex justify-center md:justify-end">
              <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full hover-lift">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img src="/images/logo_icon.png" alt="HH Patients Care" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-dark font-bold text-lg mb-1">How to Download</h3>
                  <p className="text-gray-400 text-sm">Get started in 4 simple steps</p>
                </div>

                <div className="space-y-3">
                  {[
                    { step: '1', text: 'Open Google Play Store on your Android phone' },
                    { step: '2', text: 'Search for "HH Patients Care"' },
                    { step: '3', text: 'Tap "Install" and open the app' },
                    { step: '4', text: 'Sign up with your mobile number' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 group/step">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover/step:bg-primary group-hover/step:text-white transition-colors">{item.step}</span>
                      <p className="text-gray-500 text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400">
                    Available for Android 7.0+. iOS version coming soon.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      {/* Coming Soon Popup */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowToast(false)}>
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center max-w-md mx-4 animate-bounce-in" onClick={(e) => e.stopPropagation()}>
            <span className="text-6xl block mb-4">🚀</span>
            <h3 className="text-2xl font-bold text-dark mb-2">Coming Soon!</h3>
            <p className="text-gray-500 text-lg">The app will be available on Play Store shortly.</p>
            <button onClick={() => setShowToast(false)} className="mt-6 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-light transition-colors cursor-pointer">Got it</button>
          </div>
        </div>
      )}
    </section>
  );
}
