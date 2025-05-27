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
  Clock,
  FileText,
  Gamepad2
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isMounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (showThemeSelector) setShowThemeSelector(false);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector);
  };
  
  const setTheme = (isDark: boolean) => {
    if (!isMounted) return;
    setIsDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setShowThemeSelector(false);
  };

  const navigateToPortfolio = (tab: 'sobre-mi' | 'cv' | 'pasatiempos') => {
    closeMenu();
    window.location.href = `/portfolio#${tab}`;
  };

  if (!isMounted) {
    return (
      <div className={`min-h-screen relative overflow-hidden z-50 ${isDarkMode ? 'dark:bg-darker' : 'bg-lighter'} transition-colors duration-300`}>
        <button
          className="fixed left-4 top-4 z-50 p-3 rounded-full shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600"
          aria-label="Toggle menu"
        >
          <Grid size={24} className="text-gray-800 dark:text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden z-50 ${isDarkMode ? 'dark:bg-darker' : 'bg-lighter'} transition-colors duration-300`}>
      <motion.button
        onClick={toggleMenu}
        className="fixed left-1.5 top-2 z-50 p-3 rounded-full shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        aria-label="Toggle menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMenuOpen ? (
          <X size={24} className="text-gray-800 dark:text-white" />
        ) : (
          <Grid size={24} className="text-gray-800 dark:text-white" />
        )}
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40"
              onClick={closeMenu}
            />
            
            <div className="fixed inset-0 z-40 flex overflow-hidden">
              <motion.div
                initial={{ x: -64 }}
                animate={{ x: 0 }}
                exit={{ x: -64 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-sidebar w-16 flex flex-col justify-between py-6"
              >
                <div className="flex flex-col items-center gap-6">
                  <SidebarItem 
                    icon={
                      <motion.div 
                        whileHover={{ rotate: 30 }}
                        className="relative top-15"
                      >
                        <Clock size={24} className={isDarkMode ? "text-gray-300" : "text-yellow-300"} />
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          isDarkMode ? 'bg-gray-400' : 'bg-yellow-400'
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="h-full bg-sidebar flex-1 overflow-y-auto bg-menu-gradient"
                style={{ maxWidth: '420px' }}
              >
                <div className="bg-profile-banner p-8 relative">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-profile bg-white">
                      <Image 
                        src="/avatar.jpg" 
                        alt="Profile" 
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                      <h1 className="text-xl font-semibold text-profile-primary">Diego Alejandro Ocampo</h1>
                      <p className="text-sm text-profile-secondary">Desarrollador Full Stack</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <MenuItem 
                      title="Perfil" 
                      icon={<User size={48} />} 
                      href="#"
                      onClick={() => navigateToPortfolio('sobre-mi')}
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
                      icon={<FileText size={48} />} 
                      href="#"
                      onClick={() => navigateToPortfolio('cv')}
                    />
                    <MenuItem 
                      title="Pasatiempos" 
                      icon={<Gamepad2 size={48} />} 
                      href="#"
                      onClick={() => navigateToPortfolio('pasatiempos')}
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
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showThemeSelector && isMounted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed left-20 top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setTheme(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                  !isDarkMode 
                    ? 'bg-yellow-600 text-white' 
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
                    ? 'bg-yellow-600 text-white' 
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
    </div>
  );
};

export default Menu;