// export default function LanguageSelector({ language, onChange }) {
//   return (
//     <div className="mb-2">
//       <label className="mr-2 font-semibold">Language:</label>
//       <select
//         value={language}
//         onChange={(e) => onChange(e.target.value)}
//         className="border px-2 py-1 rounded"
//       >
//         <option value="javascript">JavaScript</option>
//         {/* <option value="python">Python</option> */}
//       </select>
//     </div>
//   );
// }

// export default function LanguageSelector({ language, onChange }) {
//   return (
//     <div className="flex items-center gap-3">
//       <label className="text-sm font-medium text-slate-200">Language:</label>
//       <select
//         value={language}
//         onChange={(e) => onChange(e.target.value)}
//         className="bg-slate-600 text-white border border-slate-500 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
//       >
//         <option value="javascript">JavaScript</option>
//         {/* <option value="python">Python</option> */}
//       </select>
//     </div>
//   );
// }

// export default function LanguageSelector({ language, onChange }) {
//   return (
//     <div className="flex items-center gap-3">
//       <label className="text-sm font-medium text-slate-200">Language:</label>
//       <select
//         value={language}
//         onChange={(e) => onChange(e.target.value)}
//         className="bg-slate-600 text-white border border-slate-500 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
//       >
//         <option value="javascript">JavaScript</option>
//         {/* <option value="python">Python</option> */}
//       </select>
//     </div>
//   );
// }

export default function LanguageSelector({ language, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-slate-200">Language:</label>
      <select
        value={language}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-600 text-white border border-slate-500 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
      >
        <option value="javascript">JavaScript</option>
        {/* <option value="python">Python</option> */}
      </select>
    </div>
  );
}
