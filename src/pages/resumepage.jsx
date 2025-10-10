import React from 'react';

const ResumePage = () => {
  return (
    <main className="w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-400 mb-4">My Resume</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Showcase your skills, experience, and achievements. Keep it updated for recruiters and peers.
        </p>
      </section>

      {/* Resume Content */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <p><strong>Name:</strong> Kareti Gnaneswar</p>
          <p><strong>Email:</strong> gnaneswarkareti@gmail.com</p>
          <p><strong>Phone:</strong> +91 12345 67890</p>
          <p><strong>Location:</strong> India</p>
        </div>

        {/* Skills */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <ul className="list-disc list-inside">
            <li>React.js & Tailwind CSS</li>
            <li>JavaScript / TypeScript</li>
            <li>Python & Machine Learning</li>
            <li>Data Structures & Algorithms</li>
            <li>Firebase & Supabase (Backend)</li>
          </ul>
        </div>

        {/* Education */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <p><strong>B.Tech in Computer Science</strong></p>
          <p>XYZ University, India</p>
          <p>2019 - 2023</p>
        </div>

        {/* Experience */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <p><strong>AI/ML Intern</strong> - ICITY Tek</p>
          <p>Worked on building AI models and integrating them into web platforms.</p>
          <p><strong>Full-Stack Developer Intern</strong> - Gnanify</p>
          <p>Developed frontend with React and managed backend with Firebase.</p>
        </div>
      </section>

      {/* Footer note */}
      <section className="mt-12 text-center text-gray-400">
        <p>Keep your resume updated to track your learning journey on Gnanify.</p>
      </section>
    </main>
  );
};

export default ResumePage;
