import LevelHeader from "./LevelHeader";
import TaskList from "../task/TaskList";

const LevelCard = ({
  level,
  isOpen,
  isLocked,
  tasks,
  isLoading,
  submissions,
  submissionLoading,
  submissionError,
  isAuthenticated,
  submissionInputs,
  showSubmissionForm,
  onToggle,
  onSubmissionInputChange,
  onShowSubmissionForm,
  onSubmitTask,
}) => {
  return (
    <div className="relative bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Lock Icon at Top-Right
      {isLocked && (
        <div className="absolute top-4 right-4 z-10">
          <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </div>
      )} */}

      <LevelHeader
        level={level}
        isOpen={isOpen}
        isLocked={isLocked}
        onToggle={onToggle}
      />

      {/* Expandable Content */}
      {!isLocked && isOpen && (
        <div className="px-8 py-6 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            submissions={submissions}
            submissionLoading={submissionLoading}
            submissionError={submissionError}
            isAuthenticated={isAuthenticated}
            submissionInputs={submissionInputs}
            showSubmissionForm={showSubmissionForm}
            levelNumber={level.levelNumber}
            onSubmissionInputChange={onSubmissionInputChange}
            onShowSubmissionForm={onShowSubmissionForm}
            onSubmitTask={onSubmitTask}
          />
        </div>
      )}
    </div>
  );
};

export default LevelCard;
