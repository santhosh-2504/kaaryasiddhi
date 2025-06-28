import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PropTypes from 'prop-types';

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
    <button
      onClick={onToggle}
      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
      aria-expanded={isOpen}
      aria-controls={`faq-answer-${question.substring(0, 20)}`}
    >
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white pr-4">
        {question}
      </h3>
      <div className="flex-shrink-0 text-emerald-600 dark:text-emerald-400">
        {isOpen ? (
          <ChevronUp className="w-5 h-5" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        )}
      </div>
    </button>
    
    <div
      id={`faq-answer-${question.substring(0, 20)}`}
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 pb-5 pt-2">
        <p className="text-slate-600 text-lg dark:text-slate-300 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  </div>
);

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

const FAQs = ({ className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

const faqData = [
  {
    question: "What exactly is KaaryaSiddhi?",
    answer: "KaaryaSiddhi is a mentorship platform that guides students from basic to advanced levels in full stack development and essential professional skills like resume building, GitHub activity, and LinkedIn visibility."
  },
  {
    question: "Who is this mentorship for?",
    answer: "This is designed for B.Tech students of all years, especially beginners with no prior experience in coding or tech."
  },
  {
    question: "How is this different from online courses on YouTube or Udemy?",
    answer: "We don’t just teach. We mentor you personally, help you stay consistent, validate your progress, review your profiles, and track your real growth with projects, tasks, and feedback."
  },
  {
    question: "Do I need to know JavaScript already?",
    answer: "No. We start from scratch — including HTML, CSS, and JavaScript — and build up gradually to full stack development using MERN."
  },
  {
    question: "What if I’m unable to complete tasks regularly?",
    answer: "There’s no pressure. You can request a ‘freeze’ if you're genuinely stuck. We focus on consistency, not rush."
  },
  {
    question: "Is there a trial or demo before paying?",
    answer: "You can explore our Level 0 tasks and entire platform before joining the paid mentorship."
  },
  {
    question: "Will I get help with internships or job placements?",
    answer: "Yes. Once you reach advanced levels and have a solid portfolio, we guide you on applying, networking, and building a strong profile for internships and jobs."
  },
  {
    question: "Is this mentorship in-person or online?",
    answer: "It’s fully online and flexible. You submit tasks at your pace, and we provide regular reviews and check-ins."
  }
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className={`bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 ${className}`}
      aria-label="Frequently Asked Questions"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Still have questions? We're here to help!
            </p>
            <button className="px-8 py-3 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open("https://wa.me/919014185655?text=Hi%20Santhosh%2C%20I%20found%20your%20mentorship%20program%20interesting!%20I%20have%20some%20questions", "_blank")}
              aria-label="Contact us on WhatsApp"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

FAQs.propTypes = {
  className: PropTypes.string
};

export default FAQs;