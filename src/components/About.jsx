import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const values = [
  {
    icon: '◈',
    title: 'Precision',
    desc: 'Every frame is intentional. We obsess over the details that most miss — pacing, color, sound.',
  },
  {
    icon: '◉',
    title: 'Artistry',
    desc: 'Editing is storytelling. We bring a filmmaker\'s eye to every cut, transition, and visual choice.',
  },
  {
    icon: '◇',
    title: 'Luxury',
    desc: 'From delivery to communication, our studio experience is as premium as the final product.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({
      opacity: 1, y: 0,
      transition: { duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }
    }),
  };

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <div className="about__grid">
          {/* Left visual */}
          <motion.div
            className="about__visual"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about__visual-frame">
              <div className="about__visual-inner">
                <div className="about__visual-logo">
                  <span className="avl__krrix">KRRIX</span>
                  <span className="avl__sub">VIDEO EDITING STUDIO</span>
                </div>
                <div className="about__visual-lines">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="avl__line" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
                <div className="about__visual-corner about__visual-corner--tl" />
                <div className="about__visual-corner about__visual-corner--br" />
              </div>
            </div>
            <div className="about__visual-badge">
              <span className="avb__num">5+</span>
              <span className="avb__text">Years of<br />Excellence</span>
            </div>
          </motion.div>

          {/* Right text */}
          <div className="about__text">
            <motion.div custom={0} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <p className="section-label">Our Story</p>
              <h2 className="about__heading">
                Cinema-Grade Editing,<br />
                <em>Tailored for You</em>
              </h2>
            </motion.div>

            <motion.p className="about__body" custom={1} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              KRRIX was founded with a singular obsession: to elevate video content from ordinary to extraordinary. Born from a passion for cinema and visual storytelling, we've grown into a full-service video editing studio trusted by creators, brands, and filmmakers worldwide.
            </motion.p>

            <motion.p className="about__body" custom={2} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              We blend technical mastery with creative intuition — wielding tools like DaVinci Resolve, Adobe Premiere, and After Effects to craft visuals that don't just look stunning, they feel visceral.
            </motion.p>

            <motion.div className="about__values" custom={3} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              {values.map(v => (
                <div key={v.title} className="about__value">
                  <span className="about__value-icon">{v.icon}</span>
                  <div>
                    <h4 className="about__value-title">{v.title}</h4>
                    <p className="about__value-desc">{v.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div custom={4} variants={variants} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <div className="about__tools">
                <span className="about__tools-label">Our Toolkit</span>
                <div className="about__tools-list">
                  {['DaVinci Resolve', 'Adobe Premiere', 'After Effects', 'Cinema 4D', 'FL Studio'].map(t => (
                    <span key={t} className="about__tool">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
