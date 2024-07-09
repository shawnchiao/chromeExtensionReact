// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FetchStackDisplay = ({ fetchStack }) => {
  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      fontFamily: 'Arial, sans-serif',
    }}>
      <AnimatePresence>
        {fetchStack.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'white',
              padding: '10px',
              margin: '5px 0',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ marginRight: '10px' }}>
              {item.status === 'processing' && '🔄'}
              {item.status === 'completed' && '✅'}
              {item.status === 'error' && '❌'}
            </span>
            <span title={item.lexicalItem}>{truncateText(item.lexicalItem, 12)}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FetchStackDisplay;