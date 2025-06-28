import { GraduationCap, ClipboardCheck, Github, TrendingUp, Users } from 'lucide-react';

const steps = [
  {
    title: "Begin at Your Level",
    description: "Whether you're a beginner or a pro, you start where you are and grow steadily.",
    icon: GraduationCap
  },
  {
    title: "Complete Real-World Tasks",
    description: "Submit projects, screenshots, links, or files. Everything is reviewed manually.",
    icon: ClipboardCheck
  },
  {
    title: "Build Your GitHub & LinkedIn Profile",
    description: "We personally help you build strong online presence that recruiters love.",
    icon: Github
  },
  {
    title: "Track Progress with Levels & Streaks",
    description: "Motivation meets accountability with our level system and daily streaks.",
    icon: TrendingUp
  },
  {
    title: "Get Mentored, Not Just Taught",
    description: "One-on-one guidance, feedback, and goal tracking to stay on course.",
    icon: Users
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-br from-white via-emerald-50 to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-20 w-full" aria-label="How KaaryaSiddhi Works">
      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-slate-800 dark:text-white mb-4">
            How KaaryaSiddhi Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 text-center mb-16 max-w-3xl mx-auto">
            Our structured approach ensures every student gets personalized guidance and real-world experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 dark:bg-white text-white dark:text-slate-800 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-6 py-3 rounded-full font-semibold">
              <Users className="w-5 h-5" />
              Don't regret not starting today!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;