import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Cpu, Globe, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Build', path: '/ai' },
    { name: 'About', path: '/about' },
    { name: 'Docs', path: '/docs' },
  ];

  
  const socialLink = [
    { name: "Twitter", path: "https://x.com/coderWithPankaj", icon: <Twitter /> },
    { name: "Linkedin", path: "https://www.linkedin.com/in/pankaj-kumar-838902253", icon: <Linkedin /> },
    { name: "Github", path: "https://github.com/pankaj800226", icon: <Github /> },
    { name: "Instagram", path: "https://www.instagram.com/pncoder", icon: <Instagram /> }
  ]

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#05070A] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <span className="text-lg font-black text-white tracking-tighter">
                Aria<span className="text-indigo-500">.ai</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">
              The next-generation AI web engineer. Building the future, one prompt at a time.
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Product</h4>
            {
              navLinks.map((link) => (
                <Link to={link.path} className="text-slate-500 hover:text-indigo-400 text-[11px] transition-colors w-fit">{link.name}</Link>
              ))
            }
          </div>
          {/* 
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Company</h4>
            {['About', 'Blog', 'Careers', 'Privacy'].map(link => (
              <a key={link} href="#" className="text-slate-500 hover:text-indigo-400 text-[11px] transition-colors w-fit">{link}</a>
            ))}
          </div> */}

          {/* System Status Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Status</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-white text-[10px] font-bold uppercase">All Systems Operational</span>
              </div>
              <p className="text-slate-500 text-[9px]">Aria Engine v1.0.4 - Global Edge</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
          <div className="flex items-center gap-6 mb-4 md:mb-0 text-slate-500">
            <span className="text-[10px] font-medium tracking-wide">© {currentYear} Aria.ai Inc.</span>
            <div className="flex items-center gap-2 text-[10px] hover:text-white cursor-pointer transition-all">
              <Globe size={12} />
              <span>English (US)</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {socialLink.map((social,i) => (
              <motion.p
                key={i}
                whileHover={{ y: -2, color: '#6366f1' }}
                className="text-slate-500 transition-colors"
              >
                <Link to={social.path}>
               {social.icon}
                </Link>
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;