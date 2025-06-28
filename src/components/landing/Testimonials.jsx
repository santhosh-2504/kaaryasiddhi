// import { Quote } from 'lucide-react';

// const testimonials = [
//   {
//     name: "Ananya R.",
//     role: "1st Year Student",
//     quote: "Before joining, I didn’t even know what HTML was. Now I’ve built my first webpage and I'm on Level 2. The tasks are fun, and I learn something new every day!"
//   },
//   {
//     name: "Mr. Ramesh (Parent)",
//     role: "Parent of a Student",
//     quote: "As a parent, I can see my son's progress, his level, and if he’s active. I really like this system — it keeps both child and parents involved."
//   },
//   {
//     name: "Santhosh A.",
//     role: "Mentor & Creator",
//     quote: "This mentorship is not just about coding — it’s about creating consistent learners who are ready for the real world."
//   }
// ];

// const Testimonials = () => {
//   return (
//     <section className="bg-white dark:bg-gray-900 py-16" aria-label="Testimonials">
//       <div className="container mx-auto px-6 max-w-5xl">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
//           What People Are Saying
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
//             >
//               <div className="mb-4 text-blue-600">
//                 <Quote className="w-6 h-6" aria-hidden="true" />
//               </div>
//               <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
//                 “{t.quote}”
//               </p>
//               <div className="text-sm text-gray-800 dark:text-white font-semibold">
//                 {t.name}
//               </div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">
//                 {t.role}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import { Quote } from 'lucide-react';
import PropTypes from 'prop-types';

const TestimonialCard = ({ quote, author, className }) => (
  <div 
    className={`bg-white dark:bg-slate-800 shadow-lg rounded-xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-slate-700 ${className}`}
    role="article"
  >
    <div className="text-emerald-600 dark:text-emerald-400 mb-4 flex justify-center">
      <Quote className="w-8 h-8" aria-hidden="true" />
    </div>
    
    <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center leading-relaxed italic">
      "{quote}"
    </blockquote>
    
    <div className="text-center">
      <cite className="text-emerald-700 dark:text-emerald-300 font-semibold not-italic">
        – {author}
      </cite>
    </div>
  </div>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  className: PropTypes.string
};

const Testimonials = ({ className = '' }) => {
  const testimonials = [
    {
      quote: "Hardworking, innovative, and tech-savvy—he’s a perfect fit for startups or corporates. Always finds smart, cost-effective solutions without compromising quality",
      author: "Ram, founder of a tech startup"
    },
    {
      quote: "I never thought I'd build a real project in my first year. KaaryaSiddhi made me believe I can.",
      author: "Rohit, 1st Year BTech"
    },
    {
      quote: "GitHub and LinkedIn were alien to me. Now I'm getting interview calls!",
      author: "Anjali, 3rd Year ECE"
    }
  ];

  return (
    <section 
      className={`bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 ${className}`}
      aria-label="Student testimonials"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Testimonials
          </h2>
          <div className="w-24 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          role="region"
          aria-label="Student testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              className={index === 1 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Join the journey to transform your career with KaaryaSiddhi
          </p>
        </div>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;