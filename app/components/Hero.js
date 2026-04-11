'use client';
import { useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import ParticleField from './ParticleField';

export default function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [currentLang, setCurrentLang] = useState('en');

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'hi', label: 'HI', name: 'Hindi' },
    { code: 'te', label: 'TE', name: 'Telugu' },
  ];

  const switchLanguage = (langCode) => {
    const video = videoRef.current;
    if (video && langCode !== currentLang) {
      const currentTime = video.currentTime;
      const wasMuted = video.muted;
      video.pause();
      setCurrentLang(langCode);
      video.src = `/videos/demo_${langCode}.mp4`;
      video.load();
      video.muted = wasMuted;

      const onReady = () => {
        video.currentTime = currentTime;
        video.play().catch(() => {});
        video.removeEventListener('canplay', onReady);
      };
      video.addEventListener('canplay', onReady);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        setShowHint(false);
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const togglePlay = (e) => {
    e?.stopPropagation?.();
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      // First click unmutes, subsequent clicks toggle play
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        setIsMuted(false);
        setShowHint(false);
      } else {
        togglePlay();
      }
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-orb-1" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-green/5 rounded-full translate-y-1/2 -translate-x-1/2 animate-orb-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-slide-badge">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Healthcare Discounts Made Easy
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={250}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark leading-tight mb-6">
                Save Big on{' '}
                <span className="animate-gradient-text">Healthcare</span>{' '}
                with Every Visit
              </h1>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                Helping Hands Patient Care gives you exclusive discounts at partnered hospitals and diagnostic centers.
                One membership card, unlimited savings for your entire family.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={550}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#download"
                  className="ripple-container inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-brand-green text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 animate-pulse-glow"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.916V2.73a.996.996 0 01.609-.916zM14.852 13.06l2.341 2.342-8.27 4.742a1 1 0 01-.462.148l6.391-7.232zm3.558-2.2l2.059 1.18a1 1 0 010 1.72l-2.059 1.18-2.59-2.08 2.59-2zm-4.617-1.92l-6.391-7.232a1 1 0 01.462.148l8.27 4.742-2.341 2.342z" />
                  </svg>
                  Download on Play Store
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 bg-white text-dark px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-primary hover:text-primary hover:scale-105 transition-all duration-300 animate-glow-border"
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>

            {/* Stats with CountUp */}
            <ScrollReveal animation="fade-up" delay={700}>
              <div className="flex gap-8 mt-10 justify-center md:justify-start">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-dark">
                    <CountUp end={500} suffix="+" duration={2000} />
                  </p>
                  <p className="text-sm text-gray-500">Partnered Providers</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-dark">
                    Up to <CountUp end={30} suffix="%" duration={1500} />
                  </p>
                  <p className="text-sm text-gray-500">Discounts</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-dark">
                    <CountUp end={4} duration={1000} /> Members
                  </p>
                  <p className="text-sm text-gray-500">Per Card</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Phone Mockup with Video */}
          <ScrollReveal animation="fade-right" delay={400} duration={900}>
            <div className="flex justify-center md:justify-center md:pl-12">
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-72 h-[580px] bg-dark rounded-[3rem] p-[6px] shadow-2xl shadow-dark/20 relative hover-glow transition-all duration-500 group">
                  {/* Gradient glow behind phone */}
                  <div className="absolute -inset-3 bg-gradient-to-br from-primary to-brand-green rounded-[3.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-dark rounded-b-2xl z-20" />

                  {/* Screen with Video */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover cursor-pointer"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onClick={handleVideoClick}
                      src={`/videos/demo_${currentLang}.mp4`}
                    />

                    {/* Language switcher */}
                    <div className="absolute top-12 right-2 flex flex-col gap-1 z-10">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={(e) => { e.stopPropagation(); switchLanguage(lang.code); }}
                          className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-200 hover:scale-110 ${
                            currentLang === lang.code
                              ? 'bg-primary text-white shadow-lg shadow-primary/40 scale-110'
                              : 'bg-black/50 text-white/80 backdrop-blur-sm hover:bg-black/70'
                          }`}
                          title={lang.name}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    {/* Video controls overlay */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                      {/* Play/Pause button */}
                      <button
                        onClick={togglePlay}
                        className="w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-200 hover:scale-110"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>

                      {/* Mute/Unmute button */}
                      <button
                        onClick={toggleSound}
                        className={`w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 ${
                          isMuted ? 'bg-red-500/70 hover:bg-red-500/90 animate-pulse' : 'bg-black/60 hover:bg-black/80'
                        }`}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Tap to unmute hint - shows initially */}
                    {showHint && isMuted && (
                      <button
                        onClick={toggleSound}
                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full z-10 animate-bounce cursor-pointer hover:bg-black/90 transition-colors"
                      >
                        🔊 Tap to unmute
                      </button>
                    )}
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-20" />
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
