import TaskItem from "./TaskItem";
import { useState } from "react";
const TaskList = ({
  tasks,
  isLoading,
  submissions,
  submissionLoading,
  submissionError,
  isAuthenticated,
  submissionInputs,
  showSubmissionForm,
  levelNumber,
  onSubmissionInputChange,
  onShowSubmissionForm,
  onSubmitTask,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 dark:border-slate-700"></div>
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600 absolute top-0 left-0"></div>
        </div>
        <span className="ml-4 text-slate-600 dark:text-slate-300 font-medium">
          Loading tasks...
        </span>
      </div>
    );
  }

  const [expandedTask, setExpandedTask] = useState(null);
  const [showResubmitForm, setShowResubmitForm] = useState({});

  // Add handler function
  const handleShowResubmitForm = (taskId) => {
    setShowResubmitForm((prev) => ({
      ...prev,
      [taskId]: true,
    }));
  };

  if (!tasks?.length) {
    return (
      <div className="text-center py-12">
        <div className="relative mx-auto mb-6 w-20 h-20">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl shadow-inner"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl">
              <svg
                className="w-8 h-8 text-slate-400 dark:text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          No tasks yet
        </h4>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Tasks for this level haven't been published yet. Check back soon!
        </p>
      </div>
    );
  }

  // Calculate completion stats
  const completedTasks = tasks.filter((task) => {
    const submission = submissions[task._id];
    return submission && submission.status === "approved";
  }).length;

  const totalTasks = tasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Level {levelNumber} Tasks
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedTasks} of {totalTasks} completed
            </p>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100, 100"
              className="text-slate-200 dark:text-slate-700"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${completionPercentage}, 100`}
              className="text-emerald-500 transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {completionPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-4">
        {tasks.map((task, index) => {
          const submission = submissions[task._id];
          const isCompleted = submission && submission.status === "approved";

          return (
            <div
              key={task._id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <TaskItem
                task={task}
                submission={submission}
                submissionLoading={submissionLoading[task._id]}
                submissionError={submissionError}
                isAuthenticated={isAuthenticated}
                submissionInput={submissionInputs[task._id] || ""}
                showForm={showSubmissionForm[task._id]}
                levelNumber={levelNumber}
                onSubmissionInputChange={onSubmissionInputChange}
                onShowSubmissionForm={onShowSubmissionForm}
                onSubmitTask={onSubmitTask}
                expandedTask={expandedTask}
                onToggleExpanded={setExpandedTask}
                showResubmitForm={showResubmitForm[task._id]}
                onShowResubmitForm={handleShowResubmitForm}
              />
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      {totalTasks > 0 && (
        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  {completedTasks} Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  {totalTasks - completedTasks} Remaining
                </span>
              </div>
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              Level {levelNumber} Progress
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default TaskList;
