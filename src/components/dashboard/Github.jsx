'use client';
import { useTheme } from '@/store/context/ThemeContext';
import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const durationOptions = [
  { label: '1 Month', value: 1 },
  { label: '3 Months', value: 3 },
  { label: '6 Months', value: 6 },
  { label: '1 Year', value: 12 },
];

const Github = () => {
  const { user } = useSelector((state) => state.user);
  const username = user?.githubUsername || '';
  const { theme } = useTheme();
  const [months, setMonths] = useState(3); // default to 3 months
  const [hasError, setHasError] = useState(false);

  const filterData = (data) => {
    if (months === 12) return data;
    const fromDate = dayjs().subtract(months, 'month');
    return data.filter((day) => dayjs(day.date).isAfter(fromDate));
  };

  const handleError = () => setHasError(true);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
          GitHub Contribution Graph
        </h3>

        <div className="flex justify-center mb-6">
          <select
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={months}
            onChange={(e) => {
              setMonths(Number(e.target.value));
              setHasError(false); // reset error on change
            }}
          >
            {durationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          View your open-source activity over the selected period.
        </p>

        <div className="overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
          {!username ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No GitHub username found. Please update it in the{' '}
              <span className="text-blue-600 dark:text-blue-400 underline">Update Profile</span> section.
            </p>
          ) : hasError ? (
            <p className="text-red-600 dark:text-red-400 text-center">
              Couldn't fetch data. Please check your GitHub username and update it in the{' '}
              <span className="text-blue-600 dark:text-blue-400 underline">Update Profile</span> section.
            </p>
          ) : (
            <GitHubCalendar
              username={username}
              blockSize={15}
              blockMargin={5}
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              fontSize={14}
              transformData={filterData}
              // intercept errors
              errorMessage={null} // disable default error
              renderBlock={(block, activity) => {
                // this block runs on successful render, so if it gets here, there's no error
                if (hasError) setHasError(false);
                return block;
              }}
              // fallback error catcher
              children={(calendar) => {
                if (!calendar) {
                  handleError();
                  return null;
                }
                return calendar;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Github;
