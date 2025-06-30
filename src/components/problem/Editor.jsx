import { useEffect, useRef, useState } from "react";

function MonacoEditor({ code, onChange, language, onMount }) {
  const [Editor, setEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEditor = async () => {
      try {
        const { default: MonacoEditor } = await import("@monaco-editor/react");
        setEditor(() => MonacoEditor);
        setIsLoading(false);
      } catch (error) {
        //console.error("Failed to load Monaco Editor:", error);
        setIsLoading(false);
      }
    };

    loadEditor();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto mb-2"></div>
          <p className="text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!Editor) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 text-white">
        <p className="text-red-400">Failed to load editor</p>
      </div>
    );
  }

  const languageMap = {
    javascript: "javascript",
    java: "java",
    cpp: "cpp",
    python: "python",
  };

  return (
    <Editor
      height="100%"
      language={languageMap[language] || "python"}
      value={code}
      onChange={(value) => {
        //console.log("Editor onChange:", value); // Debug log
        onChange(value);
      }}
      theme="vs-dark"
      onMount={onMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        contextmenu: false,
        automaticLayout: true,
        wordWrap: "on",
        lineNumbers: "on",
        folding: true,
        renderWhitespace: "selection",
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
      }}
    />
  );
}

export default function CodeEditor({ code, setCode, language }) {
  const editorRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    //console.log("CodeEditor mounted with initial code:", code); // Debug log
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidPaste(() => {
      editor.trigger("keyboard", "undo", null);
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {});
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () => {});
  };

  if (!isMounted) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-pulse">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <MonacoEditor
        code={code}
        onChange={setCode}
        language={language}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
