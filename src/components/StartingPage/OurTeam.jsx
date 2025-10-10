import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ravi Kumar",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Anjali Sharma",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Karan Singh",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Priya Verma",
    role: "Content Strategist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const OurTeam = () => {
  return (
    <section
      id="team"
      className="px-6 md:px-20 py-20 bg-gray-900 text-white"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Meet the talented minds behind Gnanify. Together, we build, innovate, and empower learners worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-400">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
