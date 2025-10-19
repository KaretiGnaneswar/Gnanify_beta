import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogsApi } from '@/services/blogs';
import UserCard from '@/components/Connections/UserCard';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';

export default function BlogIndetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [reacting, setReacting] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [author, setAuthor] = useState(null);
  const [authorLoading, setAuthorLoading] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, cs] = await Promise.all([blogsApi.detail(id), blogsApi.comments(id)]);
      setBlog(b);
      setComments(Array.isArray(cs) ? cs : []);
    } catch (e) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Load current viewer profile for author-only actions
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const client = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        const me = await client.get('/core/profile/');
        if (active) setViewer(me || null);
      } catch {
        if (active) setViewer(null);
      }
    })();
    return () => { active = false; };
  }, []);

  // Load author profile if available
  useEffect(() => {
    let active = true;
    async function loadAuthor(aid) {
      if (!aid) {
        setAuthor(null);
        return;
      }
      setAuthorLoading(true);
      try {
        const client = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        const u = await client.get(`/connections/users/${aid}/`);
        if (!active) return;
        const mapped = u && {
          id: u.id,
          name: u.name || (u.email ? u.email.split('@')[0] : 'User'),
          title: u.role === 'admin' ? 'Admin' : (u.role === 'contributor' ? 'Contributor' : 'Member'),
          location: '',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name || u.email || 'User')}`,
          connected: false,
          skills: [],
        };
        setAuthor(mapped || null);
      } catch (e) {
        if (!active) return;
        setAuthor(null);
      } finally {
        if (active) setAuthorLoading(false);
      }
    }
    loadAuthor(blog?.author);
    return () => {
      active = false;
    };
  }, [blog?.author]);

  const onReact = async (reaction) => {
    try {
      setReacting(true);
      const res = await blogsApi.react(id, reaction);
      if (res?.blog) setBlog(res.blog);
    } catch (e) {
      // optionally show error toast
    } finally {
      setReacting(false);
    }
  };

  const onAddComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    try {
      setAddingComment(true);
      const c = await blogsApi.addComment(id, text);
      setComments((prev) => [...prev, c]);
      setCommentText('');
      // update counts locally
      setBlog((b) => (b ? { ...b, comments_count: (b.comments_count || 0) + 1 } : b));
    } catch (e) {
      // optionally show error toast
    } finally {
      setAddingComment(false);
    }
  };

  return (
    <div className="p-4">
      <Link to="/dashboard/blogs" className="text-blue-500 hover:underline">← Back to Blogs</Link>

      {loading && <div className="mt-3 text-gray-400">Loading...</div>}
      {error && (
        <div className="mt-3 text-red-400 text-sm border border-red-500/30 bg-red-950/30 rounded p-3">
          {String(error)}
        </div>
      )}

      {!loading && !error && blog && (
        <div className="mt-3 grid gap-6 lg:grid-cols-3">
          {/* Left: Blog content (approx 70%) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold">{blog.title}</h1>
                  <div className="text-xs text-gray-500 mt-1">
                    {blog.created_at ? new Date(blog.created_at).toLocaleString() : ''}
                  </div>
                </div>
                {viewer && String(viewer.id) === String(blog.author) && (
                  <button
                    onClick={async () => {
                      if (!confirm('Delete this blog post? This cannot be undone.')) return;
                      try {
                        setDeleting(true);
                        await blogsApi.delete(id);
                        navigate('/dashboard/blogs');
                      } finally {
                        setDeleting(false);
                      }
                    }}
                    disabled={deleting}
                    className="h-9 w-9 flex items-center justify-center rounded border border-red-500/40 bg-red-600/20 text-red-300 hover:bg-red-600/30 disabled:opacity-60"
                    aria-label="Delete this post"
                    title={deleting ? 'Deleting…' : 'Delete post'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2H6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9zm2 2h2V4h-2v1zM8 7h8v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7zm2 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={() => onReact('like')}
                disabled={reacting}
                className="px-3 py-1 rounded border border-white/10 bg-gray-800 hover:bg-gray-700 disabled:opacity-60"
              >
                👍 Like ({blog.likes})
              </button>
              <button
                onClick={() => onReact('dislike')}
                disabled={reacting}
                className="px-3 py-1 rounded border border-white/10 bg-gray-800 hover:bg-gray-700 disabled:opacity-60"
              >
                👎 Dislike ({blog.dislikes})
              </button>
              <div className="text-gray-400">💬 {blog.comments_count}</div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Comments</h2>
              <div className="space-y-3">
                {comments.map((c) => (
                  <div key={c.id} className="border border-white/10 rounded p-3 bg-gray-900/40">
                    <div className="text-xs text-gray-500">
                      {c.created_at ? new Date(c.created_at).toLocaleString() : ''}
                    </div>
                    <div className="mt-1 text-sm whitespace-pre-wrap">{c.text}</div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-gray-400 text-sm">No comments yet.</div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 rounded border border-white/10 bg-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  onClick={onAddComment}
                  disabled={addingComment || !commentText.trim()}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm disabled:opacity-60"
                >
                  {addingComment ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Author profile (approx 30%) */}
          <aside className="space-y-3">
            <h3 className="text-sm text-gray-300">Author</h3>
            {authorLoading && <div className="text-gray-400 text-sm">Loading author...</div>}
            {!authorLoading && author && <UserCard user={author} />}
            {!authorLoading && !author && (
              <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-4 flex gap-3 items-center">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent('User')}`}
                  alt={'Author'}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">Unknown</div>
                </div>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
