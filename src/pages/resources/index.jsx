import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources, setSearchQuery, setFilterType, setFilterLevel } from "@/store/slices/resourceSlice";

export default function ResourcePage() {
  const dispatch = useDispatch();
  const { items, isLoading, error, searchQuery, filterType, filterLevel } = useSelector(
    (state) => state.resources
  );
  const user = useSelector((state) => state.user.user);
  const currentUserLevel = user?.isSubscribed ? (user?.currentLevel ?? 0) : 0;


  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  const filtered = items.filter((res) => {
    // First check if resource level is accessible to user
    const isLevelAccessible = res.level <= currentUserLevel;
    
    if (!isLevelAccessible) {
      return false; // Hide resources from higher levels completely
    }
    
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.tags && res.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = !filterType || res.type === filterType;
    const matchesLevel = !filterLevel || res.level === parseInt(filterLevel);
    return matchesSearch && matchesType && matchesLevel;
  });

  const groupedByLevel = Array.from({ length: currentUserLevel + 1 }, (_, level) => ({
    level,
    resources: filtered.filter((r) => r.level === level)
  }));

  const getTypeColor = (type) => {
    const colors = {
      Video: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      Blog: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      PDF: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Course: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      Other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    };
    return colors[type] || colors.Other;
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="container mx-auto px-6 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Learning Resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover curated resources to enhance your learning journey across all levels
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Search Resources
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by title or tags..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Type Filter */}
              <div className="lg:w-48">
                <label htmlFor="type-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Resource Type
                </label>
                <select
                  id="type-filter"
                  value={filterType}
                  onChange={(e) => dispatch(setFilterType(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Types</option>
                  <option value="video">Video</option>
                  <option value="blog">Blog</option>
                  <option value="pdf">PDF</option>
                  <option value="course">Course</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Level Filter */}
              <div className="lg:w-48">
                <label htmlFor="level-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Level
                </label>
                <select
                  id="level-filter"
                  value={filterLevel}
                  onChange={(e) => dispatch(setFilterLevel(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">All Levels</option>
                  {[...Array(currentUserLevel + 1).keys()].map((lvl) => (
                    <option key={lvl} value={lvl}>
                      Level {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-red-200 dark:border-red-800 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.412M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No resources found matching your criteria</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedByLevel.map(({ level, resources }) =>
                resources.length > 0 ? (
                  <div key={level} className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    {/* Level Header */}
                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-4">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full text-sm font-bold">
                          {level}
                        </span>
                        Level {level}
                        <span className="ml-auto text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                          {resources.length} resource{resources.length !== 1 ? 's' : ''}
                        </span>
                      </h2>
                    </div>

                    {/* Resources Grid */}
                    <div className="p-6">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {resources.map((res) => (
                          <div
                            key={res.id}
                            className="group bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 hover:-translate-y-1"
                          >
                            <div className="flex items-start justify-between mb-3">
                              {res.link ? (
                                <a
                                  href={res.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2 hover:underline cursor-pointer"
                                >
                                  {res.title}
                                </a>
                              ) : (
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 line-clamp-2">
                                  {res.title}
                                </h3>
                              )}
                              <span className={`shrink-0 px-2 py-1 text-xs font-medium rounded-md ml-2 ${getTypeColor(res.type)}`}>
                                {res.type}
                              </span>
                            </div>
                            
                            {res.description && (
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                                {res.description}
                              </p>
                            )}

                            {res.tags && res.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {res.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {res.tags.length > 3 && (
                                  <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-md">
                                    +{res.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {(res.url || res.link) && (
                              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                                <a
                                  href={res.url || res.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
                                >
                                  View Resource
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}