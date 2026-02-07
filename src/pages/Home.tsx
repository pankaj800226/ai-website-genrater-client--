import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { api } from "../api/api";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";
import parserHtml from "prettier/plugins/html";
import parserPostcss from "prettier/plugins/postcss";
import { IoCodeSlashSharp } from "react-icons/io5";
import { GoCode } from "react-icons/go";
import JSZip from "jszip";

interface FileMap { [key: string]: string; }
interface GenerateResponse { files: FileMap; }

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [history, setHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [apikey, setApikey] = useState<string>("");
  const [files, setFiles] = useState<FileMap>({});
  const [activeFile, setActiveFile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showCodeDialog, setShowCodeDialog] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);


  //api key save
  useEffect(() => {
    const savedKey = localStorage.getItem("ai_builder_apikey");
    if (savedKey) setApikey(savedKey);
  }, []);

  useEffect(() => {
    if (apikey) localStorage.setItem("ai_builder_apikey", apikey);
  }, [apikey]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  // user query save in localstorage 
  // useEffect(()=>{

  // })



  // code formating color
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

  // main logic ai genrate btn 
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
      setHistory(prev => [...prev, { role: 'ai', text: "Project built successfully! You can now preview or download the source." }]);
      const firstFile = Object.keys(formattedFiles).find(p => p.includes('index')) || Object.keys(formattedFiles)[0];
      setActiveFile(firstFile || "");
    } catch (err) {
      setError("Generation failed.");
      setHistory(prev => [...prev, { role: 'ai', text: "Error during construction." }]);
    } finally {
      setLoading(false);
    }
  };

  // --- NATIVE DOWNLOAD LOGIC (No file-saver needed) ---
  const downloadSource = async () => {
    if (Object.keys(files).length === 0) return;
    try {
      const zip = new JSZip();
      Object.entries(files).forEach(([path, content]) => {
        zip.file(path, content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-project-source.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const previewCode = useMemo(() => {
    let code = "";
    console.log("code", code);

    Object.keys(files).forEach((path) => {
      if (path.startsWith("components/")) code += files[path] + "\n\n";
    });
    code += files["pages/index.js"] || files["index.js"] || "";
    return code;
  }, [files]);

  const srcDoc = useMemo(() => `
    <!DOCTYPE html><html><head>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
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
    <style>
      body { margin: 0; background: #ffffff; font-family: sans-serif; }
      #root { width: 100%; min-height: 100vh; }
    </style></head>
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



  return (
    <div className="flex h-screen bg-[#05070A] text-slate-300 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-96 bg-[#0B0F1A] border-r border-white/5 flex flex-col z-20">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xs">AI</span>
            </div>
            <span className="font-bold text-white tracking-tight uppercase">AI Studio</span>
          </div>
          <input
            type="password" placeholder="Gemini API Key" value={apikey}
            onChange={(e) => setApikey(e.target.value)}
            className="w-full mt-4 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {history.length === 0 && (
            <p className="text-slate-500 text-xs text-center mt-10">What should we build today?</p>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="text-[10px] text-indigo-400 animate-pulse text-center">Constructing Virtual DOM...</div>}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 bg-[#0B0F1A] border-t border-white/5">
          <div className="relative">
            <textarea
              placeholder="Describe your app..." value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate(); } }}
              className="w-full h-24 p-4 pr-12 bg-[#13171F] border border-white/10 rounded-2xl text-xs outline-none focus:border-indigo-500 resize-none"
            />
            <button
              onClick={generate} disabled={loading || !query}
              className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all disabled:opacity-30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          {error && <p className="text-red-500 text-[10px] mt-2 text-center">{error}</p>}
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 relative flex flex-col">
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#05070A] z-50">

          <button
            onClick={() => setShowCodeDialog(!showCodeDialog)}
            className={`px-4 py-1.5 border rounded-xl text-[11px] font-bold transition-all ${showCodeDialog ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'border-white/10 hover:bg-white/5 text-slate-400 cursor-pointer'}`}
          >
            {showCodeDialog ? <GoCode /> : <IoCodeSlashSharp />}
          </button>

          {showCodeDialog && (

            <button
              onClick={downloadSource}
              disabled={Object.keys(files).length === 0}
              className="px-4 py-1.5 rounded-lg bg-white text-[#05070A] text-[11px] font-bold hover:bg-slate-200 transition-all disabled:opacity-20 active:scale-95"
            >
              Download Source
            </button>
          )}
        </header>

        <div className="flex-1 relative bg-white overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />

          {showCodeDialog && (
            <div className="absolute left-6 top-6 bottom-6 w-[600px] bg-[#0B0F1A]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden">
              <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
                {Object.keys(files).map(path => (
                  <button
                    key={path} onClick={() => setActiveFile(path)}
                    className={`text-[10px] font-mono px-3 py-1 rounded-lg transition-all ${activeFile === path ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300 bg-white/5'}`}
                  >
                    {path.split('/').pop()}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-auto">
                <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ background: 'transparent', padding: '24px', fontSize: '11px' }} showLineNumbers>
                  {files[activeFile] || "// No source files."}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className="relative z-10 w-full h-full">
            {Object.keys(files).length > 0 ? (
              <iframe title="preview" srcDoc={srcDoc} className="w-full h-full border-none block" />
            ) : (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <p className="text-gray-700 text-4xl text-center font-semibold leading-snug max-w-2xl">
                  Welcome back 👋 Describe your idea and let AI generate your website in seconds.
                </p>
              </div>

            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;