// import SubmissionStatus from '../submission/SubmissionStatus';
// import SubmissionForm from '../submission/SubmissionForm';
// import SubmissionDetails from '../submission/SubmissionDetails';

// // Social Media Icons Component
// const SocialIcon = ({ platform, className = "w-4 h-4" }) => {
//   const icons = {
//     linkedin: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//       </svg>
//     ),
//     github: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//       </svg>
//     ),
//     twitter: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//       </svg>
//     ),
//     instagram: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//       </svg>
//     ),
//     youtube: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//       </svg>
//     ),
//     facebook: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//       </svg>
//     ),
//     discord: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
//       </svg>
//     ),
//     portfolio: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//       </svg>
//     ),
//     website: (
//       <svg className={className} fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
//       </svg>
//     )
//   };

//   return icons[platform] || icons.website;
// };

// // Function to detect platform from URL or text
// const detectPlatform = (text) => {
//   if (!text) return 'website';

//   const lowerText = text.toLowerCase();

//   if (lowerText.includes('linkedin')) return 'linkedin';
//   if (lowerText.includes('github')) return 'github';
//   if (lowerText.includes('twitter') || lowerText.includes('x.com')) return 'twitter';
//   if (lowerText.includes('instagram')) return 'instagram';
//   if (lowerText.includes('youtube')) return 'youtube';
//   if (lowerText.includes('facebook')) return 'facebook';
//   if (lowerText.includes('discord')) return 'discord';
//   if (lowerText.includes('portfolio')) return 'portfolio';

//   return 'website';
// };

// const TaskItem = ({
//   task,
//   submission,
//   submissionLoading,
//   submissionError,
//   isAuthenticated,
//   submissionInput,
//   showForm,
//   levelNumber,
//   expandedTask,
//   onSubmissionInputChange,
//   onShowSubmissionForm,
//   onSubmitTask,
//   onToggleExpanded
// }) => {
//   const isExpanded = expandedTask === task._id;
//   const hasDetailsToShow = submission && ['approved', 'rejected'].includes(submission.status);
//   const hasFormToShow = showForm && isAuthenticated && !submission;
//   const canExpand = hasDetailsToShow || hasFormToShow;

//   const handleCardClick = (e) => {
//     // Don't expand if clicking on interactive elements
//     if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
//       return;
//     }

//     if (canExpand) {
//       onToggleExpanded(isExpanded ? null : task._id);
//     }
//   };

//   const handleExpandClick = (e) => {
//     e.stopPropagation();
//     onToggleExpanded(isExpanded ? null : task._id);
//   };

//   return (
//     <div
//       className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 ${
//         canExpand ? 'cursor-pointer' : ''
//       } ${isExpanded ? 'ring-2 ring-emerald-500/20 dark:ring-emerald-400/20' : ''}`}
//       onClick={handleCardClick}
//     >
//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
//           {/* Left Side - Dot + Title */}
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <div className="relative mt-1.5 flex-shrink-0">
//               <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm">
//                 <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-75"></div>
//               </div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
//                 <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words">
//                   {task.title}
//                 </h3>

//                 {/* Enhanced Type Badge with Icons */}
//                 <div className="flex items-center gap-1.5 flex-shrink-0 self-start text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1.5 rounded-lg w-fit border border-slate-200/50 dark:border-slate-600/50">
//                   <SocialIcon
//                     platform={detectPlatform(task.type)}
//                     className="w-3.5 h-3.5"
//                   />
//                   <span className="capitalize">{task.type}</span>
//                 </div>
//               </div>

//               {/* Task Description with Social Links Detection */}
//               {task.description && (
//                 <div className="mb-3">
//                   <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
//                     {task.description}
//                   </p>

//                   {/* Social Links Preview */}
//                   {task.socialLinks && task.socialLinks.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {task.socialLinks.map((link, index) => (
//                         <a
//                           key={index}
//                           href={link.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-600/50"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <SocialIcon
//                             platform={detectPlatform(link.platform || link.url)}
//                             className="w-3 h-3"
//                           />
//                           <span>{link.platform || detectPlatform(link.url).charAt(0).toUpperCase() + detectPlatform(link.url).slice(1)}</span>
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Optional Tag */}
//               {task.optional && (
//                 <div className="flex">
//                   <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     Optional
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Status + Expand Button */}
//           <div className="flex items-center gap-2 flex-shrink-0 sm:ml-auto">
//             <SubmissionStatus
//               submission={submission}
//               isAuthenticated={isAuthenticated}
//               submissionLoading={submissionLoading}
//               onShowSubmissionForm={() => onShowSubmissionForm(task._id)}
//             />

