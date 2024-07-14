import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [text, setText] = useState('');
  const fullText = 'Oto przykład tekstu, który jest wyjątkowo obszerny i został wzbogacony o animację pisania, dzięki której każda litera pojawia się stopniowo, dodając efektu dynamiczności i żywości.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 25); 

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <motion.div
      className='mainbody'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Strona główna</h1>
      <p>{text}</p>
    </motion.div>
  );
};

export default Home;
