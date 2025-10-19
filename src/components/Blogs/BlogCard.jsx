import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md overflow-hidden flex flex-col p-4">
      <button
        onClick={() => navigate(`/dashboard/blogs/${blog.id}`)}
        className="text-lg font-semibold text-white hover:underline text-left line-clamp-2"
      >
        {blog.title}
      </button>
      <div className="mt-2 text-sm text-gray-300 line-clamp-3">
        {blog.content}
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
        <span>👍 {blog.likes}</span>
        <span>👎 {blog.dislikes}</span>
        <span>💬 {blog.comments_count}</span>
      </div>
      <div className="mt-2 text-[11px] text-gray-500">
        {blog.created_at ? new Date(blog.created_at).toLocaleString() : ''}
      </div>
    </div>
  );
}
