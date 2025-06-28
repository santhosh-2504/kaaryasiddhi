import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDashboardData, setFilters, clearFilters } from "@/store/slices/dashboardSlice";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { data, loading, error, metadata, filters } = useSelector(state => state.dashboard);

  // Local state for form inputs
  const [searchInput, setSearchInput] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDays, setSelectedDays] = useState(7);
  const [showInactiveOnly, setShowInactiveOnly] = useState(false);

  const allowedDays = [1, 3, 5, 7, 15, 30];

  useEffect(() => {
    // Initialize with default filters
    dispatch(fetchDashboardData({ days: 7 }));
  }, [dispatch]);

  // Sync local state with Redux filters
  useEffect(() => {
    setSearchInput(filters.search || "");
    setSelectedLevel(filters.level || "");
    setSelectedDays(filters.days || 7);
  }, [filters]);

  const handleSearch = () => {
    const filterParams = {
      days: selectedDays,
      search: searchInput.trim(),
      level: selectedLevel !== "" ? parseInt(selectedLevel) : null
    };
    
    dispatch(setFilters(filterParams));
    dispatch(fetchDashboardData(filterParams));
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSelectedLevel("");
    setSelectedDays(7);
    setShowInactiveOnly(false);
    dispatch(clearFilters());
    dispatch(fetchDashboardData({ days: 7 }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Filter data client-side for inactive users
  const filteredData = showInactiveOnly 
    ? data.filter(user => {
        if (!user.lastSubmission) return true; // No submission = inactive
        const lastSubmissionDate = new Date(user.lastSubmission);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return lastSubmissionDate < sevenDaysAgo; // Last submission older than 7 days
      })
    : data;

  if (loading) return <p className="text-center py-8">Loading dashboard data...</p>;
  if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h2>
        
        {/* Filter Controls */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter user name..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              >
                <option value="">All Levels</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={i}>Level {i}</option>
                ))}
              </select>
            </div>

            {/* Days Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Days Back
              </label>
              <select
                value={selectedDays}
                onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              >
                {allowedDays.map(day => (
                  <option key={day} value={day}>
                    Last {day} day{day > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Inactive Users Toggle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Activity Filter
              </label>
              <div className="flex items-center h-[42px]">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showInactiveOnly}
                    onChange={(e) => setShowInactiveOnly(e.target.checked)}
                    className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Show inactive only</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              >
                Apply
              </button>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Filter Status */}
          {metadata && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <span className="font-medium">Results: </span>
                Showing {filteredData.length} user{filteredData.length !== 1 ? 's' : ''}
                {showInactiveOnly && <span className="text-red-600 font-medium"> (inactive only)</span>}
                {metadata.appliedFilters.searchName && (
                  <span> matching "<span className="font-medium text-gray-800">{metadata.appliedFilters.searchName}</span>"</span>
                )}
                {metadata.appliedFilters.levelFilter !== null && (
                  <span> at <span className="font-medium text-gray-800">level {metadata.appliedFilters.levelFilter}</span></span>
                )}
                <span> from last <span className="font-medium text-gray-800">{metadata.appliedFilters.daysBack} day{metadata.appliedFilters.daysBack > 1 ? 's' : ''}</span></span>
              </div>
            </div>
          )}
        </div>

        {/* Data Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Level</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Streak</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">LinkedIn Tasks</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Avg LinkedIn Score</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">GitHub Tasks</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Avg GitHub Score</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Submission</th>
            </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-gray-900 mb-1">No users found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((user, index) => (
                <tr key={user.userId} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Level {user.currentLevel}
              </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Streak {user.streak}
              </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 font-medium">{user.linkedinTasksCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              {user.avgLinkedinScore ? (
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900">{user.avgLinkedinScore}</span>
                  <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2 w-16">
                    <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min((user.avgLinkedinScore / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900 font-medium">{user.githubTasksCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              {user.avgGithubScore ? (
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900">{user.avgGithubScore}</span>
                  <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2 w-16">
                    <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${Math.min((user.avgGithubScore / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
              {user.lastSubmission ? (
                <div className="text-sm text-gray-900">
                  <div className="font-medium">
                    {(() => {
                const d = new Date(user.lastSubmission);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}/${month}/${year}`;
                    })()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(user.lastSubmission).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
                    })}
                  </div>
                </div>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
                  </td>
                </tr>
              ))
            )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Stats */}
        {metadata && filteredData.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    {showInactiveOnly ? 'Inactive Users' : 'Total Users'}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredData.filter(u => {
                      if (!u.lastSubmission) return false;
                      const lastSubmissionDate = new Date(u.lastSubmission);
                      const threeDaysAgo = new Date();
                      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                      return lastSubmissionDate >= threeDaysAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Avg Level</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredData.length > 0 ? (filteredData.reduce((sum, u) => sum + u.currentLevel, 0) / filteredData.length).toFixed(1) : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}