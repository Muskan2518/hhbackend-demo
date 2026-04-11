'use client';

export default function ParticleField({ count = 20, className = '' }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 2 + (i % 4) * 2,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 53 + 7) % 100}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${6 + (i % 5) * 2}s`,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/10 animate-particle"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
