import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Modal.css';

const backdropVariants = {
  visible: { opacity: 0.5 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: { y: '0', opacity: 1, transition: { delay: 0.5 } },
  exit: { y: '100vh', opacity: 0 },
};

const Modal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Modal Title</h2>
            <p>This is a modal with some content and animations.</p>
            <button onClick={onClose}>Close</button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
