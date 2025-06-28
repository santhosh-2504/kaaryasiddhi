// export default function QuestionPanel({ question }) {
//   if (!question) return <div>Loading question...</div>;

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">{question.title}</h2>
//       <p className="mb-4 whitespace-pre-wrap">{question.description}</p>
//       <h3 className="font-semibold mb-2">Public Test Cases:</h3>
//       <ul className="list-disc list-inside space-y-2">
//         {question.publicTestCases.map((tc, idx) => (
//           <li key={idx}>
//             <strong>Input:</strong> {tc.input}<br />
//             <strong>Expected:</strong> {tc.expectedOutput}<br />
//             <strong>Explanation:</strong> {tc.explanation}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default function QuestionPanel({ question, isMinimized = false }) {
//   if (!question) return (
//     <div className="flex items-center justify-center h-40">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
//       <span className="ml-3 text-slate-600 dark:text-slate-300">Loading question...</span>
//     </div>
//   );

//   if (isMinimized) {
//     return (
//       <div className="space-y-3">
//         <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate">
//           {question.title}
//         </h3>
//         <div className="text-sm text-slate-600 dark:text-slate-400">
//           <div className="flex items-center gap-2 mb-2">
//             <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//             <span>{question.publicTestCases.length} test case(s)</span>
//           </div>
//           <p className="line-clamp-3">{question.description}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
//           <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
//           {question.title}
//         </h3>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
//           <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
//             {question.description}
//           </p>
//         </div>
//       </div>

//       <div>
//         <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
//           <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
//             <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">T</span>
//           </div>
//           Public Test Cases
//         </h4>
//         <div className="space-y-4">
//           {question.publicTestCases.map((tc, idx) => (
//             <div key={idx} className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
//                   Test Case {idx + 1}
//                 </span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Input:</span>
//                   <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
//                     {tc.input}
//                   </code>
//                 </div>
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Expected:</span>
//                   <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
//                     {tc.expectedOutput}
//                   </code>
//                 </div>
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Explanation:</span>
//                   <span className="ml-2 text-slate-600 dark:text-slate-400">{tc.explanation}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function QuestionPanel({ question }) {
//   if (!question) return (
//     <div className="flex items-center justify-center h-40">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
//       <span className="ml-3 text-slate-600 dark:text-slate-300">Loading question...</span>
//     </div>
//   );

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
//           <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
//           {question.title}
//         </h3>
//         <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
//           <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
//             {question.description}
//           </p>
//         </div>
//       </div>

//       <div>
//         <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
//           <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
//             <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">T</span>
//           </div>
//           Public Test Cases
//         </h4>
//         <div className="space-y-4">
//           {question.publicTestCases.map((tc, idx) => (
//             <div key={idx} className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
//                   Test Case {idx + 1}
//                 </span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Input:</span>
//                   <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
//                     {tc.input}
//                   </code>
//                 </div>
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Expected:</span>
//                   <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
//                     {tc.expectedOutput}
//                   </code>
//                 </div>
//                 <div>
//                   <span className="font-medium text-slate-700 dark:text-slate-300">Explanation:</span>
//                   <span className="ml-2 text-slate-600 dark:text-slate-400">{tc.explanation}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef, useCallback } from "react";
// import { GripVertical, Play, Send } from "lucide-react";

// const starterCode = {
//   javascript: `function main(input) {\n  // your code here\n}`,
//   python: `def main():\n    # your code here\n    pass`,
//   java: `public class Main {\n  public static void main(String[] args) {\n    // your code here\n  }\n}`
// };

// const dummyQuestion = {
//   title: "Reverse Array",
//   description: `Given an array of integers, return the array in reverse order.

// Input Format:
// - First line: n (size of array)
// - Second line: n space-separated integers

// Output Format:
// - n space-separated integers in reverse order`,
  
//   publicTestCases: [
//     { 
//       input: "4\n1 2 3 4", 
//       expectedOutput: "4 3 2 1", 
//       explanation: "Reverse of [1,2,3,4] is [4,3,2,1]" 
//     }
//   ],
//   hiddenTestCases: [
//     { input: "3\n5 10 15", expectedOutput: "15 10 5" },
//     { input: "1\n42", expectedOutput: "42" }
//   ]
// };

// Drag Handle Component


// Mock components for demo
export default function QuestionPanel({ question }) {
  if (!question) return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      <span className="ml-3 text-slate-600 dark:text-slate-300">Loading question...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
          {question.title}
        </h3>
        <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
          <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
            {question.description}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">T</span>
          </div>
          Public Test Cases
        </h4>
        <div className="space-y-4">
          {question.publicTestCases.map((tc, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
                  Test Case {idx + 1}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Input:</span>
                  <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
                    {tc.input}
                  </code>
                </div>
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Expected:</span>
                  <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
                    {tc.expectedOutput}
                  </code>
                </div>
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Explanation:</span>
                  <span className="ml-2 text-slate-600 dark:text-slate-400">{tc.explanation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
