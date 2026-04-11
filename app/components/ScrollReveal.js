'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyles = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
  };

  const animations = {
    'fade-up': {
      hidden: { opacity: 0, transform: 'translateY(40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-down': {
      hidden: { opacity: 0, transform: 'translateY(-40px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'fade-left': {
      hidden: { opacity: 0, transform: 'translateX(-60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'fade-right': {
      hidden: { opacity: 0, transform: 'translateX(60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'fade-in': {
      hidden: { opacity: 0, transform: 'scale(0.95)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'zoom-in': {
      hidden: { opacity: 0, transform: 'scale(0.8)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'flip-up': {
      hidden: { opacity: 0, transform: 'perspective(600px) rotateX(15deg) translateY(30px)' },
      visible: { opacity: 1, transform: 'perspective(600px) rotateX(0) translateY(0)' },
    },
  };

  const anim = animations[animation] || animations['fade-up'];
  const currentStyle = isVisible ? anim.visible : anim.hidden;

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyles, ...currentStyle }}
    >
      {children}
    </div>
  );
}
