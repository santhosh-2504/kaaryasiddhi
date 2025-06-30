import {
  Users,
  Eye,
  CreditCard,
  Award,
  TrendingUp,
  FileText,
} from "lucide-react";
import PropTypes from "prop-types";

const HighlightCard = ({ icon: Icon, title, description, className }) => (
  <div
    className={`bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 border border-gray-100 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-slate-700 ${className}`}
  >
    <div className="flex items-start space-x-4">
      <div className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-lg">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

HighlightCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const ParentConnect = ({ className = "" }) => {
  const highlights = [
    {
      icon: TrendingUp,
      title: "Track your child's progress",
      description:
        "Monitor learning milestones, completed tasks, and skill development in real-time.",
    },
    {
      icon: FileText,
      title: "See task submissions and level status",
      description:
        "View detailed submissions, feedback from mentors, and current achievement levels.",
    },
    {
      icon: CreditCard,
      title: "Monitor fee payments and upload receipts",
      description:
        "Stay on top of payments with easy receipt uploads and payment history tracking.",
    },
    {
      icon: Award,
      title: "Know your child is learning real skills, not just marks",
      description:
        "Focus on practical abilities and career-ready competencies that matter in the real world.",
    },
  ];

  return (
    <section
      className={`py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ${className}`}
      aria-label="Parent Connect section"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Peace of Mind for Parents
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A transparent panel for parents to stay involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {highlights.map((highlight, index) => (
            <HighlightCard
              key={index}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-emerald-50 dark:bg-emerald-900/30 rounded-full px-8 py-4 border border-emerald-200 dark:border-emerald-800">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
            <p className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
              We bridge the gap between learning and accountability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

ParentConnect.propTypes = {
  className: PropTypes.string,
};

export default ParentConnect;
