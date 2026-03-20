import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { supabase } from '../api/supabase';
import './Portfolio.css';
import './ShowreelModal.css';

const fallbackProjects = [
  {
    id: 'p7',
    title: 'Cinematic Atmosphere',
    year: '2025',
    duration: '2:15 min',
    desc: 'An exploration of moody lighting and deep textures in a cinematic environment.',
    tags: ['Color Grade', 'Cinematography', 'Sound Design'],
    video: '/assets/videos/cinematic_1.mov',
    gradient: 'linear-gradient(135deg, #1a1205, #2d1e0a, #3d2810)',
    accent: '#C9A84C',
    symbol: '◈',
  },
  {
    id: 'p8',
    title: 'CGT Masterclass',
    year: '2025',
    duration: '1:45 min',
    desc: 'High-end motion graphics and visual effects showcasing technical precision.',
    tags: ['VFX', 'Motion Graphics', 'Editing'],
    video: '/assets/videos/cgt.mov',
    gradient: 'linear-gradient(135deg, #0d0d0d, #1a1a1a, #111)',
    accent: '#E8C97A',
    symbol: '◉',
  },
  {
    id: 'p9',
    title: 'Techstore Showcase',
    year: '2025',
    duration: '55 sec',
    desc: 'A dynamic commercial for a modern tech retailer with kinetic editing patterns.',
    tags: ['Commercial', 'Fast Cuts', 'Branding'],
    video: '/assets/videos/techstore.mov',
    gradient: 'linear-gradient(135deg, #0f0a1a, #150d24, #1a1020)',
    accent: '#C9A84C',
    symbol: '◇',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          // Map DB columns to our UI keys if they differ
          setProjects(data.map(p => ({
            ...p,
            video: p.video_url || p.video, // Support both naming conventions
          })));
        }
      } catch (err) {
        console.error("Error fetching projects from Supabase:", err.message);
      }
    }
    
    // Only fetch if a valid URL is provided in the client
    if (!supabase.supabaseUrl.includes('YOUR_PROJECT_ID')) {
      fetchProjects();
    }
  }, []);

  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.play().catch(err => console.log("Video play interrupted", err));
    }
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
    }
  };

  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
  };

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

        {/* Cards Grid */}
        <motion.div className="portfolio__grid" layout>
          <AnimatePresence mode="popLayout">
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                className="project-card"
                id={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => openProject(p)}
              >
                {/* Visual */}
                <div className="project-card__visual" style={{ background: p.gradient }}>
                  {p.video ? (
                    <video
                      src={p.video}
                      className="project-card__video"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <>
                      <div className="project-card__visual-noise" />
                      <span className="project-card__symbol" style={{ color: p.accent }}>{p.symbol}</span>
                    </>
                  )}
                  
                  <div className="project-card__overlay" />
                  <div className="project-card__meta-overlay">
                    <span className="project-card__duration">{p.duration}</span>
                    <span className="project-card__year">{p.year}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="project-card__info">
                  <div className="project-card__info-top">
                    {/* Category removed as per request */}
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

      {/* Project Video Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="showreel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="showreel-modal__overlay" onClick={closeProject} />
            <motion.div
              className="showreel-modal__content"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="showreel-modal__close" onClick={closeProject}>
                <X size={24} />
              </button>
              <div className="showreel-modal__player">
                {selectedProject.video ? (
                  <video
                    src={selectedProject.video}
                    controls
                    autoPlay
                    className="portfolio-modal__video"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="showreel-modal__placeholder">
                    <div className="showreel-modal__placeholder-icon">▶</div>
                    <p>{selectedProject.title}</p>
                    <span>[ VIDEO SOURCE PENDING ]</span>
                  </div>
                )}
              </div>
              <div className="showreel-modal__caption">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.desc}</p>
                <div className="project-card__tags" style={{ marginTop: '16px' }}>
                  {selectedProject.tags.map(t => (
                    <span key={t} className="project-card__tag" style={{ color: '#C9A84C', borderColor: 'rgba(201, 168, 76, 0.2)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
