import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Marcus Delgado',
    role: 'Creative Director',
    company: 'Apex Studios',
    quote: 'KRRIX transformed our raw footage into a cinematic masterpiece. The color grading alone was worth every penny — it elevated the entire film by at least two production tiers.',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Sofia Reinholt',
    role: 'Brand Manager',
    company: 'Lumina Co.',
    quote: 'We gave them total creative freedom and they delivered something beyond what we imagined. The pacing, the music sync, the motion graphics — flawless execution.',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'James Okafor',
    role: 'Independent Filmmaker',
    company: 'Self-Directed',
    quote: 'As a filmmaker, I\'m extremely picky. KRRIX is the only studio I trust with my work. Their eye for storytelling made my documentary go from good to award-winning.',
    rating: 5,
    initial: 'J',
  },
  {
    name: 'Aisha Menon',
    role: 'YouTube Creator',
    company: '2.1M Subscribers',
    quote: 'Since partnering with KRRIX, my average view duration increased by 40%. The edits are so engaging — my audience notices every single upgrade.',
    rating: 5,
    initial: 'A',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className="testimonials__bg-quote">"</div>
      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="section-label">What Clients Say</p>
          <h2 className="testimonials__title">
            Trusted by Creators<br />
            <span className="gold-text">Around the World</span>
          </h2>
        </motion.div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card"
              id={`testimonial-${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div className="testimonial-card__inner">
                <div className="testimonial-card__quote-icon">"</div>
                <p className="testimonial-card__text">{t.quote}</p>
                <div className="testimonial-card__rating">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="testimonial-card__star">★</span>
                  ))}
                </div>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
