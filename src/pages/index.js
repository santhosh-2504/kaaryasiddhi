import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LearningJourney from "@/components/landing/LearningJourney";
import ParentConnect from "@/components/landing/ParentConnect";
import FAQs from "@/components/landing/FAQ";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import AIModal from "@/components/landing/AiModal";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-5">
          <div className="mx-auto">
            <HowItWorks />
          </div>
        </section>

        {/* Learning Journey Section */}
        <section id="learning-journey">
          <div className="mx-auto">
            <LearningJourney />
          </div>
        </section>

        {/* Parent Connect Section */}
        <section id="parent-connect">
          <div className="mx-auto py-5">
            <ParentConnect />
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs">
          <div className="mx-auto">
            <FAQs />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-5">
          <div className="mx-auto">
            <Testimonials />
          </div>
        </section>

        {/* Final Call to Action Section */}
        <section id="final-cta" className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>

        <AIModal />
      </main>
    </>
  );
};

export default Home;
