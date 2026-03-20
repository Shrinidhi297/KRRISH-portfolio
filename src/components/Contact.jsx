import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const services = [
    'Cinematic Editing',
    'Color Grading',
    'Motion Graphics',
    'Commercial Editing',
    'Sound Design',
    'Multi-Format Delivery',
    'Full Post-Production Package',
  ];

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500)); // simulated
    setSending(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__bg-gradient" />
      <div className="container">
        <div className="contact__grid">
          {/* Left info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
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

            <div className="contact__details">
              {[
                {
                  label: 'Email',
                  value: 'hello@krrix.studio',
                  href: 'mailto:hello@krrix.studio',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram',
                  value: '@krrix.studio',
                  href: '#',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  ),
                },
                {
                  label: 'Response Time',
                  value: 'Within 24 hours',
                  href: null,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 6v6l4 2" strokeLinecap="round"/>
                    </svg>
                  ),
                },
              ].map(d => (
                <div key={d.label} className="contact__detail">
                  <div className="contact__detail-icon">{d.icon}</div>
                  <div>
                    <div className="contact__detail-label">{d.label}</div>
                    {d.href ? (
                      <a href={d.href} className="contact__detail-value">{d.value}</a>
                    ) : (
                      <span className="contact__detail-value">{d.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="contact__availability">
              <span className="contact__availability-dot" />
              <span>Currently accepting new projects</span>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">✦</div>
                <h3>Message Received</h3>
                <p>Thank you for reaching out. We'll review your project and get back to you within 24 hours.</p>
                <button id="contact-reset" className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', message: '' }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form id="contact-form" className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="service">Service Required</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="contact__field">
                  <label htmlFor="message">Project Brief</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your vision, timeline, and any references you have in mind..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button id="contact-submit" type="submit" className="btn-gold contact__submit" disabled={sending}>
                  <span>{sending ? 'Sending...' : 'Send Your Brief'}</span>
                  {!sending && (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
