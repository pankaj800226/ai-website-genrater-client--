import { Maximize, Minimize2, Code2, Download, ExternalLink } from "lucide-react";
import type React from "react";
import { Button } from '@mui/material';

type aiHeaderProps = {
    showCodeDialog: boolean;
    setShowCodeDialog: React.Dispatch<React.SetStateAction<boolean>>;
    files: object;
    fullView: boolean;
    setFullView: React.Dispatch<React.SetStateAction<boolean>>;
    downloadSource: () => void;
    openFullView: () => void; // This will trigger the Blob URL logic in your main file
}

const AiHeader: React.FC<aiHeaderProps> = ({ 
    showCodeDialog, 
    setShowCodeDialog, 
    files, 
    fullView, 
    setFullView, 
    downloadSource, 
    openFullView 
}) => {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#09090B]/80 backdrop-blur-xl sticky top-0 z-50">
            
    
            {/* CENTER: Workspace Controls (Centered Layout) */}
            <div className="flex items-center overflow-auto w-[50%] bg-white/5 border border-white/10 p-1 rounded-xl shadow-2xl">
                {/* Code Inspector Toggle */}
                <button
                    onClick={() => setShowCodeDialog(!showCodeDialog)}
                    className={`flex items-center cursor-pointer gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 ${
                        showCodeDialog
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <Code2 size={14} />
                    <span>INSPECTOR</span>
                </button>

                <div className="w-[1px] h-4 bg-white/10 mx-1" />

                {/* Sidebar Toggle (Full Workspace View) */}
                <button
                    onClick={() => setFullView(!fullView)}
                    className={`flex cursor-pointer items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 ${
                        !fullView // If fullView is false, it means we are in "Full Workspace" mode
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {fullView ? <Maximize size={14} /> : <Minimize2 size={14} />}
                    <span>WORKSPACE</span>
                </button>

                <div className="w-[1px] h-4 bg-white/10 mx-1" />

                {/* THE NEW TAB ACTION: Launch to Laptop Screen */}
                <button
                    onClick={openFullView}
                    className="flex cursor-pointer items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-bold text-indigo-400 hover:text-white hover:bg-indigo-600 transition-all duration-300"
                >
                    <ExternalLink size={14} />
                    <span>LAUNCH</span>
                </button>
            </div>

            {/* RIGHT: Export Actions */}
            <div className="flex justify-end w-1/4 gap-3">
                    {Object.keys(files).length > 0 && (
                    <Button
                        onClick={downloadSource}
                        sx={{
                            textTransform: 'none',
                            borderRadius: '10px',
                            padding: '6px 16px',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: '#fff',
                            color: '#000',
                            cursor: "pointer",
                            '&:hover': {
                                backgroundColor: '#f4f4f5',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            },
                            transition: 'all 0.2s'
                        }}
                        startIcon={<Download size={14} />}
                    >
                        Export Zip
                    </Button>
                )}
            </div>
        </header>
    );
};

export default AiHeader;