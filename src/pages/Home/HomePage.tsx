import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, User!</h1>
        <p className="text-gray-300">
          Here’s a quick overview of your dashboard today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-400 text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-green-400 text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Connections</h2>
          <p className="text-3xl font-bold">45</p>
        </div>
        <div className="bg-blue-400 text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Tasks Pending</h2>
          <p className="text-3xl font-bold">5</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-orange-400 text-black p-4 rounded-lg hover:bg-orange-500 transition">
            Go to Resume
          </button>
          <button className="bg-green-400 text-black p-4 rounded-lg hover:bg-green-500 transition">
            View Profile
          </button>
          <button className="bg-blue-400 text-black p-4 rounded-lg hover:bg-blue-500 transition">
            Open Compiler
          </button>
          <button className="bg-purple-400 text-black p-4 rounded-lg hover:bg-purple-500 transition">
            Blogs
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-2">
          <li className="p-3 bg-gray-700 rounded-lg">Uploaded Resume on 18 Oct 2025</li>
          <li className="p-3 bg-gray-700 rounded-lg">Completed Task "Build Sidebar"</li>
          <li className="p-3 bg-gray-700 rounded-lg">Published Blog "React Tips"</li>
          <li className="p-3 bg-gray-700 rounded-lg">Connected with John Doe</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
