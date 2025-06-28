// import { useEffect, useState } from "react";
// import { useRef, useCallback } from "react";
// import QuestionPanel from "@/components/practice/QuestionPanel";
// import LanguageSelector from "@/components/practice/LanguageSelector";
// import CodeEditor from "@/components/practice/CodeEditor";
// import OutputBox from "@/components/practice/OutputBox";
// import CompileButton from "@/components/practice/CompileButton";
// import SubmitButton from "@/components/practice/SubmitButton";
// import DragHandle from "@/components/practice/DragHandle";
// export default function PracticePage() {
// const starterCode = {
//   javascript: `\nfunction main(input) {\n  // your code here\n}`,
//   python: `def main():\n    # your code here\n    pass`,
//   java: `public class Main {\n  public static void main(String[] args) {\n    // your code here\n  }\n}`
// };


// const dummyQuestion = {
//   title: "Sum of Even Numbers",
//   description: `Given an array of integers, find the sum of all even numbers.

// Input Format:
// - First line: n (size of array)
// - Second line: n space-separated integers

// Output Format:
// - Single integer: the sum of all even numbers in the array`,

//   publicTestCases: [
//     {
//       input: "6\n1 2 3 4 5 6",
//       expectedOutput: "12",
//       explanation: "Even numbers are 2, 4, 6. Sum = 12"
//     }
//   ],
//   hiddenTestCases: [
//   { input: "1\n0", expectedOutput: "0" },
//   { input: "1\n100", expectedOutput: "100" },
//   { input: "2\n-2 -4", expectedOutput: "-6" },
//   { input: "3\n-1 -2 -3", expectedOutput: "-2" },
//   { input: "5\n2 4 6 8 10", expectedOutput: "30" },
//   { input: "5\n1 3 5 7 9", expectedOutput: "0" },
//   { input: "10\n1 2 3 4 5 6 7 8 9 10", expectedOutput: "30" },
//   { input: "6\n2 2 2 2 2 2", expectedOutput: "12" },
//   { input: "8\n1 2 1 2 1 2 1 2", expectedOutput: "8" },
//   { input: "4\n999 998 997 996", expectedOutput: "1994" },
//   { input: "7\n0 0 0 0 0 0 0", expectedOutput: "0" },
//   { input: "4\n1000000 2000000 3000000 4000000", expectedOutput: "10000000" },
//   { input: "5\n-10 -20 -30 -40 -50", expectedOutput: "-150" },
//   { input: "3\n100 101 102", expectedOutput: "202" },
//   { input: "4\n-5 -10 -15 -20", expectedOutput: "-30" },
//   { input: "6\n13 24 35 46 57 68", expectedOutput: "138" },
//   { input: "2\n2147483646 2", expectedOutput: "2147483648" },
//   { input: "3\n999999 1000000 1000001", expectedOutput: "1000000" },
//   { input: "10\n-1 -2 -3 -4 -5 -6 -7 -8 -9 -10", expectedOutput: "-30" },
//   { input: "5\n42 43 44 45 46", expectedOutput: "132" }
// ]

// };


//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState(starterCode["javascript"]);
//   const [output, setOutput] = useState("");
//   const [question, setQuestion] = useState(null);
//   const [leftPanelWidth, setLeftPanelWidth] = useState(50); // Percentage for horizontal split
//   const [codeEditorHeight, setCodeEditorHeight] = useState(70); // Percentage for vertical split in right panel
//   const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
//   const [isResizingVertical, setIsResizingVertical] = useState(false);
  
//   const containerRef = useRef(null);
//   const rightPanelRef = useRef(null);
  
//   useEffect(() => {
//     setQuestion(dummyQuestion);
//   }, []);
  

//   useEffect(() => {
//     setCode(starterCode[language]);
//   }, [language]);

//   // Handle horizontal drag start (between question and code panels)
//   const handleHorizontalMouseDown = useCallback((e) => {
//     e.preventDefault();
//     setIsResizingHorizontal(true);
//     document.body.style.cursor = 'col-resize';
//     document.body.style.userSelect = 'none';
//   }, []);

