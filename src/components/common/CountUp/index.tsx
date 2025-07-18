import React, { useEffect, useState } from 'react';

interface CountUpProps {
  target: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ target, duration = 1000, className }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return <span className={className || ""}>{value.toLocaleString()}</span>;
}
