
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
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">

      {/* ===== Desktop Version ===== */}
      <div className="hidden md:flex flex-row items-center justify-between min-h-screen px-6 md:px-20">
        {/* Text */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start space-y-6 z-10"
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

        {/* Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mb-0 z-10"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="relative w-full max-w-md">
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
      </div>

      {/* ===== Mobile Version ===== */}
      <div className="flex flex-col items-center justify-center px-4 py-12 md:hidden pt-24">
        <motion.div
          className="w-full max-w-xs sm:max-w-sm mb-6"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img
            src="/images/student-listening.jpg"
            alt="Student Listening"
            className="rounded-3xl shadow-2xl object-cover w-full transform hover:scale-105 transition-transform duration-500"
          />
          {/* Optional: small corner lines for mobile */}
          <div className="absolute -top-3 -left-3 w-12 h-12">
            <div className="border-t-4 border-l-4 border-orange-500 w-full h-full rounded-tl-xl"></div>
          </div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12">
            <div className="border-b-4 border-r-4 border-blue-500 w-full h-full rounded-br-xl"></div>
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-center mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Welcome to <span className="text-orange-400">Gnanify</span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-300 text-center mb-6"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Learn, Grow, and Connect with students & professionals. Track your learning journey and excel!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-500 hover:border-transparent transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
