import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "about", "team", "footer"];
      let current = "hero";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === "login") {
      if (onLoginClick) onLoginClick();
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md bg-gray-900/60 text-white shadow-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-orange-400 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scrollToSection("hero")}
          >
            Gnanify
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 font-medium">
            {["hero", "features", "login", "footer"].map((id) => (
              <li
                key={id}
                onClick={() => scrollToSection(id)}
                className={`cursor-pointer relative hover:text-orange-400 transition ${
                  activeSection === id ? "text-orange-400" : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
                {activeSection === id && id !== "login" && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-orange-400 rounded-full"></span>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-medium bg-gray-900/90 backdrop-blur-md border-t border-white/10">
            {["hero", "features", "login", "footer"].map((id) => (
              <li
                key={id}
                onClick={() => scrollToSection(id)}
                className={`cursor-pointer hover:text-orange-400 transition ${
                  activeSection === id ? "text-orange-400" : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