//             {/* Expand/Collapse Button */}
//             {canExpand && (
//               <button
//                 onClick={handleExpandClick}
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 ${
//                   isExpanded ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400' : ''
//                 }`}
//                 title={isExpanded ? 'Collapse details' : 'Expand details'}
//               >
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Quick Status Indicator for submissions with feedback */}
//         {hasDetailsToShow && !isExpanded && (
//           <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
//             <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${
//               submission.status === 'approved'
//                 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
//                 : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
//             }`}>
//               {submission.status === 'approved' ? (
//                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               ) : (
//                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               )}
//               <span className="capitalize">{submission.status}</span>
//             </div>

//             {/* Score preview */}
//             {submission.score !== undefined && (
//               <div className="text-xs text-slate-500 dark:text-slate-400">
//                 Score: <span className="font-medium">{submission.score}</span>
//               </div>
//             )}

//             {/* Remarks preview */}
//             {submission.remarks && (
//               <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-32">
//                 "{submission.remarks}"
//               </div>
//             )}

//             <div className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
//               Click to {isExpanded ? 'collapse' : 'expand'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Expandable Content - Smooth Animation */}
//       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
//         isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//       }`}>
//         <div className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
//           {/* Submission Form */}
//           {hasFormToShow && isExpanded && (
//             <div className="p-4 sm:p-6">
//               <div className="relative">
//                 {/* Visual connection line - hidden on mobile for cleaner look */}
//                 <div className="hidden sm:block absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
//                 <div className="sm:pl-6">
//                   <SubmissionForm
//                     taskId={task._id}
//                     levelNumber={levelNumber}
//                     submissionInput={submissionInput}
//                     submissionLoading={submissionLoading}
//                     submissionError={submissionError}
//                     onSubmissionInputChange={onSubmissionInputChange}
//                     onShowSubmissionForm={onShowSubmissionForm}
//                     onSubmitTask={onSubmitTask}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Submission Details */}
//           {hasDetailsToShow && isExpanded && (
//             <div className="p-4 sm:p-6">
//               <div className="relative">
//                 {/* Visual connection line - hidden on mobile for cleaner look */}
//                 <div className={`hidden sm:block absolute left-0 top-0 w-0.5 h-full rounded-full ${
//                   submission.status === 'approved'
//                     ? 'bg-gradient-to-b from-emerald-400 to-emerald-600'
//                     : 'bg-gradient-to-b from-red-400 to-red-600'
//                 }`}></div>
//                 <div className="sm:pl-6">
//                   <SubmissionDetails submission={submission} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Subtle gradient overlay for hover effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//     </div>
//   );
// };

// export default TaskItem;

import { useState } from "react";
import SubmissionStatus from "../submission/SubmissionStatus";
import SubmissionForm from "../submission/SubmissionForm";
import SubmissionDetails from "../submission/SubmissionDetails";

// Social Media Icons Component
const SocialIcon = ({ platform, className = "w-4 h-4" }) => {
  const icons = {
    linkedin: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    twitter: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    instagram: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    youtube: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    facebook: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    discord: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    portfolio: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    website: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  };

  return icons[platform] || icons.website;
};

// Function to detect platform from URL or text
const detectPlatform = (text) => {
  if (!text) return "website";

  const lowerText = text.toLowerCase();

  if (lowerText.includes("linkedin")) return "linkedin";
  if (lowerText.includes("github")) return "github";
  if (lowerText.includes("twitter") || lowerText.includes("x.com"))
    return "twitter";
  if (lowerText.includes("instagram")) return "instagram";
  if (lowerText.includes("youtube")) return "youtube";
  if (lowerText.includes("facebook")) return "facebook";
  if (lowerText.includes("discord")) return "discord";
  if (lowerText.includes("portfolio")) return "portfolio";

  return "website";
};

