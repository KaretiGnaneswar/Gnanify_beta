import React, { useEffect, useState } from 'react';
import BlogCard from '@/components/Blogs/BlogCard';
import CreateBlogModal from '@/components/Blogs/CreateBlogModal';
import { blogsApi } from '@/services/blogs';

export default function BlogHomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    blogsApi
      .list()
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e?.message || 'Failed to load blogs');
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Blogs</h1>
      <p className="text-gray-400 mb-4">Latest posts from the community</p>

      {loading && <div className="text-gray-400">Loading...</div>}
      {error && (
        <div className="text-red-400 text-sm border border-red-500/30 bg-red-950/30 rounded p-3 mb-3">
          {String(error)}
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <BlogCard key={b.id} blog={b} />
          ))}
          {items.length === 0 && (
            <div className="text-gray-400">No blogs yet. Be the first to post!</div>
          )}
        </div>
      )}

      {/* Floating Create Button (like LinkedIn post) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-3xl leading-none flex items-center justify-center shadow-lg border border-white/10"
        aria-label="Create blog post"
        title="Create blog post"
      >
        +
      </button>

      <CreateBlogModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={(created) => {
          setItems((prev) => [created, ...prev]);
          setOpen(false);
        }}
      />
    </div>
  );
}
