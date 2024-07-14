import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../components/modal';

const About = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div
      className='mainbody'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Modal</h1>
      <p>Przykład animowanego modala</p>

      <div className="App">
      <button onClick={() => setShowModal(true)}>Otwórz modal</button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>

    </motion.div>
  );
};

export default About;
