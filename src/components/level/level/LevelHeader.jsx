import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useSelector } from "react-redux";

const LevelHeader = ({ level, index, isOpen, isLocked, onToggle }) => {
  const { user } = useSelector((state) => state.user);
  const userCurrentLevel = user?.isSubscribed ? (user?.currentLevel ?? 0) : 0;

  const getLevelIcon = (levelNumber, index) => {
    const icons = ["⚡", "🔥", "💎", "🌟", "👑", "🚀", "💫", "🎯", "⭐", "🏆"];
    return icons[index % icons.length];
  };

  const gradientColors = [
    "from-purple-600 to-pink-600",
    "from-cyan-600 to-blue-600",
    "from-emerald-600 to-teal-600",
    "from-orange-600 to-red-600",
    "from-violet-600 to-purple-600",
  ];
  const gradientClass = gradientColors[index % gradientColors.length];
  const isLevelLocked = level.levelNumber > userCurrentLevel;

  return (
    <button
      className="w-full text-left px-8 py-8 transition-all duration-300 flex justify-between items-center group relative overflow-hidden"
      onClick={() => !isLevelLocked && onToggle(level.levelNumber)}
      disabled={isLevelLocked}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center space-x-6 relative z-10">
        <div className="relative group/icon">
          <div
            className={`absolute -inset-2 bg-gradient-to-r ${gradientClass} rounded-full blur opacity-40 group-hover/icon:opacity-70 transition duration-300 animate-pulse`}
          />
          <div
            className={`relative bg-gradient-to-r ${gradientClass} p-4 rounded-full shadow-2xl transform group-hover/icon:scale-110 group-hover/icon:rotate-12 transition-all duration-300`}
          >
            <span className="text-2xl filter drop-shadow-md dark:drop-shadow-lg text-black dark:text-white">
              {getLevelIcon(level.levelNumber, index)}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300">
            {level.levelNumber}: {level.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
            {level.description}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 ml-6 relative z-10">
        <div className="bg-gray-100 dark:bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg group-hover:shadow-xl group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-all duration-300 border border-gray-300 dark:border-white/20">
          {isLevelLocked ? (
            <Lock className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-red-500 transition-colors duration-300" />
          ) : isOpen ? (
            <ChevronUp className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-purple-500 transition-colors duration-300 transform group-hover:scale-110" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-purple-500 transition-colors duration-300 transform group-hover:scale-110" />
          )}
        </div>
      </div>
    </button>
  );
};

export default LevelHeader;
