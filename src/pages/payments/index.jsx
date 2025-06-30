// 'use client';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import {
//   fetchPendingPayments,
//   approvePayment,
//   rejectPayment,
//   clearPaymentErrors,
//   clearPaymentSuccess
// } from '@/store/slices/paymentSlice';

// export default function PaymentsPage() {
//   const dispatch = useDispatch();
//   const { payments, loading, error, successMessage } = useSelector((state) => state.payment);

//   useEffect(() => {
//     dispatch(fetchPendingPayments());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearPaymentErrors());
//     }
//     if (successMessage) {
//       toast.success(successMessage);
//       dispatch(clearPaymentSuccess());
//     }
//   }, [error, successMessage, dispatch]);

//   const handleApprove = (paymentId) => {
//     dispatch(approvePayment(paymentId));
//   };

//   const handleReject = (paymentId) => {
//     dispatch(rejectPayment(paymentId));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Pending Payments</h1>

//       {loading ? (
//         <p className="text-gray-600">Loading payments...</p>
//       ) : payments.length === 0 ? (
//         <p className="text-gray-500">No pending payments.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow">
//             <thead className="bg-gray-100 dark:bg-gray-700">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Month</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3 text-left">Type</th>
//                 <th className="p-3 text-left">Paid At</th>
//                 <th className="p-3 text-left">Screenshot</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment) => (
//                 <tr key={payment._id} className="border-t">
//                   <td className="p-3">{payment.userId?.name}</td>
//                   <td className="p-3">{payment.month}</td>
//                   <td className="p-3">₹{payment.amount}</td>
//                   <td className="p-3 capitalize">{payment.type}</td>
//                   <td className="p-3">{new Date(payment.paidAt).toLocaleDateString()}</td>
//                   <td className="p-3">
//                     <a
//                       href={payment.screenshotUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       View
//                     </a>
//                   </td>
//                   <td className="p-3 space-x-2">
//                     <button
//                       onClick={() => handleApprove(payment._id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(payment._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchPendingPayments,
  approvePayment,
  rejectPayment,
  clearPaymentErrors,
  clearPaymentSuccess,
} from "@/store/slices/paymentSlice";

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const { payments, loading, error, successMessage } = useSelector(
    (state) => state.payment,
  );

  useEffect(() => {
    dispatch(fetchPendingPayments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPaymentErrors());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearPaymentSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleApprove = (paymentId) => {
    dispatch(approvePayment(paymentId));
  };

  const handleReject = (paymentId) => {
    dispatch(rejectPayment(paymentId));
  };

  const getPaymentTypeColor = (type) => {
    const colors = {
      membership:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      course:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      subscription:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      fee: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return colors[type] || colors.other;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Payment Management
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Review and manage pending payment approvals
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Pending
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {payments.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Amount
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(
                      payments.reduce(
                        (sum, payment) => sum + payment.amount,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Avg. Amount
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {payments.length > 0
                      ? formatCurrency(
                          payments.reduce(
                            (sum, payment) => sum + payment.amount,
                            0,
                          ) / payments.length,
                        )
                      : "₹0"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                Loading payments...
              </p>
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
                No pending payments
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                All payments have been processed
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Pending Payments
                  <span className="ml-auto text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                    {payments.length} payment{payments.length !== 1 ? "s" : ""}
                  </span>
                </h2>
              </div>

              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Paid Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Screenshot
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {payments.map((payment) => (
                      <tr
                        key={payment._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                  {payment.userId?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {payment.userId?.name || "N/A"}
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {payment.userId?.email || ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {payment.month}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {formatCurrency(payment.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentTypeColor(payment.type)}`}
                          >
                            {payment.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                          {new Date(payment.paidAt).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a
                            href={payment.screenshotUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleApprove(payment._id)}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(payment._id)}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden p-6 space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment._id}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-white">
                            {payment.userId?.name?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {payment.userId?.name || "N/A"}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {payment.month}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentTypeColor(payment.type)}`}
                      >
                        {payment.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Amount
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Paid Date
                        </p>
                        <p className="text-sm text-slate-900 dark:text-slate-100">
                          {new Date(payment.paidAt).toLocaleDateString(
                            "en-IN",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-600">
                      <a
                        href={payment.screenshotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Screenshot
                      </a>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApprove(payment._id)}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(payment._id)}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
