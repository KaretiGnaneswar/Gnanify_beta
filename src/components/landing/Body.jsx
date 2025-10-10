import React from 'react';

const Body = () => {
  return (
    <main className="w-full bg-gray-900 text-white min-h-screen">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Welcome to Gnanify</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Gnanify is a platform for learning and growth. Explore courses, connect with others, and achieve your career goals.
        </p>
      </section>

      <section className="py-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Courses</h2>
          <p>Browse various courses to level up your skills.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Connections</h2>
          <p>Connect with peers and industry experts.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Blog</h2>
          <p>Read articles and tutorials to boost your knowledge.</p>
        </div>
      </section>
    </main>
  );
};

export default Body;
