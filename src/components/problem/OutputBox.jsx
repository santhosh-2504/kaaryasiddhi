export default function OutputBox({ output }) {
  const getOutputStyle = () => {
    if (output.includes("✅"))
      return "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
    if (output.includes("❌"))
      return "border-red-500 bg-red-50 dark:bg-red-900/20";
    return "border-slate-600 bg-slate-900";
  };

  const getTextStyle = () => {
    if (output.includes("✅")) return "text-emerald-800 dark:text-emerald-200";
    if (output.includes("❌")) return "text-red-800 dark:text-red-200";
    return "text-green-300";
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Output
        </h4>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Console
          </span>
        </div>
      </div>
      <div
        className={`flex-1 rounded-lg p-4 overflow-y-auto border-2 transition-colors duration-200 ${getOutputStyle()}`}
      >
        <pre
          className={`text-sm font-mono whitespace-pre-wrap ${getTextStyle()}`}
        >
          {output || "No output yet"}
        </pre>
      </div>
    </div>
  );
}
