
import { motion } from "framer-motion";

const Testimonils = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Frontend Developer",
      feedback: "Gnanify helped me learn new skills and connect with amazing peers!",
      img: "/images/alice.jpg",
    },
    {
      name: "Bob Smith",
      role: "Backend Developer",
      feedback: "The platform is intuitive and really accelerated my learning journey.",
      img: "/images/bob.jpg",
    },
    {
      name: "Carol Davis",
      role: "UI/UX Designer",
      feedback: "Loved the interactive learning modules and teamwork.",
      img: "/images/carol.jpg",
    },
    {
      name: "David Lee",
      role: "Data Scientist",
      feedback: "Excellent platform to showcase skills and connect with experts.",
      img: "/images/david.jpg",
    },
    {
      name: "Eve Williams",
      role: "Fullstack Developer",
      feedback: "Gnanify made learning fun and collaborative!",
      img: "/images/eve.jpg",
    },
    {
      name: "Frank Miller",
      role: "Project Manager",
      feedback: "A great environment to grow your technical and soft skills.",
      img: "/images/frank.jpg",
    },
  ];

  return (
    <section className="relative py-20 px-6 md:px-20 bg-gray-900 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>

      {/* Animated horizontal lines */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none">
        <motion.div
          className="h-[1px] bg-white/10 w-full mb-20"
          animate={{ x: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="h-[1px] bg-white/10 w-full mt-20"
          animate={{ x: ["100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
      </div>

      {/* Horizontal Scrolling Cards */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {teamMembers.concat(teamMembers).map((member, index) => (
            <div
              key={index}
              className="bg-gray-800/70 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center gap-4 min-w-[250px] flex-shrink-0"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-orange-400"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-orange-400 font-semibold">{member.role}</p>
              <p className="text-gray-300 mt-2 text-center">{member.feedback}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonils;
