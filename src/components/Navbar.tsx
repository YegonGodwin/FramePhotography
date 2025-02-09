import React, { useState, useEffect } from 'react';
import { Camera, X, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-white text-black shadow-md'
        : 'bg-transparent text-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center space-x-2">
            <Camera className="w-8 h-8" />
            <span className="text-xl font-bold">DoxTempo Studio</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:opacity-75 transition-opacity">Home</a>
            <a href="#gallery" className="hover:opacity-75 transition-opacity">Gallery</a>
            <a href="#about" className="hover:opacity-75 transition-opacity">About Us</a>
            <a href="#contact" className="hover:opacity-75 transition-opacity">Contact Us</a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
        } transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col p-8 space-y-6">
          <a href="#" className="hover:opacity-75 transition-opacity" onClick={closeMobileMenu}>Home</a>
          <a href="#gallery" className="hover:opacity-75 transition-opacity" onClick={closeMobileMenu}>Gallery</a>
          <a href="#about" className="hover:opacity-75 transition-opacity" onClick={closeMobileMenu}>About Us</a>
          <a href="#contact" className="hover:opacity-75 transition-opacity" onClick={closeMobileMenu}>Contact Us</a>
        </div>
      </div>
    </nav>
  );
};