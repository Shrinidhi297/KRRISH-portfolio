import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Process.css';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We learn your vision, goals, brand tone, references, and timeline. No cookie-cutter approach — every project starts with deep understanding.',
    icon: '◎',
  },
  {
    num: '02',
    title: 'Creative Brief',
    desc: 'We craft a creative brief outlining the edit direction, color world, pacing, and technical specs — all approved before we begin.',
    icon: '◈',
  },
  {
    num: '03',
    title: 'Editorial Assembly',
    desc: 'Story-first cutting: rough cut → fine cut → picture lock. You receive updates at each stage with revision rounds.',
    icon: '⬡',
  },
  {
    num: '04',
    title: 'Color & Sound',
    desc: 'Professional color grading and immersive sound design are applied — transforming the edit from good to cinematic.',
    icon: '◉',
  },
  {
    num: '05',
    title: 'Delivery',
    desc: 'Multi-format exports optimized for your exact platforms, alongside organized project files and asset handover.',
    icon: '◇',
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" className="process" ref={ref}>
      <div className="container">
        <motion.div
          className="process__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="section-label">How It Works</p>
          <h2 className="process__title">
            Our Refined<br />
            <span className="gold-text">Creative Process</span>
          </h2>
          <p className="process__sub">
            From brief to delivery, every step is designed for clarity, collaboration, and exceptional results.
          </p>
        </motion.div>

        <div className="process__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="process__step"
              id={`step-${step.num}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="process__step-num">
                <span>{step.num}</span>
              </div>
              <div className="process__step-connector">
                <div className="process__step-line" />
                <div className="process__step-dot" />
              </div>
              <div className="process__step-content">
                <div className="process__step-icon">{step.icon}</div>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee banner */}
        <motion.div
          className="process__guarantee"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="process__guarantee-inner">
            <span className="process__guarantee-icon">✦</span>
            <div>
              <h4>The KRRIX Guarantee</h4>
              <p>Unlimited revisions until you're 100% satisfied. No hidden fees. Delivery on time, every time.</p>
            </div>
            <button
              id="process-cta"
              className="btn-gold"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Work With Us</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
