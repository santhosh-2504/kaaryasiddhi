import { ExternalLink, CheckCircle, Clock, XCircle, Send } from "lucide-react";

// SubmissionStatus Component
const SubmissionStatus = ({
  submission,
  isAuthenticated,
  submissionLoading,
  onShowSubmissionForm,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "rejected":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      case "pending":
      default:
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "rejected":
        return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "pending":
      default:
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  if (submission) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span
          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}
        >
          <span className="mr-1">{getStatusIcon(submission.status)}</span>
          <span className="hidden xs:inline sm:inline">
            {submission.status.charAt(0).toUpperCase() +
              submission.status.slice(1)}
          </span>
        </span>
        {submission.submissionLink && (
          <a
            href={submission.submissionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 p-1 rounded-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            title="View submission"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        )}
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <button
        onClick={onShowSubmissionForm}
        disabled={submissionLoading}
        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-emerald-700 bg-emerald-100 border border-emerald-300 rounded-lg hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-600 dark:hover:bg-emerald-800/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submissionLoading ? (
          <>
            <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-emerald-600 mr-1.5 sm:mr-2"></div>
            <span className="hidden xs:inline">Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="xs:hidden">Submit</span>
          </>
        )}
      </button>
    );
  }

  return (
    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
      Login to submit
    </span>
  );
};

export default SubmissionStatus;