//   // Handle vertical drag start (between code editor and output)
//   const handleVerticalMouseDown = useCallback((e) => {
//     e.preventDefault();
//     setIsResizingVertical(true);
//     document.body.style.cursor = 'row-resize';
//     document.body.style.userSelect = 'none';
//   }, []);

//   // Handle horizontal drag move
//   const handleHorizontalMouseMove = useCallback((e) => {
//     if (!isResizingHorizontal || !containerRef.current) return;
    
//     const container = containerRef.current;
//     const containerRect = container.getBoundingClientRect();
//     const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
//     // Constrain between 20% and 80%
//     const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
//     setLeftPanelWidth(constrainedWidth);
//   }, [isResizingHorizontal]);

//   // Handle vertical drag move
//   const handleVerticalMouseMove = useCallback((e) => {
//     if (!isResizingVertical || !rightPanelRef.current) return;
    
//     const rightPanel = rightPanelRef.current;
//     const rightPanelRect = rightPanel.getBoundingClientRect();
//     const headerHeight = 80; // Approximate header height
//     const availableHeight = rightPanelRect.height - headerHeight;
//     const newCodeHeight = ((e.clientY - rightPanelRect.top - headerHeight) / availableHeight) * 100;
    
//     // Constrain between 30% and 85%
//     const constrainedHeight = Math.min(Math.max(newCodeHeight, 30), 85);
//     setCodeEditorHeight(constrainedHeight);
//   }, [isResizingVertical]);

//   // Handle mouse up for both directions
//   const handleMouseUp = useCallback(() => {
//     setIsResizingHorizontal(false);
//     setIsResizingVertical(false);
//     document.body.style.cursor = '';
//     document.body.style.userSelect = '';
//   }, []);

//   // Add/remove event listeners for horizontal drag
//   useEffect(() => {
//     if (isResizingHorizontal) {
//       document.addEventListener('mousemove', handleHorizontalMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
      
//       return () => {
//         document.removeEventListener('mousemove', handleHorizontalMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isResizingHorizontal, handleHorizontalMouseMove, handleMouseUp]);

//   // Add/remove event listeners for vertical drag
//   useEffect(() => {
//     if (isResizingVertical) {
//       document.addEventListener('mousemove', handleVerticalMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
      
//       return () => {
//         document.removeEventListener('mousemove', handleVerticalMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isResizingVertical, handleVerticalMouseMove, handleMouseUp]);

//   // Prevent text selection during resize
//   useEffect(() => {
//     if (isResizingHorizontal || isResizingVertical) {
//       document.body.classList.add('select-none');
//     } else {
//       document.body.classList.remove('select-none');
//     }
    
//     return () => {
//       document.body.classList.remove('select-none');
//     };
//   }, [isResizingHorizontal, isResizingVertical]);

//   return (
//     <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
//       {/* Fixed header space */}
//       <div className="h-16 bg-slate-800 flex items-center px-6">
//         <h1 className="text-white text-xl font-semibold">Code Practice Platform</h1>
//       </div>
      
//       {/* Main content area */}
//       <div 
//         ref={containerRef}
//         className="flex flex-1 overflow-hidden"
//       >
//         {/* Question Panel */}
//         <div 
//           className="flex flex-col bg-white dark:bg-slate-800 shadow-xl border-r border-gray-200 dark:border-slate-700 transition-all duration-100 ease-out overflow-hidden"
//           style={{ width: `${leftPanelWidth}%` }}
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-white p-4 shrink-0">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold ">Problem Statement</h2>
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
//                 {/* <span className="text-sm text-emerald-100">
//                   {leftPanelWidth.toFixed(0)}% width
//                 </span> */}
//               </div>
//             </div>
//           </div>
          
//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-6">
//             <QuestionPanel question={question} />
//           </div>
//         </div>

//         {/* Horizontal Drag Handle */}
//         <DragHandle 
//           onDrag={handleHorizontalMouseDown} 
//           isResizing={isResizingHorizontal}
//           orientation="vertical"
//         />

