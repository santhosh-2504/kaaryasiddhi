import { useEffect, useState, useRef, useCallback } from "react";
import RunButton from "@/components/problem/RunButton";
import CodeEditor from "@/components/problem/Editor";
import OutputBox from "@/components/problem/OutputBox";
import SubmitButton from "@/components/problem/SubmitButton";
import LanguageSelector from "@/components/problem/LanguageSelector";
import QuestionPanel from "@/components/problem/QuestionPanel";
import DragHandle from "@/components/practice/DragHandle";

export default function ProblemsPage() {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [codeEditorHeight, setCodeEditorHeight] = useState(70);
  const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
  const [isResizingVertical, setIsResizingVertical] = useState(false);

  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await fetch("/api/problem/last");
        if (!res.ok) throw new Error("Failed to fetch problem");
        const json = await res.json();
        if (json.success) {
          setProblem(json.data);
          ////console.log("Fetched problem:", json.data); // Debug log
        } else {
          throw new Error("Problem data not found");
        }
      } catch (err) {
        setOutput(`💥 Error fetching problem: ${err.message}`);
      }
    }
    fetchProblem();
  }, []);

  useEffect(() => {
    if (problem) {
      const starter = problem.starterCode.find(
        (s) => s.language === selectedLanguage,
      );
      setCode(starter?.code || "");
      ////console.log("Updated code for language", selectedLanguage, ":", starter?.code); // Debug log
    }
  }, [problem, selectedLanguage]);

  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
    ////console.log("Code updated in parent:", newCode); // Debug log
  }, []);

  const handleHorizontalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizingHorizontal(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleVerticalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizingVertical(true);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  }, []);

  const handleHorizontalMouseMove = useCallback(
    (e) => {
      if (!isResizingHorizontal || !containerRef.current) return;
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
      setLeftPanelWidth(constrainedWidth);
    },
    [isResizingHorizontal],
  );

  const handleVerticalMouseMove = useCallback(
    (e) => {
      if (!isResizingVertical || !rightPanelRef.current) return;
      const rightPanel = rightPanelRef.current;
      const rightPanelRect = rightPanel.getBoundingClientRect();
      const headerHeight = 80;
      const availableHeight = rightPanelRect.height - headerHeight;
      const newCodeHeight =
        ((e.clientY - rightPanelRect.top - headerHeight) / availableHeight) *
        100;
      const constrainedHeight = Math.min(Math.max(newCodeHeight, 30), 85);
      setCodeEditorHeight(constrainedHeight);
    },
    [isResizingVertical],
  );

  const handleMouseUp = useCallback(() => {
    setIsResizingHorizontal(false);
    setIsResizingVertical(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isResizingHorizontal) {
      document.addEventListener("mousemove", handleHorizontalMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleHorizontalMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizingHorizontal, handleHorizontalMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isResizingVertical) {
      document.addEventListener("mousemove", handleVerticalMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleVerticalMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizingVertical, handleVerticalMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isResizingHorizontal || isResizingVertical) {
      document.body.classList.add("select-none");
    } else {
      document.body.classList.remove("select-none");
    }
    return () => {
      document.body.classList.remove("select-none");
    };
  }, [isResizingHorizontal, isResizingVertical]);

  if (!problem) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Loading today's problem...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      <div className="h-16 bg-slate-800 flex items-center px-6 shrink-0 z-10">
        <h1 className="text-xl font-semibold text-white">
          Code Practice Platform
        </h1>
        <div className="ml-auto flex items-center gap-4 pr-6">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            supportedLanguages={
              problem.supportedLanguages || [
                "python",
                "javascript",
                "java",
                "cpp",
              ]
            }
          />
        </div>
      </div>

      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        <div
          className="flex flex-col bg-white dark:bg-slate-800 shadow-xl border-r border-gray-200 dark:border-slate-700 transition-all duration-100 ease-out overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-white p-4 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Problem Statement</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <QuestionPanel question={problem} />
          </div>
        </div>

        <DragHandle
          onDrag={handleHorizontalMouseDown}
          isResizing={isResizingHorizontal}
          orientation="vertical"
        />

        <div
          ref={rightPanelRef}
          className="flex flex-col bg-white dark:bg-slate-800 shadow-xl transition-all duration-100 ease-out overflow-hidden"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white p-4 border-b border-slate-600 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code Playground</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div
            className="bg-slate-900 overflow-hidden"
            style={{ height: `${codeEditorHeight}%` }}
          >
            <CodeEditor
              code={code}
              setCode={handleCodeChange}
              language={selectedLanguage}
            />
          </div>

          <DragHandle
            onDrag={handleVerticalMouseDown}
            isResizing={isResizingVertical}
            orientation="horizontal"
          />

          <div
            className="flex flex-col bg-slate-100 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 overflow-hidden"
            style={{ height: `${100 - codeEditorHeight}%` }}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-600 shrink-0">
              <div className="flex gap-3">
                <RunButton
                  userCode={code}
                  problem={problem}
                  language={selectedLanguage}
                  setOutput={setOutput}
                />
                <SubmitButton
                  userCode={code}
                  problem={problem}
                  language={selectedLanguage}
                  setOutput={setOutput}
                />
              </div>
            </div>
            <div className="flex-1 p-4 overflow-hidden">
              <OutputBox output={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
