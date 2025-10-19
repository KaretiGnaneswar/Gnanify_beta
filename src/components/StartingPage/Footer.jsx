import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 md:px-20 border-t border-gray-800">

      {/* Desktop Layout */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-4 gap-8">
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
            {["Home", "About Us", "Our Team", "Features", "Courses"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="hover:text-orange-500 transition">
                  {link}
                </a>
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
              <a href="mailto:support@gnanify.com" className="hover:text-orange-500 transition">
                Email Support
              </a>
            </li>
            <li><a href="#faq" className="hover:text-orange-500 transition">FAQ</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <ul className="flex space-x-4 text-xl mb-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-orange-500 transition"><Icon /></a>
              </li>
            ))}
          </ul>
          <p className="text-gray-400 text-sm">Stay connected with us for updates and news.</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-6">
        {/* About Card */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-white">Gnanify</h3>
          <p className="text-gray-300 mb-4">
            Learn, Grow, and Connect with students & professionals worldwide.
          </p>
          <p className="flex items-center gap-2 text-gray-400">
            <MdLocationOn className="text-orange-500" /> 123 Knowledge Street, Hyderabad
          </p>
        </div>

        {/* Quick Links Card */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            {["Home", "About Us", "Our Team", "Features", "Courses"].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="hover:text-orange-500 transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Card */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <MdEmail className="text-orange-500" />
              <a href="mailto:support@gnanify.com" className="hover:text-orange-500 transition">Email Support</a>
            </li>
            <li><a href="#faq" className="hover:text-orange-500 transition">FAQ</a></li>
            <li><a href="#contact" className="hover:text-orange-500 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Card */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-xl mb-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <a key={idx} href="#" className="hover:text-orange-500 transition"><Icon /></a>
            ))}
          </div>
          <p className="text-gray-400 text-sm text-center">Stay connected with us for updates and news.</p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        &copy; {new Date().getFullYear()} Gnanify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
