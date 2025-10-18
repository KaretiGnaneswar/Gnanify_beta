import React from "react";
import { motion } from "framer-motion";

const Body = () => {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">

      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`row-${i}`} className="border-t border-white/5" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`col-${i}`} className="border-l border-white/5" />
        ))}
      </div>

      {/* Hero Text Section */}
      <section className="relative text-center py-20 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-orange-400">Gnanify</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Gnanify is a platform for learning and growth. Explore courses, connect with others, and achieve your career goals.
        </p>
      </section>

      {/* Cards Section */}
      <section className="relative py-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-12 z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-300"
        >
          <h2 className="text-xl font-bold mb-2">Courses</h2>
          <p>Browse various courses to level up your skills.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-300"
        >
          <h2 className="text-xl font-bold mb-2">Connections</h2>
          <p>Connect with peers and industry experts.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-300"
        >
          <h2 className="text-xl font-bold mb-2">Blog</h2>
          <p>Read articles and tutorials to boost your knowledge.</p>
        </motion.div>
      </section>
    </main>
  );
};

export default Body;
