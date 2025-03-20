import React from 'react';
import { motion } from 'framer-motion';

const MapView = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Map View</h1>
      {/* Map view content will be implemented later */}
    </motion.div>
  );
};

export default MapView;