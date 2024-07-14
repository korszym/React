// Modal.js
import React from 'react';
import { motion } from 'framer-motion';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: "0",
    transition: { delay: 0.5 },
  },
};

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h1>Siema, to modal!</h1>
            <p>Przykład modala z Framer Motion!</p>
            <p><a href="https://www.framer.com/motion/" target='blank'>Strona z animacjami</a></p>

            <button onClick={() => setShowModal(false)}>Zamknij</button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
