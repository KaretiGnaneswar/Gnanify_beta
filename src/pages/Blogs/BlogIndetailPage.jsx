import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogIndetailPage() {
  const { id } = useParams();
  return (
    <div className="p-4">
      <Link to="/dashboard/blogs" className="text-blue-500 hover:underline">← Back to Blogs</Link>
      <h1 className="text-2xl font-semibold mt-2">Blog Detail</h1>
      <p className="text-gray-500">Showing details for blog id: <span className="font-mono">{id}</span></p>
      <div className="mt-4 prose max-w-none">
        <p>This is a placeholder for the blog content.</p>
      </div>
    </div>
  );
}

