export default function QuestionPanel({ question }) {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        <span className="ml-3 text-slate-600 dark:text-slate-300">
          Loading question...
        </span>
      </div>
    );
  }

  return (
    <div
      className="space-y-6 select-none"
      onCopy={(e) => {
        e.preventDefault();
        alert("Copying is disabled for this section.");
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
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
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
              T
            </span>
          </div>
          Public Test Cases
        </h4>
        <div className="space-y-4">
          {question.testCases
            .filter((tc) => !tc.isHidden)
            .map((tc, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium">
                    Test Case {idx + 1}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Input:
                    </span>
                    <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
                      {JSON.stringify(tc.input)}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Expected:
                    </span>
                    <code className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-800 dark:text-slate-200">
                      {tc.expectedOutput}
                    </code>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
