import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-32 px-4 sm:py-40 text-white overflow-hidden"
      style={{
        backgroundColor: "#1f2937", // dark background
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      {/* Floating Decorative Circles */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-orange-500 rounded-full opacity-30"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full opacity-20"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
      ></motion.div>

      {/* Hero Title */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 z-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to Gnanify
      </motion.h1>

      {/* Animated Underline */}
      <motion.div
        className="h-1 w-24 bg-orange-400 mx-auto mb-6 rounded-full z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Subtitle */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Learn, Share, and Connect with the student community.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 flex-wrap justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.button
          className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(255,165,0,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
        <motion.button
          className="bg-transparent border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-1 h-4 bg-white rounded-full animate-bounce"></div>
        <span className="text-white text-sm">Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
