import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const FinalCTA = ({ className = "" }) => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/path");
    } else {
      router.push("/login");
    }
  };

  return (
    <section
      className={`bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 py-16 ${className}`}
      aria-label="Final call to action"
    >
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Are You Ready to Begin?
          </h2>

          <p className="text-xl text-emerald-100 dark:text-emerald-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of students building their future one task at a time.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleClick}
              className="px-8 py-4 text-lg font-semibold text-emerald-700 bg-white hover:bg-emerald-50 dark:bg-white dark:hover:bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
              aria-label="Start your first task"
            >
              Start Your First Task
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FinalCTA.propTypes = {
  className: PropTypes.string,
};

export default FinalCTA;
