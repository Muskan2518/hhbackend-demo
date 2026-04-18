'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-0'
        : 'bg-white/80 backdrop-blur-sm shadow-sm py-1'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img
              src="/images/logo_icon.png"
              alt="HH Patients Care"
              className={`transition-all duration-300 ${scrolled ? 'h-9' : 'h-10'} w-auto group-hover:scale-110`}
            />
            <span className="text-lg font-bold text-dark">
              Helping Hands <span className="text-primary">Patient Care</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">How It Works</a>
            <a href="#pricing" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">Programs</a>
            <a href="#download" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">Download</a>
            <a href="#about-us" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">About Us</a>
            <a href="#contact-us" className="animated-underline text-gray-600 hover:text-primary transition-colors font-medium">Contact Us</a>
            <a
              href="https://wa.me/917330677156?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20HH%20Patients%20Care"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.711.227 1.358.195 1.869.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a
              href="#download"
              className="bg-gradient-to-r from-primary to-brand-green text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              Get the App
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://wa.me/917330677156?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20HH%20Patients%20Care"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white shadow-md hover:scale-110 transition-all duration-300 animate-pulse-glow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.711.227 1.358.195 1.869.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <button
            className="p-2 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-dark rounded transition-all duration-300 origin-left ${menuOpen ? 'rotate-45 w-[26px]' : 'w-6'}`} />
              <span className={`block h-0.5 bg-dark rounded transition-all duration-300 ${menuOpen ? 'opacity-0 translate-x-4' : 'w-6'}`} />
              <span className={`block h-0.5 bg-dark rounded transition-all duration-300 origin-left ${menuOpen ? '-rotate-45 w-[26px]' : 'w-6'}`} />
            </div>
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-4">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#pricing', label: 'Programs' },
                { href: '#download', label: 'Download' },
                { href: '#about-us', label: 'About Us' },
                { href: '#contact-us', label: 'Contact Us' },
              ].map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600 hover:text-primary hover:bg-primary/5 font-medium px-4 py-2.5 rounded-lg transition-all duration-200"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-primary to-brand-green text-white px-5 py-2.5 rounded-full font-semibold text-center mt-2 hover:scale-105 transition-transform"
              >
                Get the App
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
