import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__bg-gradient" />
      <div className="container">
        <div className="contact__wrapper">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">Get In Touch</p>
            <h2 className="contact__title">
              Let's Create<br />
              <span className="gold-text">Something Timeless</span>
            </h2>
            <p className="contact__sub">
              Whether you're a brand, filmmaker, creator, or label — we're ready to bring your vision to life with uncompromising quality.
            </p>

            <div className="contact__details-grid">
              {[
                {
                  label: 'Email',
                  value: 'hello@krrix.studio',
                  href: 'mailto:hello@krrix.studio',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  value: '@krrix.studio',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  ),
                },
              ].map(d => (
                <div key={d.label} className="contact__card">
                  <div className="contact__card-icon">{d.icon}</div>
                  <div className="contact__card-content">
                    <div className="contact__card-label">{d.label}</div>
                    <a href={d.href} className="contact__card-value">{d.value}</a>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="contact__footer">
              <div className="contact__availability">
                <span className="contact__availability-dot" />
                <span>Currently accepting new projects</span>
              </div>
              <p className="contact__response">Typical response time: Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

