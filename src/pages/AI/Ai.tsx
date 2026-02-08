import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { api } from "../../api/api";
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserHtml from "prettier/plugins/html";
import parserPostcss from "prettier/plugins/postcss";
import {IoSend } from "react-icons/io5";
import { HiSparkles } from 'react-icons/hi'
import JSZip from "jszip";
import { Link } from "react-router-dom";
import ShowCodeDialoag from "./ShowCodeDialoag";
import AiHeader from "./AiHeader";

interface FileMap { [key: string]: string; }
interface GenerateResponse { files: FileMap; }

const Ai: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [history, setHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
    const [apikey, setApikey] = useState<string>("");
    const [files, setFiles] = useState<FileMap>({});
    const [activeFile, setActiveFile] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [showCodeDialog, setShowCodeDialog] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [fullView, setFullView] = useState(false)

    // Persistence logic
    useEffect(() => {
        const savedKey = localStorage.getItem("apikey");
        if (savedKey) setApikey(savedKey);
    }, []);

    useEffect(() => {
        if (apikey) localStorage.setItem("apikey", apikey);
    }, [apikey]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history, loading]);

    // code formate color
    const formatCode = async (code: string, filename: string): Promise<string> => {
        const ext = filename.split('.').pop();
        let parser = "babel";
        let plugins: any[] = [parserBabel, parserEstree];
        if (ext === 'html') { parser = "html"; plugins = [parserHtml]; }
        else if (ext === 'css') { parser = "css"; plugins = [parserPostcss]; }
        try {
            return await prettier.format(code, { parser, plugins, semi: true, singleQuote: false, printWidth: 80 });
        } catch (err) { return code; }
    };

    const generate = async (): Promise<void> => {
        if (!query || !apikey) { setError("Prompt and API key required"); return; }
        const currentQuery = query;
        setHistory(prev => [...prev, { role: 'user', text: currentQuery }]);
        setQuery("");
        setLoading(true);
        setError("");

        try {
            const res = await axios.post<GenerateResponse>(`${api}/api/ai/generate`, { query: currentQuery, apikey });
            const rawFiles = res.data.files;
            const formattedFiles: FileMap = {};
            await Promise.all(Object.entries(rawFiles).map(async ([path, content]) => {
                formattedFiles[path] = await formatCode(content, path);
            }));

            setFiles(formattedFiles);
            setHistory(prev => [...prev, { role: 'ai', text: "Project built successfully!" }]);
            const firstFile = Object.keys(formattedFiles).find(p => p.includes('index')) || Object.keys(formattedFiles)[0];
            setActiveFile(firstFile || "");
        } catch (err) {
            setError("Generation failed.");
        } finally {
            setLoading(false);
        }
    };

    const downloadSource = async () => {
        if (Object.keys(files).length === 0) return;
        try {
            const zip = new JSZip();
            Object.entries(files).forEach(([path, content]) => { zip.file(path, content); });
            const content = await zip.generateAsync({ type: "blob" });
            const url = window.URL.createObjectURL(content);
            const link = document.createElement("a");
            link.href = url;
            link.download = "ai-studio-source.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) { console.error("Download failed", err); }
    };

    const previewCode = useMemo(() => {
        let code = "";
        Object.keys(files).forEach((path) => {
            if (path.startsWith("components/")) code += files[path] + "\n\n";
        });
        code += files["pages/index.js"] || files["index.js"] || "";
        return code;
    }, [files]);

    const srcDoc = useMemo(() => `
    <!DOCTYPE html><html><head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.2.0",
        "react-dom": "https://esm.sh/react-dom@18.2.0",
        "lucide-react": "https://esm.sh/lucide-react@0.344.0",
        "framer-motion": "https://esm.sh/framer-motion@10.16.4"
      }
    }
    </script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>body { margin: 0; background: #ffffff; }</style></head>
    <body><div id="root"></div>
    <script type="text/babel" data-type="module">
      import React from 'react';
      import ReactDOM from 'react-dom';
      ${previewCode.replace(/import .* from .*/g, '')}
      if (typeof App !== 'undefined') { 
        ReactDOM.createRoot(document.getElementById("root")).render(<App />); 
      }
    </script></body></html>
  `, [previewCode]);

    if (error) return <p>{error}</p>

    return (
        <div className="flex h-screen bg-[#09090B] text-slate-300 font-sans overflow-hidden">
            {/* SIDEBAR */}
            <aside className="w-80 bg-[#0C0C0E] border-r border-white/5 flex flex-col z-20">
                <div className="p-6">
                    {/* logo name  */}
                    <Link to={'/'}>
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div
                                className="
      w-10 h-10
      bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500
      rounded-xl
      flex items-center justify-center
      shadow-lg shadow-indigo-500/30
      group-hover:scale-110
      transition
    "
                            >
                                <HiSparkles className="text-white text-xl" />
                            </div>

                            {/* Brand Name */}
                            <span className="font-extrabold text-2xl tracking-tight">

                                {/* Aira gradient text */}
                                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Aira
                                </span>

                                {/* small AI tag */}
                                <span className="ml-2 text-xs px-2 py-0.5 rounded-md bg-indigo-600/20 text-indigo-400 font not-italic">
                                    AI
                                </span>

                            </span>
                        </div>
                    </Link>

                    <input
                        type="password" placeholder="API Key" value={apikey}
                        onChange={(e) => setApikey(e.target.value)}
                        className="w-full  mt-5 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-[11px] outline-none focus:border-indigo-500/50"
                    />
                </div>


                <div className="flex-1 overflow-y-auto px-6 space-y-4 no-scrollbar">
                    {history.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-[11px] ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/[0.04] border border-white/10'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && <div className="text-[10px] text-indigo-400 animate-pulse uppercase tracking-widest">🧠 Building...</div>}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4">
                    <div className="relative">
                        <textarea
                            placeholder="Let's build..." value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } }}
                            className="w-full h-24 p-4 pr-12 bg-white/[0.03] border border-white/10 rounded-2xl text-[12px] outline-none focus:border-indigo-500/50 resize-none"
                        />
                        <button onClick={generate} disabled={loading || !query} className="absolute right-3 bottom-3 p-2.5 bg-indigo-600 text-white rounded-xl active:scale-90 transition-all">
                            <IoSend size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* MAIN VIEW */}
            <main className="flex-1 flex flex-col relative">
                {/* header  */}

                <AiHeader
                    showCodeDialog={showCodeDialog}
                    setShowCodeDialog={setShowCodeDialog}
                    files={files}
                    fullView={fullView}
                    setFullView={setFullView}
                    downloadSource={downloadSource}
                />

                <div className="flex-1 relative bg-[#09090B] overflow-hidden">
                    {Object.keys(files).length > 0 ? (
                        <>
                            {/* code show dialoag */}
                            {showCodeDialog && (
                                <ShowCodeDialoag
                                    files={files}
                                    activeFile={activeFile}
                                    setActiveFile={setActiveFile}
                                />
                            )}

                            <div className="w-full h-full bg-white animate-in fade-in duration-1000">
                                <iframe title="preview" srcDoc={srcDoc} className="w-full h-full border-none" />
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center relative">
                            {/* Background Grid Accent */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />


                            <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
                                <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                                    <HiSparkles className="text-indigo-500 text-2xl animate-pulse" />
                                </div>

                                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                                    Build with Aira<span className="text-indigo-500">.ai</span>
                                </h2>

                                {/* The "Copy Lining" type design */}
                                <div className="relative overflow-hidden group">
                                    <p className="text-slate-500 text-[11px] font-medium tracking-[0.2em] uppercase py-2">
                                        Enter a prompt to synthesize code
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
                                </div>

                                <p className="mt-8 text-[10px] text-slate-600 font-mono italic max-w-[200px]">
                                    "Try: Create a modern landing page with framer motion animations"
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div >
    );
};

export default Ai;