import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

export default function Hero({ onShowreel }) {
  const canvasRef = useRef(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Background layers */}
      <div className="hero__bg-grid" />
      <div className="hero__bg-radial" />
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Floating film strip lines */}
      <div className="hero__filmstrip hero__filmstrip--left" />
      <div className="hero__filmstrip hero__filmstrip--right" />

      <div className="hero__content container">
        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="hero__year">EST. 2024</span>
          <span className="hero__line" />
          <span className="hero__eyebrow-text">Premium Video Editing Studio</span>
        </motion.div>

        {/* Main Logo */}
        <motion.div
          className="hero__logo-block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero__title">KRRIX</h1>
          <div className="hero__subtitle-bar">
            <span className="hero__subtitle-line" />
            <p className="hero__subtitle">VIDEO EDITING STUDIO</p>
            <span className="hero__subtitle-line" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          We don't just edit videos.
          <br />
          <em>We sculpt stories that move the world.</em>
        </motion.p>

        {/* Stats */}
        <div className="hero__stats">
          {[
            { num: '50+', label: 'Projects Delivered' },
            { num: '15+', label: 'Clients Worldwide' },
            { num: '2+', label: 'Years Experience' },
            { num: '100%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="hero__stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__stat-num">{s.num}</span>
              <span className="hero__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <button id="hero-showreel" className="btn-gold hero__play-btn" onClick={onShowreel}>
            <div className="hero__play-icon">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span>Play Showreel</span>
          </button>
          <button id="hero-view-work" className="btn-outline" onClick={scrollToPortfolio}>
            View Portfolio
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="hero__scroll-line" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}
