import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ShowreelModal.css';

export default function ShowreelModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="showreel-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="showreel-modal__overlay" onClick={onClose} />
          <motion.div
            className="showreel-modal__content"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button className="showreel-modal__close" onClick={onClose}>
              <X size={24} />
            </button>
            <div className="showreel-modal__player">
              {/* This would be your actual showreel video link */}
              <div className="showreel-modal__placeholder">
                <div className="showreel-modal__placeholder-icon">▶</div>
                <p>PREMIUM SHOWREEL — KRRIX STUDIO</p>
                <span>[ VIDEO SOURCE PENDING ]</span>
              </div>
            </div>
            <div className="showreel-modal__caption">
              <h3>KRRIX 2025 SHOWREEL</h3>
              <p>A collection of our finest cinematic work, color grading, and visual storytelling.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
