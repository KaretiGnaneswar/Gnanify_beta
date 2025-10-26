
import { motion } from "framer-motion";

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="about"
      className="px-6 md:px-20 py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 bg-gray-100 text-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Text */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">About Us</h2>
        <p className="text-gray-700 text-lg sm:text-xl md:text-lg max-w-md">
          Gnanify is a student-first platform designed to empower learning, sharing, and collaboration.
          Our mission is to help students grow through knowledge, community engagement, and skill development.
        </p>
        <p className="text-gray-600 text-md max-w-md">
          Join a network of learners and contributors, track your learning progress, and unlock opportunities
          through collaboration and guidance from experts.
        </p>
      </div>

      {/* Image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        whileHover={{ scale: 1.02 }}
      >
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80"
          alt="About Us"
          className="rounded-2xl shadow-xl object-cover w-full max-w-sm md:max-w-md"
        />
      </motion.div>
    </motion.section>
  );
};

export default AboutUs;
