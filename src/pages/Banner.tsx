import { motion } from 'framer-motion';
import { Zap, Github, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05070A] flex flex-col items-center justify-center px-4 sm:px-6">
      
      {/* Bolt-style Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }} 
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center py-20">
        
        {/* Version Badge - Responsive text size */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 sm:mb-8"
        >
          <Sparkles size={10} className="text-indigo-400 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] cursor-pointer font-bold text-indigo-400 uppercase tracking-widest">
            Aria.ai v1 is Live
          </span>
        </motion.div>

        {/* Main Title - Responsive sizing and leading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-[1] sm:leading-[0.9] mb-6 sm:mb-8"
        >
          Prompt to <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
            Production.
          </span>
        </motion.h1>

        {/* Subtext - Balanced width on mobile */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xs sm:max-w-2xl text-slate-400 text-sm sm:text-lg md:text-xl font-medium leading-relaxed mb-10 sm:mb-12"
        >
          Stop writing boilerplate. Aria turns your natural language into 
          fully-deployed, production-ready React applications in seconds.
        </motion.p>

        {/* TWO ANIMATED BUTTONS - Column on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          
          <Link to={'/ai'} className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-indigo-600 rounded-xl sm:rounded-2xl font-black text-white text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer shadow-[0_0_30px_rgba(79,70,229,0.2)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Zap size={16} fill="currentColor" />
              Start Building Free
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent border border-white/10 text-white rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Github size={16} />
            View on GitHub
          </motion.button>
        </div>

        {/* Technical Trust Badges - Grid for mobile, Flex for desktop */}
        <div className="grid grid-cols-2 sm:flex items-center justify-center gap-6 sm:gap-8 mt-16 sm:mt-20 opacity-40 grayscale hover:grayscale-0 transition-all">
           <div className="flex flex-col items-center">
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">10x</span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[2px] text-slate-500 text-center">Fast Dev</span>
           </div>
           
           <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
           
           <div className="flex flex-col items-center">
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">0ms</span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[2px] text-slate-500 text-center">Latency</span>
           </div>

           <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

           <div className="flex flex-col items-center col-span-2 sm:col-span-1">
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">∞</span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-[2px] text-slate-500 text-center">Scalable</span>
           </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />

      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full sm:w-3/4 h-64 bg-indigo-600/20 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Banner;