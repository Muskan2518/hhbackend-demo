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
              href="#download"
              className="bg-gradient-to-r from-primary to-brand-green text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 animate-pulse-glow"
            >
              Get the App
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 relative"
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

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
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