//         {/* Code Panel */}
//         <div 
//           ref={rightPanelRef}
//           className="flex flex-col bg-white dark:bg-slate-800 shadow-xl transition-all duration-100 ease-out overflow-hidden"
//           style={{ width: `${100 - leftPanelWidth}%` }}
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white p-4 border-b border-slate-600 shrink-0">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold">Code Playground</h2>
//               <div className="flex items-center gap-2">
//                 {/* <span className="text-sm text-slate-300">
//                   {(100 - leftPanelWidth).toFixed(0)}% width | {codeEditorHeight.toFixed(0)}% height
//                 </span> */}
//                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//               <LanguageSelector language={language} onChange={setLanguage} />
//               </div>
//             </div>
//           </div>
          
//           {/* Code Editor */}
//           <div 
//             className="bg-slate-900 overflow-hidden"
//             style={{ height: `${codeEditorHeight}%` }}
//           >
//             <CodeEditor code={code} onChange={setCode} language={language} />
//           </div>
          
//           {/* Vertical Drag Handle */}
//           <DragHandle 
//             onDrag={handleVerticalMouseDown} 
//             isResizing={isResizingVertical}
//             orientation="horizontal"
//           />
          
//           {/* Output Section */}
//           <div 
//             className="flex flex-col bg-slate-100 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 overflow-hidden"
//             style={{ height: `${100 - codeEditorHeight}%` }}
//           >
//             {/* Actions */}
//             <div className="p-4 border-b border-slate-200 dark:border-slate-600 shrink-0">
//               <div className="flex gap-3">
//                 <CompileButton code={code} language={language} setOutput={setOutput} />
//                 <SubmitButton
//                   code={code}
//                   language={language}
//                   hiddenTestCases={question?.hiddenTestCases || []}
//                   setOutput={setOutput}
//                 />
//               </div>
//             </div>
            
//             {/* Output Box */}
//             <div className="flex-1 p-4 overflow-hidden">
//               <OutputBox output={output} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPotd } from "@/store/slices/practiceSlice"; // Adjust path as needed
import QuestionPanel from "@/components/practice/QuestionPanel";
import LanguageSelector from "@/components/practice/LanguageSelector";
import CodeEditor from "@/components/practice/CodeEditor";
import OutputBox from "@/components/practice/OutputBox";
import CompileButton from "@/components/practice/CompileButton";
import SubmitButton from "@/components/practice/SubmitButton";
import DragHandle from "@/components/practice/DragHandle";

