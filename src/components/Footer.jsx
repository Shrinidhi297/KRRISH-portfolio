import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__top-line" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-krrix">KRRIX</span>
              <span className="footer__logo-sub">VIDEO EDITING STUDIO</span>
            </div>
            <p className="footer__tagline">
              We don't just edit videos.<br />We sculpt stories that move the world.
            </p>
            <div className="footer__socials">
              {[
                { label: 'YouTube', href: '#' },
                { label: 'Instagram', href: '#' },
                { label: 'Behance', href: '#' },
                { label: 'Vimeo', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} id={`footer-${s.label.toLowerCase()}`} className="footer__social">{s.label}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Navigation</h4>
            <ul>
              {[
                ['About', '#about'],
                ['Services', '#services'],
                ['Portfolio', '#portfolio'],
                ['Process', '#process'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={(e) => { e.preventDefault(); scrollTo(href); }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Services</h4>
            <ul>
              {[
                'Cinematic Editing',
                'Color Grading',
                'Motion Graphics',
                'Commercial Editing',
                'Sound Design',
                'Multi-Format Delivery',
              ].map(s => (
                <li key={s}><span>{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Contact</h4>
            <ul>
              <li><a href="mailto:hello@krrix.studio">hello@krrix.studio</a></li>
              <li><a href="#">@krrix.studio</a></li>
            </ul>
            <div className="footer__badge">
              <span className="footer__badge-dot" />
              <span>Taking new projects</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} KRRIX Video Editing Studio. All rights reserved.
          </p>
          <p className="footer__craft">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
