import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  FaUserAlt,
  FaLaptopCode,
  FaChartLine,
  FaMedal,
  FaUserGraduate,
} from "react-icons/fa";

const stepColors = [
  "from-[#FF8C00] to-[#FFA500]",
  "from-[#6366F1] to-[#818CF8]",
  "from-[#14B8A6] to-[#0D9488]",
  "from-[#F43F5E] to-[#E11D48]",
  "from-[#F59E0B] to-[#FBBF24]",
];

const steps = [
  {
    title: "Join the Platform",
    desc: "Create your account, log in daily, and begin your journey toward becoming a valued contributor.",
    icon: <FaUserAlt size={36} />,
  },
  {
    title: "Practice & Engage",
    desc: "Participate in assignments, share insights, write blogs, and engage with others to build your presence.",
    icon: <FaLaptopCode size={36} />,
  },
  {
    title: "Track Your Progress",
    desc: "Your profile evolves with you — track scores, view analytics, and stay consistent every day.",
    icon: <FaChartLine size={36} />,
  },
  {
    title: "Unlock Contributor Badge",
    desc: "Reach new milestones and earn the prestigious Contributor Badge — your proof of excellence.",
    icon: <FaMedal size={36} />,
  },
  {
    title: "Switch to Creator Profile",
    desc: "Level up to mentor others, publish your own content, and lead the learning community.",
    icon: <FaUserGraduate size={36} />,
  },
];

const Contributor = () => {
  return (
    <section
      id="contributor"
      className="relative min-h-screen bg-[#0B0B0C] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-500 opacity-10 rounded-full blur-[200px]"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center pt-28 px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-orange-400">
          Your Path to Become a Contributor
        </h1>
        <p className="text-neutral-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Start as a learner, grow as an achiever, and rise as a community
          leader. Every step you take builds your reputation.
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.4 },
          },
        }}
        className="max-w-5xl mx-auto mt-28 space-y-36 px-6 relative"
      >
        {steps.map((step, idx) => (
          <Step key={idx} step={step} idx={idx} />
        ))}
      </motion.div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-24"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-orange-400">
          Ready to Level Up? 🚀
        </h2>
        <p className="text-neutral-400 mb-8 max-w-lg mx-auto leading-relaxed">
          Start today and earn your Contributor Badge by actively engaging and
          helping others grow.
        </p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold shadow-[0_0_20px_rgba(255,140,0,0.4)] hover:shadow-[0_0_30px_rgba(255,140,0,0.6)] transition-all duration-300"
        >
          Become a Contributor
        </motion.a>
      </motion.div>
    </section>
  );
};

const Step = ({ step, idx }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const stepVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "backOut" },
    },
    hover: {
      rotate: 10,
      scale: 1.15,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className={`flex flex-col md:flex-row items-center gap-12 ${
        idx % 2 === 0 ? "" : "md:flex-row-reverse"
      } relative`}
    >
      {/* Connection Line */}
      {idx < steps.length - 1 && (
        <div className="absolute left-1/2 top-full w-[2px] h-32 bg-gradient-to-b from-orange-500 to-transparent md:left-auto md:top-1/2 md:h-[2px] md:w-32 md:bg-gradient-to-r md:translate-x-0 opacity-40"></div>
      )}

      {/* Icon */}
      <motion.div
        variants={iconVariants}
        className={`flex-shrink-0 p-6 rounded-full bg-gradient-to-br ${
          stepColors[idx]
        } shadow-[0_0_40px_rgba(255,140,0,0.4)]`}
      >
        {step.icon}
      </motion.div>

      {/* Text */}
      <div className="max-w-md text-center md:text-left">
        <h3 className="text-2xl font-semibold mb-2 text-orange-300">
          {step.title}
        </h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default Contributor;
