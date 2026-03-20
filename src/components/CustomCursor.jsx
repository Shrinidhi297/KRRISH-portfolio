import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Snappy but smooth spring config
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`custom-cursor ${isPointer ? 'is-pointer' : ''}`}
      style={{
        x: springX,
        y: springY,
      }}
    >
      <div className="cursor__arrow">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path 
            d="M5.5 3.5L21.5 15.5L14.5 16.5L18.5 24.5L15.5 26L11.5 18L5.5 24V3.5Z" 
            fill="url(#premiumGold)" 
            stroke="#9A7A2E" 
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="premiumGold" x1="5.5" y1="3.5" x2="21.5" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8C97A" />
              <stop offset="0.5" stopColor="#C9A84C" />
              <stop offset="1" stopColor="#9A7A2E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}
