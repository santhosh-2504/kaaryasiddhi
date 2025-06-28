import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchPendingSubmissions, updateSubmissionStatus, clearError } from "@/store/slices/submissionSlice";

export default function SubmissionsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { submissions, loading, error, updateLoading } = useSelector((state) => state.submissions);

  // Local state for managing individual submission actions
  const [actionStates, setActionStates] = useState({});

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/");
      return;
    }
    
    // Fetch pending submissions when component mounts
    dispatch(fetchPendingSubmissions());
  }, [isAuthenticated, user?.role, dispatch, router]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) + " IST";
  };

  const handleActionChange = (submissionId, field, value) => {
    setActionStates(prev => ({
      ...prev,
      [submissionId]: {
        ...prev[submissionId],
        [field]: value
      }
    }));
  };

  const handleStatusUpdate = async (submissionId, status) => {
    const actionData = actionStates[submissionId] || {};
    
    // Validation
    if (status === "approved" && (!actionData.score || actionData.score < 0 || actionData.score > 10)) {
      alert("Please enter a valid score (0-10) for approval");
      return;
    }
    
    if (status === "rejected" && (!actionData.remarks || actionData.remarks.trim() === "")) {
      alert("Please provide remarks for rejection");
      return;
    }

    const updateData = {
      submissionId,
      status,
      score: status === "approved" ? parseFloat(actionData.score) : undefined,
      remarks: actionData.remarks || undefined,
    };

    try {
      await dispatch(updateSubmissionStatus(updateData)).unwrap();
      
      // Clear action state for this submission
      setActionStates(prev => {
        const newState = { ...prev };
        delete newState[submissionId];
        return newState;
      });
      
      // Show success message
      alert(`Submission ${status} successfully!`);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getActionState = (submissionId) => {
    return actionStates[submissionId] || { action: null, score: "", remarks: "" };
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return null; // Will redirect in useEffect
  }

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="container mx-auto px-6 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Submissions Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Review and manage pending submissions from learners across all levels
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8 shadow-xl backdrop-blur-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
                </div>
                <button
                  onClick={() => dispatch(clearError())}
                  className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading submissions...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* No Submissions State */}
              {submissions.length === 0 ? (
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.412M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No pending submissions found</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">All submissions have been reviewed</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full text-sm font-bold">
                        {submissions.length}
                      </span>
                      Pending Submissions
                      <span className="ml-auto text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                        {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
                      </span>
                    </h2>
                  </div>

                  {/* Submissions List */}
                  <div className="p-6 space-y-6">
                    {submissions.map((submission) => {
                      const actionState = getActionState(submission._id);
                      const isUpdating = updateLoading[submission._id];

                      return (
                        <div key={submission._id} className="group bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200">
                          {/* Header Info */}
                          <div className="mb-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                  {submission.taskId?.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                  Submitted by <span className="font-medium text-emerald-600 dark:text-emerald-400">{submission.userId?.name}</span>
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                                  Level {submission.levelNumber}
                                </span>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  {formatDate(submission.submittedAt)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Submission Link */}
                          {submission.submissionLink && (
                            <div className="mb-6">
                              <a
                                href={submission.submissionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors duration-200 font-medium"
                              >
                                View Submission
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 mb-6">
                            <button
                              onClick={() => handleActionChange(submission._id, "action", "approve")}
                              disabled={isUpdating}
                              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                actionState.action === "approve"
                                  ? "bg-green-600 text-white shadow-lg"
                                  : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
                              } ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:shadow-md hover:-translate-y-0.5"}`}
                            >
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve
                              </span>
                            </button>
                            <button
                              onClick={() => handleActionChange(submission._id, "action", "reject")}
                              disabled={isUpdating}
                              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                actionState.action === "reject"
                                  ? "bg-red-600 text-white shadow-lg"
                                  : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                              } ${isUpdating ? "opacity-50 cursor-not-allowed" : "hover:shadow-md hover:-translate-y-0.5"}`}
                            >
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject
                              </span>
                            </button>
                          </div>

                          {/* Score Input (for approval) */}
                          {actionState.action === "approve" && (
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Score (0-10) <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={actionState.score}
                                onChange={(e) => handleActionChange(submission._id, "score", e.target.value)}
                                className="w-32 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                placeholder="0.0"
                                disabled={isUpdating}
                              />
                            </div>
                          )}

                          {/* Remarks Input */}
                          {(actionState.action === "approve" || actionState.action === "reject") && (
                            <div className="mb-6">
                              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Remarks {actionState.action === "reject" && <span className="text-red-500">*</span>}
                              </label>
                              <textarea
                                value={actionState.remarks}
                                onChange={(e) => handleActionChange(submission._id, "remarks", e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                rows="4"
                                placeholder={
                                  actionState.action === "reject" 
                                    ? "Please provide reason for rejection..." 
                                    : "Optional feedback for the learner..."
                                }
                                disabled={isUpdating}
                              />
                            </div>
                          )}

                          {/* Save Button */}
                          {actionState.action && (
                            <button
                              onClick={() => handleStatusUpdate(submission._id, actionState.action === "approve" ? "approved" : "rejected")}
                              disabled={
                                isUpdating ||
                                (actionState.action === "approve" && (!actionState.score || actionState.score < 0 || actionState.score > 10)) ||
                                (actionState.action === "reject" && (!actionState.remarks || actionState.remarks.trim() === ""))
                              }
                              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                              {isUpdating && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              )}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {isUpdating ? "Saving..." : "Save Decision"}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}