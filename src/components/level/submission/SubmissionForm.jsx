import { Send } from "lucide-react";

const SubmissionForm = ({
  taskId,
  levelNumber,
  submissionInput,
  submissionLoading,
  submissionError,
  onSubmissionInputChange,
  onShowSubmissionForm,
  onSubmitTask,
}) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Submission Link
          </label>
          <input
            type="url"
            value={submissionInput}
            onChange={(e) => onSubmissionInputChange(taskId, e.target.value)}
            placeholder="https://github.com/your-repo or https://linkedin.com/post/..."
            className="w-full px-3 py-2 text-sm text-black sm:text-base border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        {submissionError && (
          <div className="text-red-600 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
            {submissionError}
          </div>
        )}

        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-3">
          <button
            onClick={() => onSubmitTask(taskId, levelNumber)}
            disabled={submissionLoading || !submissionInput?.trim()}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 xs:order-1"
          >
            {submissionLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit
              </>
            )}
          </button>
          <button
            onClick={() => onShowSubmissionForm(taskId)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 transition-colors order-1 xs:order-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
