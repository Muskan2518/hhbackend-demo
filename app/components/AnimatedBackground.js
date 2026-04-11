'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-orb-1" />
      <div className="absolute top-3/4 right-[15%] w-48 h-48 bg-brand-green/3 rounded-full blur-3xl animate-orb-2" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-teal/2 rounded-full blur-3xl animate-orb-3" />
    </div>
  );
}
