import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (

    <section id="hero" className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      
      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`row-${i}`} className="border-t border-white/5" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`col-${i}`} className="border-l border-white/5" />
        ))}
      </div>

      {/* Left Side Content */}
      <motion.div
        className="relative md:w-1/2 flex flex-col items-start space-y-6 z-10"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-orange-400">Gnanify</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-md">
          Learn, Grow, and Connect with students & professionals. Track your learning journey and excel!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:border-transparent transition-all duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>

{/* Right Side Image */}
<motion.div
  className="relative md:w-1/2 flex justify-center mb-8 md:mb-0 z-10"
  initial="hidden"
  animate="visible"
  variants={imageVariants}
>
  <div className="relative w-full max-w-sm md:max-w-md">
    <img
      src="/images/student-listening.jpg"
      alt="Student Listening"
      className="rounded-3xl shadow-2xl object-cover w-full transform hover:scale-105 transition-transform duration-500"
    />
    
    {/* Top-left corner lines */}
    <div className="absolute -top-4 -left-4 w-16 h-16">
      <div className="border-t-4 border-l-4 border-orange-500 w-full h-full rounded-tl-xl"></div>
    </div>

    {/* Bottom-right corner lines */}
    <div className="absolute -bottom-4 -right-4 w-16 h-16">
      <div className="border-b-4 border-r-4 border-blue-500 w-full h-full rounded-br-xl"></div>
    </div>
  </div>
</motion.div>


    </section>
  );
};

export default Hero;
