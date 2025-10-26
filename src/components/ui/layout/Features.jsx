
import { motion } from "framer-motion";
import { FaBook, FaBlog, FaUsers, FaPuzzlePiece, FaFileAlt, FaChartLine } from "react-icons/fa";

const featuresData = [
  {
    title: "Courses & Learning",
    desc: "Access a variety of courses, track your progress, and enhance your skills.",
    icon: <FaBook size={28} />,
    color: "from-orange-400 to-pink-500",
  },
  {
    title: "Blogs & Insights",
    desc: "Read blogs and articles from experts and fellow learners.",
    icon: <FaBlog size={28} />,
    color: "from-purple-400 to-indigo-500",
  },
  {
    title: "Connect & Network",
    desc: "Connect with peers and mentors to share knowledge and opportunities.",
    icon: <FaUsers size={28} />,
    color: "from-green-400 to-teal-500",
  },
  {
    title: "Challenges & Practice",
    desc: "Solve coding problems, interview questions, and track your performance.",
    icon: <FaPuzzlePiece size={28} />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Resume & Career Prep",
    desc: "Build your resume, prepare for interviews, and track job applications.",
    icon: <FaFileAlt size={28} />,
    color: "from-pink-400 to-red-500",
  },
  {
    title: "Progress Tracker",
    desc: "Monitor your learning time, consistency, and achievements across courses.",
    icon: <FaChartLine size={28} />,
    color: "from-blue-400 to-indigo-500",
  },
];

const Features = () => (
  <section id="features" className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12">Features</h2>

    {/* ===== Desktop & Tablet Layout ===== */}
    <div className="hidden md:grid max-w-7xl mx-auto grid-cols-3 gap-8 px-4 sm:px-6">
      {featuresData.map((feature, idx) => (
        <motion.div
          key={idx}
          className="relative p-6 rounded-xl shadow-lg border border-gray-700 bg-gray-900 hover:scale-105 transition-transform duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          {/* Gradient highlights */}
          <div className={`absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-30 blur-3xl bg-gradient-to-br ${feature.color}`}></div>
          <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-30 blur-3xl bg-gradient-to-br ${feature.color}`}></div>

          <div className="flex items-center mb-4 space-x-4">
            <div className="text-white">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
          </div>
          <p className="text-gray-300">{feature.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* ===== Mobile Layout ===== */}
    <div className="flex flex-col md:hidden max-w-md mx-auto gap-6 px-4">
      {featuresData.map((feature, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col items-start bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
        >
          {/* Gradient background */}
          <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-full opacity-30 blur-2xl bg-gradient-to-br ${feature.color}`}></div>

          <div className="flex items-center mb-3 space-x-3">
            <div className="text-white">{feature.icon}</div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
          </div>
          <p className="text-gray-300 text-sm">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Features;
