import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FilePlus,
  List,
  Share2,
  Map,
  Brain,
  Settings,
  LogOut,
  Activity,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FilePlus, label: 'Add Crime', path: '/add-crime' },
    { icon: List, label: 'Crime List', path: '/crimes' },
    { icon: Share2, label: 'Graph View', path: '/graph' },
    { icon: Map, label: 'Map View', path: '/map' },
    { icon: Brain, label: 'AI Analysis', path: '/analysis' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-card text-card-foreground shadow-lg"
    >
      <div className="flex h-20 items-center justify-center border-b">
        <Activity className="h-8 w-8 text-primary" />
        <span className="ml-2 text-2xl font-bold">ModusMapping</span>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center px-6 py-3 text-gray-600 transition-colors duration-300 hover:bg-primary/10 hover:text-primary',
                isActive && 'bg-primary/10 text-primary'
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="mx-4">{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex w-full items-center px-6 py-3 text-gray-600 transition-colors duration-300 hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          <span className="mx-4">Logout</span>
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;