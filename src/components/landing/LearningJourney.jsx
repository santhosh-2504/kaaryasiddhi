import PropTypes from "prop-types";

const LearningJourney = ({ className = "" }) => {
  const journeySteps = [
    {
      title: "Start From Scratch",
      description:
        "We help you set up GitHub, LinkedIn, and write your first lines of code — with no prior experience needed.",
    },
    {
      title: "Learn by Doing",
      description:
        "You’ll build real projects, not just watch videos. Everything you create gets reviewed and improved with feedback.",
    },
    {
      title: "Grow Your Presence",
      description:
        "We guide you to post your progress, push to GitHub, and build a strong LinkedIn and online portfolio.",
    },
    {
      title: "Become Job-Ready",
      description:
        "By the end, you’ll be confident with full-stack projects, resume-ready, and equipped to apply for internships or jobs.",
    },
  ];

  return (
    <section
      className={`w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 ${className}`}
      aria-label="Learning Journey section"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Your Learning Journey
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A self-paced path from zero to confidence — guided by real
            mentorship.
          </p>
        </div>

        <div className="max-w-8xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {journeySteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-full"
            >
              <h3 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 dark:text-slate-300">
            This is not just another course. It's a journey that reflects in
            your skills, profiles, and projects.
          </p>
        </div>
      </div>
    </section>
  );
};

LearningJourney.propTypes = {
  className: PropTypes.string,
};

export default LearningJourney;
