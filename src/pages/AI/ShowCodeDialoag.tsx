import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeDialogProps = {
  files: Record<string, string>;
  activeFile: string;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
};

const getLanguage = (filename: string): string => {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "ts":
    case "tsx":
      return "tsx";

    case "js":
    case "jsx":
      return "jsx";

    case "css":
      return "css";

    case "html":
      return "markup";

    case "json":
      return "json";

    case "md":
      return "markdown";

    default:
      return "javascript";
  }
};

const ShowCodeDialog: React.FC<CodeDialogProps> = ({
  files,
  activeFile,
  setActiveFile,
}) => {
  const code = files[activeFile] ?? "// No source files.";

  return (
    <div className="absolute left-6 top-6 bottom-6 w-[500px] bg-[#0C0C0E]/95 backdrop-blur-2xl border border-white/10 rounded-2xl z-40 flex flex-col overflow-hidden shadow-2xl">
      {/* File Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5">
        {Object.keys(files).map((path) => (
          <button
            key={path}
            onClick={() => setActiveFile(path)}
            className={`text-[10px] font-mono px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              activeFile === path
                ? "bg-indigo-500 text-white"
                : "text-slate-500 hover:bg-white/5"
            }`}
          >
            {path.split("/").pop()}
          </button>
        ))}
      </div>

      {/* Code Viewer */}
      <div className="flex-1 overflow-auto">
        <SyntaxHighlighter
          language={getLanguage(activeFile)}
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            background: "transparent",
            padding: "20px",
            fontSize: "12px",
            margin: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default ShowCodeDialog;
