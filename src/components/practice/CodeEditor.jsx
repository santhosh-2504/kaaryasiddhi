import dynamic from "next/dynamic";
import { useRef } from "react";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function CodeEditor({ code, onChange, language }) {
  const editorRef = useRef(null);

  const map = {
    javascript: "javascript",
    // python: "python",
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // ❌ Prevent paste
    editor.onDidPaste(() => {
      editor.trigger("keyboard", "undo", null);
    });

    // Optional: disable right-click context menu
    editor.updateOptions({
      contextmenu: false,
    });

    // Optional: disable Ctrl+V (paste)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {    });
  };

  return (
    <Editor
      height="400px"
      language={map[language]}
      value={code}
      onChange={onChange}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        clipboard: false, // disables some clipboard behaviors
      }}
    />
  );
}
