import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBlogs } from '@/services/blogs';
import { getMyConnections } from '@/services/connections';
import { fetchCourses as listRealCourses } from '@/services/courses';

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const [b, c, conns] = await Promise.all([
          getBlogs().catch(() => []),
          listRealCourses({ query: '', onlyFree: false }).catch(() => []),
          getMyConnections().catch(() => []),
        ]);
        if (!mounted) return;
        setBlogs(Array.isArray(b) ? b.slice(0, 5) : []);
        setCourses(Array.isArray(c) ? c.slice(0, 6) : []);
        setConnections(Array.isArray(conns) ? conns.slice(0, 6) : []);
      } catch (e) {
        if (mounted) setError('Failed to load home data');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const stats = useMemo(() => ({
    blogs: blogs.length,
    courses: courses.length,
    connections: connections.length,
  }), [blogs.length, courses.length, connections.length]);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero */}
      <div className="card">
        <div className="card-body md:flex md:items-center md:justify-between gap-4">
          <div>
            <h1 className="section-title">Welcome back</h1>
            <p className="text-neutral-400">Here’s a quick overview of what’s new.</p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button className="btn btn-warning" onClick={() => navigate('/blogs')}>Write a blog</button>
            <button className="btn" onClick={() => navigate('/courses')}>Browse courses</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card"><div className="card-body"><div className="text-sm text-neutral-400">Blogs</div><div className="text-3xl font-semibold text-white">{stats.blogs}</div></div></div>
        <div className="card"><div className="card-body"><div className="text-sm text-neutral-400">Courses</div><div className="text-3xl font-semibold text-white">{stats.courses}</div></div></div>
        <div className="card"><div className="card-body"><div className="text-sm text-neutral-400">Connections</div><div className="text-3xl font-semibold text-white">{stats.connections}</div></div></div>
      </div>

      {/* Content */}
      {error && (
        <div className="card border-red-500/30">
          <div className="card-body text-red-400 text-sm bg-red-950/30">{error}</div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Recent blogs */}
        <div className="space-y-4 lg:col-span-2">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-white">Recent Blogs</h2>
                <button className="text-sm text-orange-400 hover:text-orange-300" onClick={() => navigate('/blogs')}>View all</button>
              </div>
              {loading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-md border border-white/10 bg-neutral-900 animate-pulse" />
                  ))}
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-neutral-400 text-sm">No blogs yet.</div>
              ) : (
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <button key={b.id || b._id} onClick={() => navigate(`/blogs/${b.id || b._id}`)} className="w-full text-left rounded-md p-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors">
                      <div className="text-white font-medium line-clamp-1">{b.title}</div>
                      <div className="text-xs text-neutral-400 line-clamp-2">{b.content}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Suggested connections */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-white">Suggested Connections</h2>
                <button className="text-sm text-orange-400 hover:text-orange-300" onClick={() => navigate('/connections')}>See more</button>
              </div>
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-md border border-white/10 bg-neutral-900 animate-pulse" />
                  ))}
                </div>
              ) : connections.length === 0 ? (
                <div className="text-neutral-400 text-sm">No suggestions.</div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {connections.map((u) => (
                    <button key={u.id} onClick={() => navigate(`/connections/${u.id}`)} className="rounded-md p-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <img src={u.avatarUrl || u.avatar_url} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                        <div className="min-w-0">
                          <div className="text-sm text-white font-medium truncate">{u.name}</div>
                          <div className="text-[11px] text-neutral-400 truncate">{u.title}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Top courses */}
        <aside>
          <div className="card sticky top-20">
            <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Top Courses</div>
            <div className="p-3 space-y-3">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 rounded-md border border-white/10 bg-neutral-900 animate-pulse" />)
              ) : courses.length === 0 ? (
                <div className="text-neutral-400 text-sm">No courses yet.</div>
              ) : (
                courses.map((c) => (
                  <button key={c.id} onClick={() => navigate(`/courses/${c.id}`)} className="w-full text-left rounded-md p-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors">
                    <div className="text-white font-medium line-clamp-1">{c.title}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{c.instructor} • {c.level || '—'}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
