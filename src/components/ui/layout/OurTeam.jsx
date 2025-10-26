import React, { useRef } from "react";
import { motion } from "framer-motion";

const teamMembers = [
  { name: "Kareti Gnaneswar", role: "Founder & CEO", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Anjali Sharma", role: "CTO", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Rohan Verma", role: "Lead Developer", image: "https://randomuser.me/api/portraits/men/65.jpg" },
  { name: "Priya Singh", role: "UI/UX Designer", image: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Amit Patel", role: "Marketing Head", image: "https://randomuser.me/api/portraits/men/77.jpg" },
];

const OurTeam = () => {
  const carouselRef = useRef();

  return (
    <section id="team" className="px-4 sm:px-6 md:px-20 py-20 bg-white text-black flex flex-col items-center">
      
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet the talented minds behind <span className="font-semibold text-gray-800">Gnanify</span>. 
          Together, we build, innovate, and empower learners worldwide.
        </p>
      </motion.div>

      {/* Horizontal Scroll Row */}
      <div className="w-full overflow-x-auto">
        <motion.div
          ref={carouselRef}
          className="flex gap-6 py-4 px-2"
          drag="x"
          dragConstraints={{ left: -((teamMembers.length - 1) * 300), right: 0 }}
          dragElastic={0.2}
          whileTap={{ cursor: "grabbing" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 p-6 rounded-3xl shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-200 flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurTeam;
