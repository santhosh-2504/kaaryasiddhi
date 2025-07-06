'use client';
import { useTheme } from '@/store/context/ThemeContext';
import React from 'react';
import GitHubCalendar from 'react-github-calendar';

const Github = () => {
  const username = 'santhosh-2504';
  const {theme} = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
          GitHub Contribution Graph
        </h3>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          View your open-source activity over the past year.
        </p>

        <div className="overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <GitHubCalendar
            username={username}
            blockSize={15}
            blockMargin={5}
            colorScheme={theme === 'dark' ? 'dark' : 'light'}
            fontSize={14}
          />
        </div>
      </div>
    </div>
  );
};

export default Github;
