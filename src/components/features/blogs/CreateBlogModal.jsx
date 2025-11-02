import { useState } from 'react';
import { createBlog } from '@/services/blogs';

export default function CreateBlogModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBlog = await createBlog({ title, content });
      onCreated(newBlog);
    } catch (error) {
      alert('Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-900 rounded-xl p-6 w-full max-w-lg space-y-4 border border-white/10"
      >
        <h2 className="text-lg font-semibold text-white">Create Blog</h2>
        <input
          className="w-full p-2 rounded bg-neutral-800 border border-white/10 text-white"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 h-40 rounded bg-neutral-800 border border-white/10 text-white"
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
