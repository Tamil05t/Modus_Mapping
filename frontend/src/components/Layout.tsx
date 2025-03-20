import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-x-hidden overflow-y-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
};

export default Layout;