import { useEffect } from "react";

export default function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage,
  supportedLanguages,
}) {
  // Fallback for empty supportedLanguages
  const languages =
    supportedLanguages.length > 0
      ? supportedLanguages
      : ["python", "javascript", "java", "cpp"];

  useEffect(() => {
    //console.log("LanguageSelector rendered with languages:", languages); // Debug log
    //console.log("Selected language:", selectedLanguage); // Debug log
  }, [languages, selectedLanguage]);

  return (
    <div className="flex items-center gap-3 z-20">
      <label className="text-sm font-medium text-slate-100">Language:</label>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="bg-slate-600 text-white border border-slate-400 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200 min-w-[140px]"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
