import { useState } from "react";
// import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiUploadCloud, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
    const [showPass, setShowPass] = useState(false);
    const [fileName, setFileName] = useState("");

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] p-6">

        <div className="w-full max-w-lg bg-[#09090b] border  border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
            <h2 className="text-3xl font-black text-white italic tracking-tighter mb-8 text-center uppercase">
                Register
            </h2>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Username</label>
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                            <input

                                type="text" placeholder="koda_01" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                            <input
                             type="email" placeholder="dev@koda.ui" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 relative">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Password</label>
                    <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm text-white focus:border-blue-500 outline-none transition-all font-black tracking-widest"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors cursor-pointer">
                            {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Profile Avatar</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group">
                        <FiUploadCloud className="text-neutral-600 group-hover:text-blue-500 mb-2" size={24} />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">
                            {fileName ? fileName : "Click to upload avatar"}
                        </span>
                        <input type="file" className="hidden" onChange={(e) => setFileName(e.target.value)} />
                    </label>
                </div>

                <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                    Initialize Account
                </button>
            </form>
        </div>
        </div>

    );
};

export default Register