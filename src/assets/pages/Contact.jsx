import React from 'react';
import { motion } from 'framer-motion';
import Flashlight from '../components/flashlight';

const Contact = () => {
  return (
    <motion.div
      className='mainbody'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Latarka</h1>
      <p>Przykład użycia latarki</p>
      <Flashlight></Flashlight>
    </motion.div>
  );
};

export default Contact;
