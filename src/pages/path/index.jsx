"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksByLevel } from "@/store/slices/levelTaskSlice";
import {
  submitTask,
  fetchSubmissions,
  clearSubmissionError,
} from "@/store/slices/userSlice";
// import PageHeader from '@/components/level/PageHeader';
import LevelCard from "@/components/level/level/LevelCard";
import FooterMessage from "@/components/level/FooterMessage";

const PathPage = () => {
  const [levels, setLevels] = useState([]);
  const [levelsLoading, setLevelsLoading] = useState(true); // Add loading state for levels
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [submissionInputs, setSubmissionInputs] = useState({});
  const [showSubmissionForm, setShowSubmissionForm] = useState({});

  const dispatch = useDispatch();
  const tasksByLevel = useSelector((state) => state.levelTasks.tasksByLevel);
  const loadingLevels = useSelector((state) => state.levelTasks.loadingLevels);

  // User submission states
  const submissions = useSelector((state) => state.user.submissions);
  const submissionLoading = useSelector(
    (state) => state.user.submissionLoading,
  );
  const submissionError = useSelector((state) => state.user.submissionError);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const currentLevel = user?.isSubscribed ? (user?.currentLevel ?? 0) : 0;

  // Fetch all level titles/descriptions once
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLevelsLoading(true);
        const res = await axios.get("/api/level/all");
        if (res.data.success) {
          const sorted = res.data.data.sort(
            (a, b) => a.levelNumber - b.levelNumber,
          );
          setLevels(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch levels", err);
      } finally {
        setLevelsLoading(false);
      }
    };

    fetchLevels();
  }, []);

  // Fetch user submissions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSubmissions());
    }
  }, [dispatch, isAuthenticated]);

  const handleToggle = (levelNumber) => {
    const isExpanding = expandedLevel !== levelNumber;
    setExpandedLevel(isExpanding ? levelNumber : null);

    if (!tasksByLevel[levelNumber] && isExpanding) {
      dispatch(fetchTasksByLevel(levelNumber));
    }
  };

  const handleSubmissionInputChange = (taskId, value) => {
    setSubmissionInputs((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleShowSubmissionForm = (taskId) => {
    setShowSubmissionForm((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
    // Clear any previous errors
    if (submissionError) {
      dispatch(clearSubmissionError());
    }
  };

  const handleSubmitTask = async (taskId, levelNumber) => {
    const submissionLink = submissionInputs[taskId];

    if (!submissionLink || !submissionLink.trim()) {
      alert("Please provide a submission link");
      return;
    }

    try {
      await dispatch(submitTask(taskId, levelNumber, submissionLink.trim()));

      // Clear form on successful submission
      setSubmissionInputs((prev) => ({
        ...prev,
        [taskId]: "",
      }));
      setShowSubmissionForm((prev) => ({
        ...prev,
        [taskId]: false,
      }));
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="container mx-auto px-6 py-5">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Road to Mastery
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover curated resources to enhance your learning journey across
              all levels
            </p>
          </div>

          {/* Loading Spinner */}
          {levelsLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-pulse"></div>
              </div>
              <span className="ml-4 text-slate-600 dark:text-slate-300 font-medium">
                Loading levels...
              </span>
            </div>
          ) : (
            <>
              {/* Level Cards */}
              <div className="space-y-6">
                {levels.map((level) => (
                  <LevelCard
                    key={level.levelNumber}
                    level={level}
                    isOpen={expandedLevel === level.levelNumber}
                    isLocked={level.levelNumber > currentLevel}
                    tasks={tasksByLevel[level.levelNumber]}
                    isLoading={loadingLevels.includes(level.levelNumber)}
                    submissions={submissions}
                    submissionLoading={submissionLoading}
                    submissionError={submissionError}
                    isAuthenticated={isAuthenticated}
                    submissionInputs={submissionInputs}
                    showSubmissionForm={showSubmissionForm}
                    onToggle={handleToggle}
                    onSubmissionInputChange={handleSubmissionInputChange}
                    onShowSubmissionForm={handleShowSubmissionForm}
                    onSubmitTask={handleSubmitTask}
                  />
                ))}
              </div>

              <FooterMessage levels={levels} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PathPage;
