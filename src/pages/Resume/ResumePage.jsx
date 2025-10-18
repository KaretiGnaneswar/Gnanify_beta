import React from "react";

const ResumePage = () => {
  const steps = [
    {
      number: 1,
      title: "Choose Your Template",
      desc: "Browse our collection of modern, recruiter-approved templates and start editing instantly.",
    },
    {
      number: 2,
      title: "Fill In Your Details",
      desc: "Easily add your personal, educational, and professional information with guided prompts.",
    },
    {
      number: 3,
      title: "Download Your Resume",
      desc: "Export a polished, ATS-friendly PDF ready to impress hiring managers.",
    },
  ];

  const features = [
    {
      icon: "📥",
      title: "Auto-Save Your Progress",
      desc: "Your work is saved in real-time, so you never lose your resume while editing.",
    },
    {
      icon: "🧊",
      title: "ATS-Optimized Templates",
      desc: "Templates are designed to pass Applicant Tracking Systems and reach recruiters effectively.",
    },
    {
      icon: "📄",
      title: "Free PDF Export",
      desc: "Download your resume in professional PDF format without any cost.",
    },
    {
      icon: "💡",
      title: "Smart Suggestions",
      desc: "Receive instant recommendations for keywords, formatting, and structure to improve your resume.",
    },
    {
      icon: "🎨",
      title: "Multiple Designs",
      desc: "Choose templates suited for freshers, experienced professionals, or career switchers.",
    },
  ];

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Build Your ATS-Friendly Resume in Minutes 💼
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          Create a standout resume that gets noticed by recruiters and passes Applicant Tracking Systems — no design skills required.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-orange-500 font-semibold rounded shadow hover:bg-gray-100 transition">
          Start Building
        </button>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {steps.map((step) => (
            <div key={step.number} className="p-6 rounded border border-gray-200 bg-white hover:shadow-md transition">
              <div className="text-3xl font-bold mb-2">{step.number}</div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-orange-50">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Resume Builder?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded border border-gray-200 bg-white hover:shadow-md transition">
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call-To-Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Crafting Your Professional Resume Today 🚀</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-700">
          Create a professional, recruiter-ready resume effortlessly. Make your skills stand out and unlock better job opportunities.
        </p>
        <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded shadow hover:bg-orange-600 transition">
          Create My Resume
        </button>
      </section>
    </main>
  );
};



export default ResumePage;
