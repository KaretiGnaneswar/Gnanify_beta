import { useState } from 'react';
import { createBlog } from '@/services/blogs';

export default function CreateBlogModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const submit = async () => {
    setError('');
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) {
      setError('Please fill in title and content.');
      return;
    }
    try {
      setSubmitting(true);
      const created = await createBlog({ title, content });
      if (typeof onCreated === 'function') onCreated(created);
      setForm({ title: '', content: '' });
    } catch (e) {
      setError(e?.message || 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full sm:w-[620px] bg-gray-900 text-white rounded-t-2xl sm:rounded-2xl border border-white/10 p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Create a post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        {error && (
          <div className="mb-3 text-sm text-red-400 border border-red-500/30 bg-red-950/30 rounded p-2">{error}</div>
        )}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              maxLength={200}
              placeholder="What do you want to talk about?"
              className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={8}
              placeholder="Write your thoughts..."
              className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={submitting}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-60"
          >
            {submitting ? 'Posting…' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
