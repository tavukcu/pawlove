'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from 'src/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Tüm Ürünler', href: '/shop' },
    { name: 'Mobilya', href: '/shop?category=furniture' },
    { name: 'Aksesuar', href: '/shop?category=accessories' },
    { name: 'Sağlık', href: '/shop?category=health' },
    { name: 'Kum & Temizlik', href: '/shop?category=cleaning' },
  ];

  return (
    <>
      {/* Top Announcement Bar for Turkish Market Trust */}
      <div className="bg-[#3D5A46] text-[#E6DFD3] text-[10px] sm:text-xs font-medium tracking-wider py-2 px-4 text-center select-none flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>🚚 2000 TL Üzeri Ücretsiz Kargo</span>
        <span className="opacity-30 hidden sm:inline">•</span>
        <span>💳 Peşin Fiyatına 3 Taksit İmkanı</span>
        <span className="opacity-30 hidden sm:inline">•</span>
        <span>🇹🇷 Yerli Üretim & Zanaatkar El İşçiliği</span>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-neutral-100 shadow-sm'
            : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-neutral-600 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-1.5 focus:outline-none">
            <span className="font-semibold text-lg tracking-tight text-neutral-900">paw<span className="text-neutral-500 font-light">love</span></span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-[13px] font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-neutral-600 hover:text-black transition-colors ${
                    isActive ? 'text-black font-semibold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="p-2 text-neutral-600 hover:text-black transition-colors focus:outline-none"
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.5} />
            </Link>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-neutral-600 hover:text-black transition-colors relative focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-between justify-content-center justify-items-center align-middle text-center justify-center border border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-30 bg-white md:hidden overflow-y-auto px-6 py-8 flex flex-col justify-between"
            style={{ height: 'calc(100vh - 4rem)' }}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-light text-neutral-800 hover:text-black block transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-neutral-100 pt-6 flex flex-col space-y-4">
              <Link href="/profile" className="flex items-center space-x-3 text-neutral-600 py-2">
                <User size={20} strokeWidth={1.5} />
                <span className="text-sm font-medium">Hesabım / Sipariş Takibi</span>
              </Link>
              <div className="text-[11px] text-neutral-400 font-light">
                © {new Date().getFullYear()} pawlove. Her hakkı saklıdır.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
