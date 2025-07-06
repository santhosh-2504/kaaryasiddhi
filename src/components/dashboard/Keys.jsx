import { useEffect, useState } from "react";
import {
  getRapidApiKeys,
  saveRapidApiKeys,
  getSelectedKeyIndex,
  setSelectedKeyIndex,
  migrateOldKeys,
  isClientSide,
} from "@/lib/keys";

export default function Keys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [currentKey, setCurrentKey] = useState("");
  const [label, setLabel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize component
  useEffect(() => {
    if (!isClientSide()) return;

    try {
      // Migrate old keys if necessary
      migrateOldKeys();

      // Load keys and selected index
      const stored = getRapidApiKeys();
      const selected = getSelectedKeyIndex();

      // Validate selected index
      let validSelectedIndex = selected;
      if (stored.length === 0) {
        validSelectedIndex = null;
        setSelectedKeyIndex(null);
      } else if (
        selected === null ||
        selected >= stored.length ||
        selected < 0
      ) {
        validSelectedIndex = null;
        setSelectedKeyIndex(null);
      }

      setApiKeys(stored);
      setSelectedIndex(validSelectedIndex);
    } catch (error) {
      console.error("Error initializing Keys component:", error);
      setMessage("Error loading saved keys. Please refresh the page.");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveKeys = (keys) => {
    try {
      saveRapidApiKeys(keys);
      setApiKeys(keys);
    } catch (error) {
      console.error("Error saving keys:", error);
      setMessage("Error saving keys. Please try again.");
      setStatus("error");
    }
  };

  const setActiveKey = (index) => {
    try {
      setSelectedKeyIndex(index);
      setSelectedIndex(index);
    } catch (error) {
      console.error("Error setting active key:", error);
      setMessage("Error setting active key. Please try again.");
      setStatus("error");
    }
  };

  const testApiKey = async () => {
    if (!currentKey.trim()) {
      setMessage("Please enter an API key.");
      setStatus("error");
      return;
    }

    setStatus("testing");
    setMessage("Testing API key...");

    try {
      // Test with a simple RapidAPI endpoint
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const res = await fetch("https://judge0-ce.p.rapidapi.com/languages", {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": currentKey.trim(),
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid API key");
        } else if (res.status === 403) {
          throw new Error("API key lacks necessary permissions");
        } else if (res.status === 429) {
          throw new Error("Rate limit exceeded");
        } else {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
      }

      // If we get here, the key is valid
      const today = new Date().toISOString().split("T")[0];
      const newKeyObj = {
        label: label.trim() || `Key ${apiKeys.length + 1}`,
        key: currentKey.trim(),
        usedToday: 0,
        lastUsed: today,
      };

      // Check if key already exists
      const existingKeyIndex = apiKeys.findIndex(
        (k) => k.key === currentKey.trim(),
      );
      if (existingKeyIndex !== -1) {
        setMessage("❌ This API key already exists.");
        setStatus("error");
        return;
      }

      const updated = [...apiKeys, newKeyObj];
      saveKeys(updated);
      setActiveKey(updated.length - 1);

      setMessage("✅ API key is valid and saved successfully!");
      setStatus("success");
      setCurrentKey("");
      setLabel("");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage("");
        setStatus(null);
      }, 3000);
    } catch (err) {
      if (err.name === "AbortError") {
        setStatus("error");
        setMessage(
          "❌ Request timeout. Please check your internet connection.",
        );
      } else {
        setStatus("error");
        setMessage(`❌ ${err.message}`);
      }
    }
  };

  const deleteKey = (index) => {
    if (index < 0 || index >= apiKeys.length) return;

    const updated = apiKeys.filter((_, i) => i !== index);
    saveKeys(updated);

    // Handle selectedIndex adjustment
    if (updated.length === 0) {
      // All keys deleted
      setSelectedKeyIndex(null);
      setSelectedIndex(null);
    } else if (index === selectedIndex) {
      // Deleted the selected key - select first available key
      setSelectedKeyIndex(0);
      setSelectedIndex(0);
    } else if (index < selectedIndex) {
      // Shift selected index back by 1
      const newIndex = selectedIndex - 1;
      setSelectedKeyIndex(newIndex);
      setSelectedIndex(newIndex);
    }
    // If index > selectedIndex, no change needed
  };

  const formatApiKey = (key) => {
    if (key.length <= 14) return key;
    return `${key.slice(0, 8)}...${key.slice(-6)}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        RapidAPI Key Manager
      </h3>

      <div className="space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                RapidAPI Setup Required
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                To execute code in languages other than JavaScript, you need a
                RapidAPI key for Judge0.
                <a
                  href="https://rapidapi.com/judge0-official/api/judge0-ce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline ml-1"
                >
                  Get your free API key here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Add New Key Section */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Add New API Key
          </h4>

          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 dark:text-gray-200">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Main, Backup, Testing..."
                className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 
                         rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={50}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 dark:text-gray-200">
                API Key
              </label>
              <input
                type="text"
                value={currentKey}
                onChange={(e) => setCurrentKey(e.target.value)}
                placeholder="Enter your RapidAPI Key"
                className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 
                         rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={testApiKey}
              disabled={status === "testing"}
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                       text-white rounded-md font-medium transition-colors duration-200
                       disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status === "testing" ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing...
                </>
              ) : (
                "Test & Save Key"
              )}
            </button>

            {/* Status Message */}
            {message && (
              <div
                className={`p-3 rounded-md ${
                  status === "success"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : status === "error"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                }`}
              >
                <p
                  className={`text-sm ${
                    status === "success"
                      ? "text-green-800 dark:text-green-200"
                      : status === "error"
                        ? "text-red-800 dark:text-red-200"
                        : "text-yellow-800 dark:text-yellow-200"
                  }`}
                >
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Keys Section */}
        <div>
          <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Saved API Keys ({apiKeys.length})
          </h4>

          {apiKeys.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2v6m0 0v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v-2a2 2 0 012-2m0 0V9a2 2 0 012-2m0 0V7a2 2 0 012-2"
                />
              </svg>
              <p>No API keys saved yet</p>
              <p className="text-sm mt-1">
                Add your first RapidAPI key above to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((keyObj, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    index === selectedIndex
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md"
                      : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {index === selectedIndex ? (
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          ) : (
                            <div className="w-3 h-3 bg-gray-300 dark:bg-gray-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {keyObj.label}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {formatApiKey(keyObj.key)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Used today: {keyObj.usedToday || 0}</span>
                        <span>Last used: {keyObj.lastUsed || "Never"}</span>
                        {index === selectedIndex && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {index !== selectedIndex && (
                        <button
                          onClick={() => setActiveKey(index)}
                          className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 
                                   border border-blue-600 dark:border-blue-400 hover:border-blue-800 dark:hover:border-blue-300 
                                   rounded transition-colors duration-200"
                        >
                          Activate
                        </button>
                      )}
                      <button
                        onClick={() => deleteKey(index)}
                        className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 
                                 border border-red-600 dark:border-red-400 hover:border-red-800 dark:hover:border-red-300 
                                 rounded transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Statistics */}
        {apiKeys.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">
              Usage Statistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {apiKeys.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Keys
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {apiKeys.reduce((sum, key) => sum + (key.usedToday || 0), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Requests Today
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedIndex !== null ? 1 : 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Key
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
