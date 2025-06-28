export default function StreakModal({ onClose, streak }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl relative border border-gray-200 dark:border-slate-700 transition-all animate-bounce-in">
        
        {/* Coin */}
        <div className="w-32 h-32 rounded-full bg-yellow-400 border-4 border-yellow-600 mx-auto relative coin-spin flex items-center justify-center shadow-lg image-rendering-pixel">
          <div className="text-5xl animate-fire-glow shake-slow z-10">🔥</div>

          {/* Sprinkles / Embers */}
          <div className="sprinkle left-[35%] animate-rise1" />
          <div className="sprinkle left-[50%] animate-rise2" />
          <div className="sprinkle left-[65%] animate-rise3" />
        </div>

        {/* Text */}
        <h2 className="text-4xl font-extrabold text-green-600 dark:text-emerald-400 mt-6 text-center">
          +1 Streak!
        </h2>
        <p className="text-lg text-gray-700 dark:text-slate-300 mt-2 text-center">
          Current streak: {streak}🔥
        </p>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:hover:bg-emerald-500 rounded-lg transition-all duration-200 shadow-md"
          >
            Got it!
          </button>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .coin-spin {
            animation: spin 2s linear infinite;
            transform-style: preserve-3d;
          }

          .shake-slow {
            animation: shake 0.3s infinite alternate ease-in-out;
          }

          .sprinkle {
            position: absolute;
            bottom: 10%;
            width: 6px;
            height: 6px;
            background-color: #f87171;
            border-radius: 9999px;
            opacity: 0.8;
          }

          @keyframes spin {
            0% {
              transform: rotateY(0deg);
            }
            100% {
              transform: rotateY(360deg);
            }
          }

          @keyframes shake {
            0% {
              transform: translate(0px, 0px);
            }
            100% {
              transform: translate(1px, -1px);
            }
          }

          @keyframes fire-glow {
            0%, 100% {
              text-shadow: 0 0 5px #f87171, 0 0 10px #facc15;
            }
            50% {
              text-shadow: 0 0 10px #f87171, 0 0 20px #facc15;
            }
          }

          .animate-fire-glow {
            animation: fire-glow 1.2s infinite ease-in-out;
          }

          @keyframes rise1 {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-40px) scale(0.5);
              opacity: 0;
            }
          }

          @keyframes rise2 {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-35px) scale(0.5);
              opacity: 0;
            }
          }

          @keyframes rise3 {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-45px) scale(0.5);
              opacity: 0;
            }
          }

          .animate-rise1 {
            animation: rise1 1s ease-in infinite;
          }

          .animate-rise2 {
            animation: rise2 1.2s ease-in infinite;
          }

          .animate-rise3 {
            animation: rise3 1.4s ease-in infinite;
          }

          .image-rendering-pixel {
            image-rendering: pixelated;
          }
        `}</style>
      </div>
    </div>
  );
}
