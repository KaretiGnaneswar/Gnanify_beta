import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-900 py-10 mt-8">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Gnanify</h2>
          <p className="text-gray-600 text-sm">
            Gnanify is an educational video streaming platform connecting passionate students to skilled industry experts to fulfill their career dreams.
          </p>
          <p className="text-gray-600 text-sm mt-2">support@gnanify.com</p>
        </div>

        {/* Get the App */}
        <div>
          <h2 className="text-xl font-bold mb-2">Get the App</h2>
          <div className="flex flex-col space-y-2">
            <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">Google Play</button>
            <button className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded">App Store</button>
          </div>
        </div>

        {/* Popular Instructors */}
        <div>
          <h2 className="text-xl font-bold mb-2">Popular Instructors</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>John Doe</li>
            <li>Jane Smith</li>
            <li>Alex Johnson</li>
            <li>Emily Davis</li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h2 className="text-xl font-bold mb-2">Popular Courses</h2>
          <ul className="text-gray-600 text-sm space-y-1">
            <li>React for Beginners</li>
            <li>Python ML Basics</li>
            <li>Data Structures & Algorithms</li>
            <li>Fullstack Development</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 Gnanify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
