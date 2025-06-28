// 'use client';
// import { useState } from "react";
// import { toast } from "react-toastify";

// const FeePayment = () => {
//   const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7)); // "YYYY-MM"
//   const [amount, setAmount] = useState(1000);
//   const [type, setType] = useState("subscription");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const convertToBase64 = (file) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = reject;
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       toast.error("Please upload a screenshot");
//       return;
//     }

//     try {
//       setLoading(true);
//       const base64 = await convertToBase64(file);

//       const res = await fetch("/api/payments/pay", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ month, amount, type, base64 }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Payment submitted successfully!");
//         setFile(null);
//       } else {
//         toast.error(data.message || "Payment failed.");
//       }
//     } catch (err) {
//       toast.error("Something went wrong.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-xl font-semibold">Pay Monthly Fee</h2>

//       <div>
//         <label className="block font-medium">Month</label>
//         <input
//           type="month"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Amount (₹)</label>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(Number(e.target.value))}
//           required
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">Type</label>
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         >
//           <option value="subscription">Subscription</option>
//           <option value="due">Due</option>
//         </select>
//       </div>

//       <div>
//         <label className="block font-medium">Upload Screenshot</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//           className="w-full"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {loading ? "Uploading..." : "Submit Payment"}
//       </button>
//     </form>
//   );
// };

// export default FeePayment;


'use client';
import { useState } from "react";
import { toast } from "react-toastify";

const FeePayment = () => {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7)); // "YYYY-MM"
  const [amount, setAmount] = useState(1000);
  const [type, setType] = useState("subscription");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a screenshot");
      return;
    }

    try {
      setLoading(true);
      const base64 = await convertToBase64(file);

      const res = await fetch("/api/payments/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, amount, type, base64 }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Payment submitted successfully!");
        setFile(null);
        // Reset form
        setMonth(new Date().toISOString().slice(0, 7));
        setAmount(1000);
        setType("subscription");
      } else {
        toast.error(data.message || "Payment failed.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Pay Monthly Fee
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200 font-medium">
            Month
          </label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200 font-medium">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            min="1"
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200 font-medium">
            Payment Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                     rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                     focus:border-blue-500 transition-colors"
          >
            <option value="subscription">Subscription</option>
            <option value="due">Due Payment</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-200 font-medium">
            Upload Payment Screenshot
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                       rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500 transition-colors file:mr-4 file:py-1 file:px-3 
                       file:rounded-md file:border-0 file:text-sm file:font-medium 
                       file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-200
                       hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
            />
          </div>
          {file && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                     text-white font-medium rounded-md transition-colors duration-200 
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     dark:focus:ring-offset-gray-800 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              "Submit Payment"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          Payment Instructions:
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Complete your payment through the designated payment method</li>
          <li>• Take a clear screenshot of the successful transaction</li>
          <li>• Upload the screenshot and submit this form</li>
          <li>• Your payment will be verified shortly</li>
        </ul>
      </div>
    </div>
  );
};

export default FeePayment;