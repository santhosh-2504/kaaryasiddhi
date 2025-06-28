import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor({ code, onChange, language }) {
  const map = {
    javascript: "javascript",
    //python: "python",
  };

  return (
    <Editor
      height="400px"
      language={map[language]}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false
      }}
    />
  );
}

// function CodeEditor({ code, onChange, language }) {
//   return (
//     <div className="h-full w-full">
//       <textarea
//         value={code}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full h-full bg-slate-900 text-green-300 font-mono text-sm p-4 resize-none focus:outline-none"
//         placeholder={`Write your ${language} code here...`}
//       />
//     </div>
//   );
// }
