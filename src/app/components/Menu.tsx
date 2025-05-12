'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Users, 
  FolderKanban, 
  Info, 
  X,
  Github,
  Linkedin,
  Mail,
  Home,
  Grid,
  Moon,
  Sun,
  Clock
} from 'lucide-react';
import Image from 'next/image';

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon, href, onClick }) => {
  return (
    <Link 
      href={href} 
      className="flex items-center justify-center flex-col p-4 bg-menu-item text-white hover:bg-menu-item-hover transition-all w-full aspect-square rounded-md"
      onClick={onClick}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-xl font-medium text-center">{title}</span>
    </Link>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  href?: string;
  ariaLabel: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, href, ariaLabel, onClick }) => {
  if (href) {
    return (
      <Link 
        href={href} 
        aria-label={ariaLabel}
        className="flex items-center justify-center p-3 text-white hover:bg-sidebar-hover rounded-md transition-all"
      >
        {icon}
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center justify-center p-3 text-white hover:bg-sidebar-hover rounded-md transition-all"
    >
      {icon}
    </button>
  );
};

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Cargar tema guardado al inicio
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showThemeSelector) setShowThemeSelector(false);
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector);
  };
  
  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setShowThemeSelector(false);
  };
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen relative overflow-hidden z-50 ${isDarkMode ? 'dark:bg-darker' : 'bg-lighter'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full bg-sidebar w-16 flex flex-col justify-between py-6 z-30">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={toggleMenu}
            className="p-2 text-white hover:bg-sidebar-hover rounded-md transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Grid size={24} />}
          </button>
          
          <SidebarItem 
            icon={
              <motion.div 
                whileHover={{ rotate: 30 }}
                className="relative"
              >
                <Clock size={24} className={isDarkMode ? "text-yellow-300" : "text-gray-300"} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  isDarkMode ? 'bg-yellow-400' : 'bg-gray-400'
                }`}></div>
              </motion.div>
            } 
            ariaLabel="Toggle theme" 
            onClick={toggleThemeSelector} 
          />
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <SidebarItem icon={<Github size={24} />} href="https://github.com" ariaLabel="GitHub" />
          <SidebarItem icon={<Linkedin size={24} />} href="https://linkedin.com" ariaLabel="LinkedIn" />
          <SidebarItem icon={<Mail size={24} />} href="mailto:contact@example.com" ariaLabel="Contact" />
        </div>
        
        <div className="flex flex-col items-center">
          <SidebarItem icon={<Home size={24} />} href="/" ariaLabel="Home" />
        </div>
      </div>

      {/* Theme Selector Popup */}
      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed left-20 top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-40"
          >
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setTheme(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  !isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Sun size={18} />
                <span>Light</span>
              </button>
              <button 
                onClick={() => setTheme(true)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Moon size={18} />
                <span>Dark</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-16 top-0 h-full bg-sidebar z-20 overflow-hidden bg-menu-gradient"
            style={{ width: 'calc(100% - 16rem)', maxWidth: '420px' }}
          >
            {/* Header Banner with Profile */}
            <div className="bg-profile-banner p-8 relative">
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-profile bg-white">
                  <Image 
                    src="/avatar.jpg" 
                    alt="Profile" 
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="ml-6">
                  <h1 className="text-xl font-semibold text-profile-primary">Diego Alejandro Ocampo</h1>
                  <p className="text-sm text-profile-secondary">Desarrollador Full Stack</p>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <MenuItem 
                  title="Perfil" 
                  icon={<User size={48} />} 
                  href="/profile" 
                  onClick={closeMenu}
                />
                <MenuItem 
                  title="Testimonios" 
                  icon={<Users size={48} />} 
                  href="/testimonials" 
                  onClick={closeMenu}
                />
                <MenuItem 
                  title="Proyectos" 
                  icon={<FolderKanban size={48} />} 
                  href="/projects" 
                  onClick={closeMenu}
                />
                <MenuItem 
                  title="CV" 
                  icon={<User size={48} />} 
                  href="/cv" 
                  onClick={closeMenu}
                />
                <MenuItem 
                  title="Pasatiempos" 
                  icon={<User size={48} />} 
                  href="/hobbies" 
                  onClick={closeMenu}
                />
                <MenuItem 
                  title="Información" 
                  icon={<Info size={48} />} 
                  href="/information" 
                  onClick={closeMenu}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;