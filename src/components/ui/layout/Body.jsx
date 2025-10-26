
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-32 px-4 sm:py-40 text-white overflow-hidden"
      style={{
        backgroundColor: "#1f2937", // dark background
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to Gnanify
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Learn, Share, and Connect with the student community.
      </motion.p>
      <motion.div
        className="flex gap-4 flex-wrap justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          Get Started
        </button>
        <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg transition-all duration-300">
          Learn More
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
