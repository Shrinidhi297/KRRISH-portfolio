import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ShowreelModal from './components/ShowreelModal';
import './App.css';

function Preloader({ onDone }) {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } }}
    >
      <motion.div
        className="preloader__inner"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="preloader__logo">
          <span className="preloader__krrix">KRRIX</span>
          <span className="preloader__sub">VIDEO EDITING STUDIO</span>
        </div>
        <div className="preloader__bar-wrap">
          <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            onAnimationComplete={onDone}
          />
        </div>
        <motion.p
          className="preloader__loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Experience
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = (loading || showreelOpen) ? 'hidden' : '';
  }, [loading, showreelOpen]);

  return (
    <div className="app noise">
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader key="preloader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero onShowreel={() => setShowreelOpen(true)} />
            <About />
            <Services />
            <Portfolio />
            <Process />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