// const TaskItem = ({
//   task,
//   submission,
//   submissionLoading,
//   submissionError,
//   isAuthenticated,
//   submissionInput,
//   showForm,
//   showResubmitForm,
//   levelNumber,
//   expandedTask,
//   onSubmissionInputChange,
//   onShowSubmissionForm,
//   onShowResubmitForm,
//   onSubmitTask,
//   onToggleExpanded
// }) => {
//   const isExpanded = expandedTask === task._id;
//   const hasDetailsToShow = submission && ['approved', 'rejected'].includes(submission.status);
//   const hasFormToShow = (showForm && isAuthenticated && !submission) || (showResubmitForm && submission?.status === 'rejected');
//   const canExpand = hasDetailsToShow || hasFormToShow;

//   const handleCardClick = (e) => {
//     // Don't expand if clicking on interactive elements
//     if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('textarea')) {
//       return;
//     }

//     if (canExpand) {
//       onToggleExpanded(isExpanded ? null : task._id);
//     }
//   };

//   const handleExpandClick = (e) => {
//     e.stopPropagation();
//     onToggleExpanded(isExpanded ? null : task._id);
//   };

//   return (
//     <div
//       className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 ${
//         canExpand ? 'cursor-pointer' : ''
//       } ${isExpanded ? 'ring-2 ring-emerald-500/20 dark:ring-emerald-400/20' : ''}`}
//       onClick={handleCardClick}
//     >
//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
//           {/* Left Side - Dot + Title */}
//           <div className="flex items-start gap-3 flex-1 min-w-0">
//             <div className="relative mt-1.5 flex-shrink-0">
//               <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm">
//                 <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-75"></div>
//               </div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
//                 <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words">
//                   {task.title}
//                 </h3>

//                 {/* Enhanced Type Badge with Icons */}
//                 <div className="flex items-center gap-1.5 flex-shrink-0 self-start text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1.5 rounded-lg w-fit border border-slate-200/50 dark:border-slate-600/50">
//                   <SocialIcon
//                     platform={detectPlatform(task.type)}
//                     className="w-3.5 h-3.5"
//                   />
//                   <span className="capitalize">{task.type}</span>
//                 </div>
//               </div>

//               {/* Task Description with Social Links Detection */}
//               {task.description && (
//                 <div className="mb-3">
//                   <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
//                     {task.description}
//                   </p>

//                   {/* Social Links Preview */}
//                   {task.socialLinks && task.socialLinks.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {task.socialLinks.map((link, index) => (
//                         <a
//                           key={index}
//                           href={link.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-600/50"
//                           onClick={(e) => e.stopPropagation()}
//                         >
//                           <SocialIcon
//                             platform={detectPlatform(link.platform || link.url)}
//                             className="w-3 h-3"
//                           />
//                           <span>{link.platform || detectPlatform(link.url).charAt(0).toUpperCase() + detectPlatform(link.url).slice(1)}</span>
//                         </a>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Optional Tag */}
//               {task.optional && (
//                 <div className="flex">
//                   <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
//                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                     </svg>
//                     Optional
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Status + Expand Button */}
//           <div className="flex items-center gap-2 flex-shrink-0 sm:ml-auto">
//             <SubmissionStatus
//               submission={submission}
//               isAuthenticated={isAuthenticated}
//               submissionLoading={submissionLoading}
//               onShowSubmissionForm={() => onShowSubmissionForm(task._id)}
//             />

//             {/* Resubmit Button for Rejected Submissions */}
//             {submission?.status === 'rejected' && isAuthenticated && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onShowResubmitForm(task._id);
//                   if (!isExpanded) {
//                     onToggleExpanded(task._id);
//                   }
//                 }}
//                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200"
//                 title="Resubmit this task"
//               >
//                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Resubmit
//               </button>
//             )}

