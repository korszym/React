import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const About = () => {
  return (
    <motion.div
      className='mainbody'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>About Page</h1>
      <p>Learn more about us on this page.</p>
    </motion.div>
  );
};

export default About;