export default function PracticePage() {
  const dispatch = useDispatch();
  const { potd, loading, error } = useSelector((state) => state.practice);

  // Default starter code - will be overridden by potd data
  const defaultStarterCode = {
    javascript: `\nfunction main(input) {\n  // your code here\n}`,
    python: `def main():\n    # your code here\n    pass`,
    java: `public class Main {\n  public static void main(String[] args) {\n    // your code here\n  }\n}`
  };

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultStarterCode["javascript"]);
  const [output, setOutput] = useState("");
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [codeEditorHeight, setCodeEditorHeight] = useState(70);
  const [isResizingHorizontal, setIsResizingHorizontal] = useState(false);
  const [isResizingVertical, setIsResizingVertical] = useState(false);
  
  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);
  
  // Fetch POTD on component mount
  useEffect(() => {
    dispatch(fetchPotd());
  }, [dispatch]);

  // Update code when language changes or when potd is loaded
  useEffect(() => {
    if (potd?.starterCode?.[language]) {
      setCode(potd.starterCode[language]);
    } else {
      setCode(defaultStarterCode[language]);
    }
  }, [language, potd]);

  // Handle horizontal drag start (between question and code panels)
  const handleHorizontalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizingHorizontal(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  // Handle vertical drag start (between code editor and output)
  const handleVerticalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizingVertical(true);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';
  }, []);

  // Handle horizontal drag move
  const handleHorizontalMouseMove = useCallback((e) => {
    if (!isResizingHorizontal || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    const constrainedWidth = Math.min(Math.max(newLeftWidth, 20), 80);
    setLeftPanelWidth(constrainedWidth);
  }, [isResizingHorizontal]);

  // Handle vertical drag move
  const handleVerticalMouseMove = useCallback((e) => {
    if (!isResizingVertical || !rightPanelRef.current) return;
    
    const rightPanel = rightPanelRef.current;
    const rightPanelRect = rightPanel.getBoundingClientRect();
    const headerHeight = 80; // Approximate header height
    const availableHeight = rightPanelRect.height - headerHeight;
    const newCodeHeight = ((e.clientY - rightPanelRect.top - headerHeight) / availableHeight) * 100;
    
    // Constrain between 30% and 85%
    const constrainedHeight = Math.min(Math.max(newCodeHeight, 30), 85);
    setCodeEditorHeight(constrainedHeight);
  }, [isResizingVertical]);

  // Handle mouse up for both directions
  const handleMouseUp = useCallback(() => {
    setIsResizingHorizontal(false);
    setIsResizingVertical(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  // Add/remove event listeners for horizontal drag
  useEffect(() => {
    if (isResizingHorizontal) {
      document.addEventListener('mousemove', handleHorizontalMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleHorizontalMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizingHorizontal, handleHorizontalMouseMove, handleMouseUp]);

  // Add/remove event listeners for vertical drag
  useEffect(() => {
    if (isResizingVertical) {
      document.addEventListener('mousemove', handleVerticalMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleVerticalMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizingVertical, handleVerticalMouseMove, handleMouseUp]);

  // Prevent text selection during resize
  useEffect(() => {
    if (isResizingHorizontal || isResizingVertical) {
      document.body.classList.add('select-none');
    } else {
      document.body.classList.remove('select-none');
    }
    
    return () => {
      document.body.classList.remove('select-none');
    };
  }, [isResizingHorizontal, isResizingVertical]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Loading today's problem...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Failed to Load Problem</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchPotd())}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No problem available
  if (!potd) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-400 text-6xl mb-4">📝</div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">No Problem Available</h2>
          <p className="text-slate-600 dark:text-slate-400">No problem of the day found for your current level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* Fixed header space
      <div className="h-16 bg-slate-800 flex items-center px-6">
        <h1 className="md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Code Practice Platform</h1>
        <div className="ml-auto text-emerald-400 text-sm">
          Level {potd.level} • {potd.difficulty}
        </div>
      </div> */}
      
      {/* Main content area */}
      <div 
        ref={containerRef}
        className="flex flex-1 overflow-hidden"
      >
        {/* Question Panel */}
        <div 
          className="flex flex-col bg-white dark:bg-slate-800 shadow-xl border-r border-gray-200 dark:border-slate-700 transition-all duration-100 ease-out overflow-hidden"
          style={{ width: `${leftPanelWidth}%` }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 text-white p-4 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Problem Statement</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <QuestionPanel question={potd} />
          </div>
        </div>

        {/* Horizontal Drag Handle */}
        <DragHandle 
          onDrag={handleHorizontalMouseDown} 
          isResizing={isResizingHorizontal}
          orientation="vertical"
        />

        {/* Code Panel */}
        <div 
          ref={rightPanelRef}
          className="flex flex-col bg-white dark:bg-slate-800 shadow-xl transition-all duration-100 ease-out overflow-hidden"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white p-4 border-b border-slate-600 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Code Playground</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <LanguageSelector language={language} onChange={setLanguage} />
              </div>
            </div>
          </div>
          
          {/* Code Editor */}
          <div 
            className="bg-slate-900 overflow-hidden"
            style={{ height: `${codeEditorHeight}%` }}
          >
            <CodeEditor code={code} onChange={setCode} language={language} />
          </div>
          
          {/* Vertical Drag Handle */}
          <DragHandle 
            onDrag={handleVerticalMouseDown} 
            isResizing={isResizingVertical}
            orientation="horizontal"
          />
          
          {/* Output Section */}
          <div 
            className="flex flex-col bg-slate-100 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 overflow-hidden"
            style={{ height: `${100 - codeEditorHeight}%` }}
          >
            {/* Actions */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-600 shrink-0">
              <div className="flex gap-3">
                <CompileButton 
                 code={code} 
                    language={language} 
                    publicTestCases={potd?.publicTestCases} // Add this prop
                    setOutput={setOutput} 
                  />
                <SubmitButton
                  code={code}
                  language={language}
                  hiddenTestCases={potd?.hiddenTestCases || []}
                  setOutput={setOutput}
                />
              </div>
            </div>
            
            {/* Output Box */}
            <div className="flex-1 p-4 overflow-hidden">
              <OutputBox output={output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}