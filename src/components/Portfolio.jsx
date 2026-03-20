import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

const categories = ['All', 'Cinematic', 'Commercial', 'Music Video', 'Documentary'];

const projects = [
  {
    id: 'p1',
    title: 'Echoes of Eternity',
    category: 'Cinematic',
    year: '2024',
    duration: '12 min',
    desc: 'A cinematic short film with moody, desaturated tones and seamless visual storytelling.',
    tags: ['Color Grade', 'Editorial', 'Sound Design'],
    gradient: 'linear-gradient(135deg, #1a1205, #2d1e0a, #3d2810)',
    accent: '#C9A84C',
    symbol: '◈',
  },
  {
    id: 'p2',
    title: 'Noir Series — Ep. 01',
    category: 'Documentary',
    year: '2024',
    duration: '28 min',
    desc: 'High-contrast black and white documentary with deep shadow work and theatrical cuts.',
    tags: ['B&W Grade', 'Long Form', 'Narrative'],
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #111)',
    accent: '#E8C97A',
    symbol: '◉',
  },
  {
    id: 'p3',
    title: 'Velocity Campaign',
    category: 'Commercial',
    year: '2025',
    duration: '60 sec',
    desc: 'A high-energy automotive brand commercial with kinetic transitions and bold motion graphics.',
    tags: ['Motion Graphics', 'VFX', 'Brand'],
    gradient: 'linear-gradient(135deg, #0f0a1a, #150d24, #1a1020)',
    accent: '#C9A84C',
    symbol: '◇',
  },
  {
    id: 'p4',
    title: 'Golden Hour',
    category: 'Music Video',
    year: '2025',
    duration: '4 min',
    desc: 'Warm analog-inspired color work on a narrative music video shot across multiple continents.',
    tags: ['LUT Design', 'Musical Sync', 'Travel'],
    gradient: 'linear-gradient(135deg, #2d1a05, #3d2810, #4a3018)',
    accent: '#E8C97A',
    symbol: '✦',
  },
  {
    id: 'p5',
    title: 'Skyward Brand Film',
    category: 'Commercial',
    year: '2025',
    duration: '3 min',
    desc: 'Corporate brand film with elegant motion titles, clean grades, and aspirational storytelling.',
    tags: ['Brand Film', 'Titles', 'Corporate'],
    gradient: 'linear-gradient(135deg, #080f1a, #0d1520, #101825)',
    accent: '#C9A84C',
    symbol: '◈',
  },
  {
    id: 'p6',
    title: 'Pulse — Live Concert',
    category: 'Cinematic',
    year: '2024',
    duration: '90 min',
    desc: 'Multi-camera live concert edit with real-time energy matching and immersive sound mix.',
    tags: ['Multi-cam', 'Live Music', 'Color'],
    gradient: 'linear-gradient(135deg, #1a050a, #2a0a12, #1e0508)',
    accent: '#E8C97A',
    symbol: '◉',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('All');
  const [hovered, setHovered] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="portfolio" ref={ref}>
      <div className="portfolio__bg-lines">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="portfolio__bg-line" style={{ left: `${(i + 1) * 14}%` }} />
        ))}
      </div>

      <div className="container">
        <motion.div
          className="portfolio__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="section-label">Selected Work</p>
          <h2 className="portfolio__title">
            A Curated<br />
            <span className="gold-text">Portfolio of Excellence</span>
          </h2>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          className="portfolio__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(' ', '-')}`}
              className={`portfolio__filter ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div className="portfolio__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                className="project-card"
                id={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Visual */}
                <div className="project-card__visual" style={{ background: p.gradient }}>
                  <div className="project-card__visual-noise" />
                  <span className="project-card__symbol" style={{ color: p.accent }}>{p.symbol}</span>
                  <div className="project-card__overlay" />
                  <div className="project-card__meta-overlay">
                    <span className="project-card__duration">{p.duration}</span>
                    <span className="project-card__year">{p.year}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="project-card__info">
                  <div className="project-card__info-top">
                    <span className="project-card__cat">{p.category}</span>
                    <div className="project-card__arrow">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                  <div className="project-card__tags">
                    {p.tags.map(t => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="portfolio__cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p>Ready to create something extraordinary?</p>
          <button
            id="portfolio-start-project"
            className="btn-gold"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Start Your Project</span>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
