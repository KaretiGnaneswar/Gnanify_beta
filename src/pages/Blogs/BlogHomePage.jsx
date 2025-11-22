import { useEffect, useMemo, useState } from 'react';
import { BlogCard } from '@/components';
import CompactAd from '@/components/features/ads/CompactAd';
import CreateBlogModal from '@/components/features/blogs/CreateBlogModal';
import { getBlogs } from '@/services/blogs';

export default function BlogHomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest'); // newest | oldest | liked | commented
  

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getBlogs()
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

  const displayed = useMemo(() => {
    let list = Array.isArray(items) ? [...items] : [];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((b) => {
        const title = (b?.title || '').toLowerCase();
        const content = (b?.content || '').toLowerCase();
        return title.includes(q) || content.includes(q);
      });
    }
    switch (sort) {
      case 'oldest':
        list.sort((a, b) => new Date(a.created_at || a.createdAt || 0) - new Date(b.created_at || b.createdAt || 0));
        break;
      case 'liked':
        list.sort((a, b) => (b.likes || b.likes_count || 0) - (a.likes || a.likes_count || 0));
        break;
      case 'commented':
        list.sort((a, b) => ((b.comments_count || (b.comments?.length || 0)) - (a.comments_count || (a.comments?.length || 0))));
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.created_at || b.createdAt || 0) - new Date(a.created_at || a.createdAt || 0));
        break;
    }
    return list;
  }, [items, query, sort]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="section-title">Blogs</h1>
        <p className="text-neutral-400">Latest posts from the community</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Filters + Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="card">
            <div className="card-body grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="inp"
                  placeholder="Search blogs by title or content..."
                />
              </div>
              <div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="inp"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="liked">Most liked</option>
                  <option value="commented">Most commented</option>
                </select>
              </div>
            </div>
          </div>

          {loading && (
            <div className="card">
              <div className="card-body text-neutral-400">Loading...</div>
            </div>
          )}
          {error && (
            <div className="card border-red-500/30">
              <div className="card-body text-red-400 text-sm bg-red-950/30">
                {String(error)}
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="card">
              <div className="card-body">
                {displayed.length === 0 ? (
                  <div className="text-neutral-400">No blogs yet. Be the first to post!</div>
                ) : (
                  <div className="space-y-4">
                    {displayed.map((b) => (
                      <BlogCard key={b.id} blog={b} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Ads sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="card">
              <div className="card-body">
                <div className="text-sm text-neutral-400 mb-2">Sponsored</div>
                <div className="w-full h-56 rounded-md overflow-hidden border border-white/10 bg-neutral-800 flex items-center justify-center text-neutral-400">
                  Ad 300×250
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="w-full h-40 rounded-md overflow-hidden border border-white/10 bg-neutral-800 flex items-center justify-center text-neutral-400">
                  Ad 300×200
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Create Button (like LinkedIn post) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-3xl leading-none flex items-center justify-center shadow-lg border border-white/10"
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
