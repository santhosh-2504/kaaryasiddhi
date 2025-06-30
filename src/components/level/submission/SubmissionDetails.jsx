import { Clock } from "lucide-react";
const SubmissionDetails = ({ submission }) => {
  return (
    <div className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-600/50 rounded-lg">
      <div className="space-y-2 sm:space-y-3">
        {submission.score !== null && (
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Score:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">
                {submission.score}/10
              </span>
              <div className="flex-1 xs:w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    submission.score >= 7
                      ? "bg-green-500"
                      : submission.score >= 5
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${(submission.score / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {submission.remarks && (
          <div className="space-y-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Remarks:
            </span>
            <div className="text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700/50 p-2 sm:p-3 rounded border border-slate-200 dark:border-slate-600 leading-relaxed">
              {submission.remarks}
            </div>
          </div>
        )}

        {submission.reviewedAt && (
          <div className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-600">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Reviewed on{" "}
              {new Date(submission.reviewedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionDetails;
