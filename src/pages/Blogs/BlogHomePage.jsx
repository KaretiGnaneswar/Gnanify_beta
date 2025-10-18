
import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogHomePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Blogs</h1>
      <p className="text-gray-500 mb-4">This is a placeholder for the Blogs list.</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link to="/dashboard/blogs/1" className="text-blue-500 hover:underline">
            Sample Blog Post #1
          </Link>
        </li>
      </ul>
    </div>
  );
}

