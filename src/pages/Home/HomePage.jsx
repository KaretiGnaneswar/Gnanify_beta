import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "@/services/blogs";
import { getMyConnections } from "@/services/connections";
import { fetchCourses as listRealCourses } from "@/services/courses";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const [b, c, conns] = await Promise.all([
          getBlogs().catch(() => []),
          listRealCourses({ query: "", onlyFree: false }).catch(() => []),
          getMyConnections().catch(() => []),
        ]);
        if (!mounted) return;
        setBlogs(Array.isArray(b) ? b.slice(0, 5) : []);
        setCourses(Array.isArray(c) ? c.slice(0, 6) : []);
        setConnections(Array.isArray(conns) ? conns.slice(0, 6) : []);
      } catch {
        if (mounted) setError("Failed to load home data");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(
    () => ({
      blogs: blogs.length,
      courses: courses.length,
      connections: connections.length,
    }),
    [blogs.length, courses.length, connections.length]
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero */}
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm">
        <div className="p-5 md:flex md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here’s a quick overview of what’s new.
            </p>
          </div>
          <div className="flex gap-2 mt-3 md:mt-0">
            <button
              className="px-4 py-2 rounded-md bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              onClick={() => navigate("/blogs")}
            >
              Write a Blog
            </button>
            <button
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Blogs", value: stats.blogs },
          { label: "Courses", value: stats.courses },
          { label: "Connections", value: stats.connections },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {s.label}
            </div>
            <div className="text-3xl font-semibold text-gray-900 dark:text-orange-300">
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Blogs + Connections */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Blogs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Blogs
                </h2>
                <button
                  className="text-sm text-orange-500 hover:text-orange-600"
                  onClick={() => navigate("/blogs")}
                >
                  View All
                </button>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-14 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse"
                    />
                  ))}
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No blogs yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <button
                      key={b.id || b._id}
                      onClick={() => navigate(`/blogs/${b.id || b._id}`)}
                      className="w-full text-left rounded-md p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <div className="text-gray-900 dark:text-white font-medium line-clamp-1">
                        {b.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {b.content}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Suggested Connections */}
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm">
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Suggested Connections
                </h2>
                <button
                  className="text-sm text-orange-500 hover:text-orange-600"
                  onClick={() => navigate("/connections")}
                >
                  See More
                </button>
              </div>
              {loading ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse"
                    />
                  ))}
                </div>
              ) : connections.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No suggestions.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {connections.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => navigate(`/connections/${u.id}`)}
                      className="flex items-center gap-3 p-3 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <img
                        src={u.avatarUrl || u.avatar_url}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {u.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {u.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Top Courses */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm sticky top-20">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-white">
              Top Courses
            </div>
            <div className="p-3 space-y-3">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse"
                  />
                ))
              ) : courses.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No courses yet.
                </div>
              ) : (
                courses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/courses/${c.id}`)}
                    className="w-full text-left rounded-md p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <div className="text-gray-900 dark:text-white font-medium line-clamp-1">
                      {c.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {c.instructor} • {c.level || "—"}
                    </div>
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