//             {/* Expand/Collapse Button */}
//             {canExpand && (
//               <button
//                 onClick={handleExpandClick}
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 ${
//                   isExpanded ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400' : ''
//                 }`}
//                 title={isExpanded ? 'Collapse details' : 'Expand details'}
//               >
//                 <svg
//                   className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Quick Status Indicator for submissions with feedback */}
//         {hasDetailsToShow && !isExpanded && (
//           <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
//             <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${
//               submission.status === 'approved'
//                 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
//                 : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
//             }`}>
//               {submission.status === 'approved' ? (
//                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//               ) : (
//                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               )}
//               <span className="capitalize">{submission.status}</span>
//             </div>

//             {/* Score preview */}
//             {submission.score !== undefined && (
//               <div className="text-xs text-slate-500 dark:text-slate-400">
//                 Score: <span className="font-medium">{submission.score}</span>
//               </div>
//             )}

//             {/* Remarks preview */}
//             {submission.remarks && (
//               <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-32">
//                 "{submission.remarks}"
//               </div>
//             )}

//             {/* Resubmit Button in Preview */}
//             {submission.status === 'rejected' && isAuthenticated && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onShowResubmitForm(task._id);
//                   onToggleExpanded(task._id);
//                 }}
//                 className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
//               >
//                 Resubmit
//               </button>
//             )}

//             <div className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
//               Click to {isExpanded ? 'collapse' : 'expand'}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Expandable Content - Smooth Animation */}
//       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
//         isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//       }`}>
//         <div className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
//           {/* Submission Form */}
//           {hasFormToShow && isExpanded && (
//             <div className="p-4 sm:p-6">
//               <div className="relative">
//                 {/* Visual connection line - hidden on mobile for cleaner look */}
//                 <div className="hidden sm:block absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
//                 <div className="sm:pl-6">
//                   {/* Resubmission Header */}
//                   {showResubmitForm && submission?.status === 'rejected' && (
//                     <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 rounded-lg">
//                       <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                         </svg>
//                         <h4 className="font-medium text-sm">Resubmitting Task</h4>
//                       </div>
//                       <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
//                         Please address the feedback and resubmit your work.
//                       </p>
//                     </div>
//                   )}

//                   <SubmissionForm
//                     taskId={task._id}
//                     levelNumber={levelNumber}
//                     submissionInput={submissionInput}
//                     submissionLoading={submissionLoading}
//                     submissionError={submissionError}
//                     isResubmission={showResubmitForm && submission?.status === 'rejected'}
//                     onSubmissionInputChange={onSubmissionInputChange}
//                     onShowSubmissionForm={onShowSubmissionForm}
//                     onSubmitTask={onSubmitTask}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Submission Details */}
//           {hasDetailsToShow && isExpanded && (
//             <div className="p-4 sm:p-6">
//               <div className="relative">
//                 {/* Visual connection line - hidden on mobile for cleaner look */}
//                 <div className={`hidden sm:block absolute left-0 top-0 w-0.5 h-full rounded-full ${
//                   submission.status === 'approved'
//                     ? 'bg-gradient-to-b from-emerald-400 to-emerald-600'
//                     : 'bg-gradient-to-b from-red-400 to-red-600'
//                 }`}></div>
//                 <div className="sm:pl-6">
//                   <SubmissionDetails submission={submission} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Subtle gradient overlay for hover effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//     </div>
//   );
// };

const TaskItem = ({
  task,
  submission,
  submissionLoading,
  submissionError,
  isAuthenticated,
  submissionInput,
  showForm,
  showResubmitForm,
  levelNumber,
  expandedTask,
  onSubmissionInputChange,
  onShowSubmissionForm,
  onShowResubmitForm,
  onSubmitTask,
  onToggleExpanded,
}) => {
  const isExpanded = expandedTask === task._id;
  const hasDetailsToShow =
    submission && ["approved", "rejected"].includes(submission.status);
  const hasFormToShow =
    (showForm && isAuthenticated && !submission) ||
    (showResubmitForm && submission?.status === "rejected");
  const canExpand = hasDetailsToShow || hasFormToShow;

  const handleCardClick = (e) => {
    // Don't expand if clicking on interactive elements
    if (
      e.target.closest("button") ||
      e.target.closest("a") ||
      e.target.closest("input") ||
      e.target.closest("textarea")
    ) {
      return;
    }

    if (canExpand) {
      onToggleExpanded(isExpanded ? null : task._id);
    }
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    onToggleExpanded(isExpanded ? null : task._id);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-0.5 ${
        canExpand ? "cursor-pointer" : ""
      } ${isExpanded ? "ring-2 ring-emerald-500/20 dark:ring-emerald-400/20" : ""}`}
      onClick={handleCardClick}
    >
      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3">
          {/* Left Side - Dot + Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="relative mt-1.5 flex-shrink-0">
              <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm">
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-pulse opacity-75"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words">
                  {task.title}
                </h3>

                {/* Enhanced Type Badge with Icons */}
                <div className="flex items-center gap-1.5 flex-shrink-0 self-start text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1.5 rounded-lg w-fit border border-slate-200/50 dark:border-slate-600/50">
                  <SocialIcon
                    platform={detectPlatform(task.type)}
                    className="w-3.5 h-3.5"
                  />
                  <span className="capitalize">{task.type}</span>
                </div>
              </div>

              {/* Task Description with Social Links Detection */}
              {task.description && (
                <div className="mb-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Social Links Preview */}
                  {task.socialLinks && task.socialLinks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-600/50"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <SocialIcon
                            platform={detectPlatform(link.platform || link.url)}
                            className="w-3 h-3"
                          />
                          <span>
                            {link.platform ||
                              detectPlatform(link.url).charAt(0).toUpperCase() +
                                detectPlatform(link.url).slice(1)}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Optional Tag */}
              {task.optional && (
                <div className="flex">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Optional
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Status + Expand Button */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:ml-auto">
            <SubmissionStatus
              submission={submission}
              isAuthenticated={isAuthenticated}
              submissionLoading={submissionLoading}
              onShowSubmissionForm={() => onShowSubmissionForm(task._id)}
            />

            {/* Resubmit Button for Rejected Submissions */}
            {submission?.status === "rejected" && isAuthenticated && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowResubmitForm(task._id);
                  if (!isExpanded) {
                    onToggleExpanded(task._id);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-200"
                title="Resubmit this task"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Resubmit
              </button>
            )}

            {/* Expand/Collapse Button */}
            {canExpand && (
              <button
                onClick={handleExpandClick}
                className={`flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-200 ${
                  isExpanded
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400"
                    : ""
                }`}
                title={isExpanded ? "Collapse details" : "Expand details"}
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Quick Status Indicator for submissions with feedback - Hide when resubmit form is shown */}
        {hasDetailsToShow && !isExpanded && !showResubmitForm && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <div
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md ${
                submission.status === "approved"
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
              }`}
            >
              {submission.status === "approved" ? (
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="capitalize">{submission.status}</span>
            </div>

            {/* Score preview */}
            {submission.score !== undefined && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Score: <span className="font-medium">{submission.score}</span>
              </div>
            )}

            {/* Remarks preview */}
            {submission.remarks && (
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-32">
                "{submission.remarks}"
              </div>
            )}

            {/* Resubmit Button in Preview */}
            {submission.status === "rejected" && isAuthenticated && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowResubmitForm(task._id);
                  onToggleExpanded(task._id);
                }}
                className="text-xs text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
              >
                Resubmit
              </button>
            )}

            <div className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
              Click to {isExpanded ? "collapse" : "expand"}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Content - Smooth Animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
          {/* Submission Form */}
          {hasFormToShow && isExpanded && (
            <div className="p-4 sm:p-6">
              <div className="relative">
                {/* Visual connection line - hidden on mobile for cleaner look */}
                <div className="hidden sm:block absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
                <div className="sm:pl-6">
                  {/* Resubmission Header */}
                  {showResubmitForm && submission?.status === "rejected" && (
                    <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 rounded-lg">
                      <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <h4 className="font-medium text-sm">
                          Resubmitting Task
                        </h4>
                      </div>
                      <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                        Please address the feedback and resubmit your work.
                      </p>
                    </div>
                  )}

                  <SubmissionForm
                    taskId={task._id}
                    levelNumber={levelNumber}
                    submissionInput={submissionInput}
                    submissionLoading={submissionLoading}
                    submissionError={submissionError}
                    isResubmission={
                      showResubmitForm && submission?.status === "rejected"
                    }
                    onSubmissionInputChange={onSubmissionInputChange}
                    onShowSubmissionForm={onShowSubmissionForm}
                    onSubmitTask={onSubmitTask}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submission Details - Only show when NOT in resubmit mode */}
          {hasDetailsToShow && isExpanded && !showResubmitForm && (
            <div className="p-4 sm:p-6">
              <div className="relative">
                {/* Visual connection line - hidden on mobile for cleaner look */}
                <div
                  className={`hidden sm:block absolute left-0 top-0 w-0.5 h-full rounded-full ${
                    submission.status === "approved"
                      ? "bg-gradient-to-b from-emerald-400 to-emerald-600"
                      : "bg-gradient-to-b from-red-400 to-red-600"
                  }`}
                ></div>
                <div className="sm:pl-6">
                  <SubmissionDetails submission={submission} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TaskItem;
