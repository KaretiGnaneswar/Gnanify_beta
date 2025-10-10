import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => (
  <footer className="bg-white text-gray-800 py-12 px-6 md:px-20 border-t border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Gnanify</h3>
        <p className="text-gray-600">
          Learn, Grow, and Connect with students & professionals worldwide.
        </p>
        <p className="mt-4 text-gray-600 flex items-center gap-2">
          <MdLocationOn /> 123 Knowledge Street, Hyderabad, India
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#hero" className="hover:text-orange-500 transition">Home</a></li>
          <li><a href="#about" className="hover:text-orange-500 transition">About Us</a></li>
          <li><a href="#team" className="hover:text-orange-500 transition">Our Team</a></li>
          <li><a href="#features" className="hover:text-orange-500 transition">Features</a></li>
          <li><a href="#courses" className="hover:text-orange-500 transition">Courses</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Support</h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <MdEmail /> 
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
        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
        <ul className="flex space-x-4 text-xl">
          <li>
            <a href="#" className="hover:text-orange-500 transition"><FaFacebookF /></a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition"><FaTwitter /></a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedinIn /></a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-12 text-center text-gray-500 text-sm">
      &copy; 2025 Gnanify. All rights reserved.
    </div>
  </footer>
);

export default Footer;
