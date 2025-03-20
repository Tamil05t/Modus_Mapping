import React from 'react';
import { motion } from 'framer-motion';

const CrimeList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Crime List</h1>
      {/* Crime list content will be implemented later */}
    </motion.div>
  );
};

export default CrimeList;