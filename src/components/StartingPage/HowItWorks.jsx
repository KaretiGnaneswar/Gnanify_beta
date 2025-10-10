import React from "react";
import { FaClock, FaChartLine, FaProjectDiagram, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaClock size={28} />,
      title: "Track Your Learning Progress",
      description:
        "Once you log in, Gnanify tracks your activity—time spent reading blogs, solving coding problems, and engaging with tech content. All your progress contributes to your personal score.",
    },
    {
      icon: <FaChartLine size={28} />,
      title: "Skill Assessment & Leaderboard",
      description:
        "Our smart algorithm evaluates your skills based on your activities and performance. Top scorers are highlighted on the leaderboard and get opportunities to contribute to real-world projects.",
    },
    {
      icon: <FaProjectDiagram size={28} />,
      title: "Hands-On Real-Time Experience",
      description:
        "Work on practical systems like email platforms, mobile apps, and clones of real-world applications such as Quick Commerce. Gain experience from concept to deployment in real-time tech environments.",
    },
    {
      icon: <FaRocket size={28} />,
      title: "From Learner to Contributor & Beyond",
      description:
        "Your journey goes beyond just learning: become a contributor, build real projects, and get noticed by recruiters. Whether you aim to land a tech job or start your own startup, Gnanify guides you from student to professional.",
    },
  ];

  return (
    <section className="bg-gray-900 text-white py-20 px-6" id="how-it-works">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-4">
          How Gnanify Works
        </h2>
        <p className="text-gray-300 text-lg md:text-xl">
          Track your learning, build skills, work on real projects, and transform from a student to a contributor, job seeker, or startup founder.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative bg-gray-800/90 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform border border-gray-700 flex flex-col items-center text-center"
          >
            {/* Step number circle */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold text-lg shadow-lg">
              {idx + 1}
            </div>

            {/* Icon circle */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 text-orange-400 mb-4 shadow-inner">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
