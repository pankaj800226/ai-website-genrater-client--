import { motion, AnimatePresence } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-full bg-transparent">
      <div className="relative flex items-center justify-center">
        
        {/* Futuristic Hexagon/Aria Ring */}
        <motion.div
          animate={{
            rotate: [0, 360],
            borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%", "30% 70% 70% 30% / 30% 30% 70% 70%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-32 h-32 border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm"
        />
        
        {/* Fast Spinning Inner Orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-20 h-20 border-b-2 border-indigo-400/60 rounded-full"
        />

        {/* Aria.ai Logo Text in Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <span className="text-xl font-black text-white tracking-tighter">
            Aria<span className="text-indigo-500">.ai</span>
          </span>
          <motion.div 
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-0.5"
          />
        </motion.div>
      </div>

      {/* Loading Status Text */}
      <div className="mt-16 text-center">
        <div className="flex items-center gap-2 mb-2 justify-center">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          <motion.h3
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-300 font-bold tracking-[0.2em] uppercase text-[10px]"
          >
            Aria is Thinking
          </motion.h3>
        </div>

        {/* Shimmering Subtext */}
        <div className="overflow-hidden h-4">
          <motion.p
            animate={{ y: [20, 0, -20] }}
            transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
            className="text-[9px] text-slate-500 font-mono italic"
          >
            Compiling neural modules...
          </motion.p>
          <motion.p
            animate={{ y: [20, 0, -20] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
            className="text-[9px] text-slate-500 font-mono italic"
          >
            Optimizing React components...
          </motion.p>
        </div>
      </div>
      
      {/* Visual File Progress Bar */}
      <div className="mt-6 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-indigo-600 shadow-[0_0_10px_#6366f1]"
        />
      </div>
    </div>
  );
};

export default Loading;