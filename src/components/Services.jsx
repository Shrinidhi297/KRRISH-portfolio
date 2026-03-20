import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Services.css';

const services = [
  {
    id: '01',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="10" width="40" height="28" rx="2"/>
        <path d="M20 10v28M28 10v28M4 20h40M4 28h40"/>
        <circle cx="12" cy="15" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    title: 'Cinematic Editing',
    desc: 'Frame-perfect cuts, rhythm-driven pacing, and story-first assembly that transforms raw footage into a compelling narrative.',
    features: ['Story Structure', 'Beat Pacing', 'Scene Assembly', 'Rough & Fine Cut'],
  },
  {
    id: '02',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="24" cy="24" r="18"/>
        <path d="M24 6v36M6 24h36M10.1 10.1l27.8 27.8M10.1 37.9l27.8-27.8"/>
        <circle cx="24" cy="24" r="6"/>
      </svg>
    ),
    title: 'Color Grading',
    desc: 'Hollywood-grade color science using DaVinci Resolve. From natural grades to cinematic LUT design and creative color worlds.',
    features: ['Primary & Secondary Grade', 'LUT Design', 'Skin Tone Matching', 'HDR Delivery'],
  },
  {
    id: '03',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M8 36V12l32 12-32 12z" strokeLinejoin="round"/>
        <path d="M24 6v4M24 38v4M6 24H2M46 24h-4"/>
      </svg>
    ),
    title: 'Motion Graphics',
    desc: 'Dynamic titles, animated infographics, kinetic typography, and seamless visual effects that elevate your video to another level.',
    features: ['Title Design', 'Kinetic Typography', 'Infographics', 'VFX Integration'],
  },
  {
    id: '04',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="4" y="8" width="40" height="32" rx="2"/>
        <path d="M4 18h40M14 8v10M24 8v10M34 8v10M14 18l-4 4 4 4M34 18l4 4-4 4"/>
      </svg>
    ),
    title: 'Commercial Editing',
    desc: 'Punchy, brand-aligned ads and commercials engineered to convert — with razor-sharp timing and premium production value.',
    features: ['Ad Campaigns', 'Brand Films', 'Social Cuts', 'A/B Versioning'],
  },
  {
    id: '05',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="24" cy="24" r="18"/>
        <path d="M16 24l6 6 10-12" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 6v4M24 38v4M40 24h4M4 24H8"/>
      </svg>
    ),
    title: 'Sound Design',
    desc: 'Immersive audio experiences — from music selection and ambient design to voiceover mixing and foley integration.',
    features: ['Music Sync', 'Voice mixing', 'Sfx & Foley', 'Loudness Mastering'],
  },
  {
    id: '06',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="8" y="4" width="32" height="40" rx="2"/>
        <path d="M16 14h16M16 20h16M16 26h10"/>
        <circle cx="34" cy="36" r="8" fill="#080808" stroke="currentColor"/>
        <path d="M31 36l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Multi-Format Delivery',
    desc: 'Optimized exports for every platform — YouTube, Instagram Reels, TikTok, broadcast, cinema, and custom specs.',
    features: ['Platform Optimization', '4K / 8K Export', 'Broadcast Specs', 'Rapid Turnaround'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="services" ref={ref}>
      {/* BG decoration */}
      <div className="services__bg-text">SERVICES</div>

      <div className="container">
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="section-label">What We Do</p>
          <h2 className="services__title">
            Crafted Services for<br />
            <span className="gold-text">Visionary Creators</span>
          </h2>
          <p className="services__sub">
            Every project deserves world-class treatment. Our suite of services covers the full spectrum of post-production.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              id={`service-${s.id}`}
            >
              <div className="service-card__glow" />
              <div className="service-card__top">
                <span className="service-card__num">{s.id}</span>
                <div className="service-card__icon">{s.icon}</div>
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <ul className="service-card__features">
                {s.features.map(f => (
                  <li key={f}>
                    <span className="service-card__bullet">◆</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="service-card__corner" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
