import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Settings</h1>
      {/* Settings content will be implemented later */}
    </motion.div>
  );
};

export default Settings;