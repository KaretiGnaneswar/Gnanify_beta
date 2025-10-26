import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";

const Footer = () => {
  // Map link names to section IDs
  const links = [
    { name: "Home", id: "hero" },
    { name: "Features", id: "features" },
    { name: "About Us", id: "about" },
    { name: "Our Team", id: "team" }
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // adjust for fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-24 px-4 sm:px-6 md:px-20 relative">
      {/* Large Gradient Background Text */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center pointer-events-none select-none z-0">
        <h1
          className="text-[12rem] font-extrabold leading-none whitespace-nowrap text-gray-800"
          style={{
            background: "linear-gradient(to bottom, rgba(55,65,81,1), rgba(55,65,81,0))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.6,
          }}
        >
          GNANIFY
        </h1>
        <p className="text-3xl font-semibold text-gray-400 mt-2">Dare to Join</p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-8 relative z-10">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Gnanify</h3>
          <p className="text-gray-400 mb-4">
            Learn, Grow, and Connect with students & professionals worldwide.
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-orange-500" />
            123 Knowledge Street, Hyderabad, India
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleScroll(link.id)}
                  className="hover:text-orange-500 transition-all duration-300"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MdEmail className="text-orange-500" />
              <a
                href="mailto:support@gnanify.com"
                className="hover:text-orange-500 transition-all duration-300"
              >
                Email Support
              </a>
            </li>
            <li>
              <button
                onClick={() => handleScroll("faq")}
                className="hover:text-orange-500 transition-all duration-300"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("contact")}
                className="hover:text-orange-500 transition-all duration-300"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <ul className="flex space-x-4 text-2xl mb-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.2, color: "#f97316" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a href="#"><Icon /></a>
              </motion.li>
            ))}
          </ul>
          <p className="text-gray-400 text-sm">Stay connected for updates & news.</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-6 relative z-10">
        {/** About Card **/}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Gnanify</h3>
          <p className="text-gray-300 mb-4">
            Learn, Grow, and Connect with students & professionals worldwide.
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-orange-500" /> 123 Knowledge Street, Hyderabad
          </p>
        </div>

        {/** Quick Links Card **/}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleScroll(link.id)}
                  className="hover:text-orange-500 transition-all duration-300"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/** Support Card **/}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <MdEmail className="text-orange-500" />
              <a
                href="mailto:support@gnanify.com"
                className="hover:text-orange-500 transition-all duration-300"
              >
                Email Support
              </a>
            </li>
            <li>
              <button
                onClick={() => handleScroll("faq")}
                className="hover:text-orange-500 transition-all duration-300"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("contact")}
                className="hover:text-orange-500 transition-all duration-300"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/** Social Card **/}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-2xl mb-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.2, color: "#f97316" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
          <p className="text-gray-400 text-sm text-center">Stay connected for updates & news.</p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-6 relative z-10">
        &copy; {new Date().getFullYear()} Gnanify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
