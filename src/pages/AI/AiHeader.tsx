import { Maximize } from "lucide-react"
import type React from "react";
import { IoCodeSlashSharp, IoDownloadOutline } from "react-icons/io5"

type aiHeaderProps = {
    showCodeDialog: boolean
    setShowCodeDialog: React.Dispatch<React.SetStateAction<boolean>>;
    files: object
    fullView: boolean,
    setFullView: React.Dispatch<React.SetStateAction<boolean>>;
    downloadSource: () => void
}

const AiHeader: React.FC<aiHeaderProps> = ({ showCodeDialog, setShowCodeDialog, files, fullView, setFullView, downloadSource }) => {
    return (
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#09090B]">

            <button onClick={() => setShowCodeDialog(!showCodeDialog)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${showCodeDialog ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
                <IoCodeSlashSharp size={16} /> <span>Inspector</span>
            </button>

            {/* full view iframe  */}
            <button onClick={() => setFullView(!fullView)} className="text-2xl cursor-pointer">
                <Maximize />
            </button>

            {Object.keys(files).length > 0 && (
                <button onClick={downloadSource} className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-[#09090B] text-[11px] font-bold hover:bg-indigo-50 active:scale-95 transition-all shadow-sm">
                    <IoDownloadOutline size={14} /> Download Source
                </button>
            )}
        </header>
    )
}

export default AiHeader
