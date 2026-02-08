import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Menu, X, Cpu, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Route Array Setup
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Build', path: '/ai' },
    { name: 'About', path: '/about' },
    { name: 'Docs', path: '/docs' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
          isScrolled 
          ? 'bg-[#05070A]/80 backdrop-blur-xl border-white/10 py-3' 
          : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:rotate-6 transition-transform">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              Aria<span className="text-indigo-500">.ai</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation (Using Array) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-all cursor-pointer">
              <Github size={18} />
              <span className="text-xs font-bold">12.4k</span>
            </button>
            
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

            <button className="hidden md:flex px-5 py-2 bg-white text-[#05070A] rounded-xl text-xs font-bold hover:bg-slate-200 transition-all active:scale-95 items-center gap-2 cursor-pointer">
              Sign In
              <ExternalLink size={14} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-slate-300 p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 3. Mobile Slide-out Menu (Right Side) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />

            {/* Sidebar Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0C0C0E] border-l border-white/10 z-[120] p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-end mb-10">
                <button onClick={() => setIsMenuOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-black text-white hover:text-indigo-500 transition-colors flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-indigo-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Get Started <ExternalLink size={16} />
                </button>
                <div className="flex justify-center gap-6 mt-8 opacity-40">
                   <Github size={20} className="text-white" />
                   <span className="text-[10px] text-white font-bold uppercase tracking-widest">Aria v1.0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;