'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottiePlayer({ src, className, style, loop = true }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(src)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [src]);

  if (!data) return <div className={className} style={style} />;

  return <Lottie animationData={data} loop={loop} autoplay className={className} style={style} />;
}
