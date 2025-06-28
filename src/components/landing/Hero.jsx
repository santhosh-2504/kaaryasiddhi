import { LineChart, Pill, Target } from 'lucide-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const FeatureCard = ({ icon: Icon, title, description, onClick, className }) => (
  <div 
    className={`bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 ${className}`}
    role="article"
    onClick={onClick}
  >
    <div className="text-emerald-600 dark:text-emerald-400 text-4xl mb-4 flex justify-center">
      <Icon className="w-8 h-8" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
      {description}
    </p>
  </div>
);

FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

const Hero = ({ className = '' }) => {
  const router = useRouter();
  const {isAuthenticated} = useSelector((state) => state.user);

  const handleStartJourney = () => {
    if (isAuthenticated) {
      router.push('/path');
    } else {
      window.open("https://wa.me/919014185655?text=Hi%20Santhosh%2C%20I%20found%20your%20mentorship%20program%20interesting!%20I%20have%20some%20questions", "_blank");
    }
  };

  return (
    <section 
      className={`bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-5 ${className}`}
      aria-label="Hero section"
    >
      <div className="container mx-auto px-6">
        <div className="py-12 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/logo (2).png" 
              alt="KaaryaSiddhi Logo" 
              className="h-16 w-auto dark:invert"
            />
          </div>
          
          <div className="mb-4">
            <p className="text-emerald-700 dark:text-emerald-300 font-medium text-lg mb-2 tracking-wide">
              "Kaarya. Karma. Siddhi."
            </p>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
            Empowering Students with{' '}
            <span className="text-emerald-600 dark:text-emerald-400">Skills That Matter</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            At KaaryaSiddhi, we guide you from college to career with real-world tasks, 
            personal mentorship, and profile-building on GitHub and LinkedIn.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleStartJourney}
              className="px-8 py-4 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Start your journey with KaaryaSiddhi"
            >
              Start Your Journey
            </button>
            {/* <button
              onClick={() => router.push('/how-it-works')}
              className="px-8 py-4 text-lg font-semibold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border-2 border-emerald-600 dark:border-emerald-400 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Learn how KaaryaSiddhi works"
            >
              How It Works
            </button> */}
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            role="region"
            aria-label="Features"
          >
            <FeatureCard
              icon={Pill}
              title="Learn by Doing"
              description="Practical tasks, projects, and real-world concepts — not just lectures."
            />
            <FeatureCard
              icon={LineChart}
              title="Track Progress"
              description="Levels, streaks, and manual validation to keep students accountable."
            />
            <FeatureCard
              icon={Target}
              title="Parent Connect"
              description="Parents can monitor progress, fee status, and support their child's growth."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  className: PropTypes.string
};

export default Hero;