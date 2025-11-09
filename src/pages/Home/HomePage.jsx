import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "@/services/blogs";
import { getUsers } from "@/services/connections";
import { fetchCourses as listRealCourses } from "@/services/courses";
import { UserCard } from "@/components";
import PostComposer from "@/components/features/posts/PostComposer";
import Hero from "@/components/features/home/Hero";
import Stats from "@/components/features/home/Stats";
import PostsFeed from "@/components/features/home/PostsFeed";
import PostsSection from "@/components/features/posts/PostsSection";
import RecentBlogs from "@/components/features/home/RecentBlogs";
import TopCourses from "@/components/features/home/TopCourses";
import TrendingNews from "@/components/features/home/TrendingNews";
import { listPosts, createPost as createServicePost, reactApi, addComment } from "@/services/posts";
import { listTrendingNews } from "@/services/news";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState("");
  const { user: currentUser } = useAuth();
  const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(0);
  const [myBlogsCount, setMyBlogsCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const ps = await listPosts();
        setPosts(ps);
      } catch {}
      setNews(listTrendingNews());
    })();
  }, []);

  async function handleCreatePost({ text, image }) {
    const author = {
      id: currentUser?.id,
      name: currentUser?.name || currentUser?.email || "You",
      avatarUrl: currentUser?.avatarUrl || "/default-avatar.png",
      title: currentUser?.title || "",
      company: currentUser?.company || "",
    };
    try {
      await createServicePost({ author, text, image });
      const ps = await listPosts();
      setPosts(ps);
    } catch {}
  }

  // Posts UI moved into PostsSection for reuse

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const [b, c, allUsers] = await Promise.all([
          getBlogs().catch(() => []),
          listRealCourses({ query: "", onlyFree: false }).catch(() => []),
          getUsers().catch(() => []),
        ]);
        if (!mounted) return;
        // Blogs: keep recent list for UI, compute count authored by current user
        const allBlogs = Array.isArray(b) ? b : [];
        const blogAuthorMatches = (blog) => {
          const bid = blog?.author?.id ?? blog?.author_id ?? blog?.created_by_id ?? blog?.user_id ?? blog?.user?.id ?? blog?.created_by?.id;
          const bemail = blog?.author?.email ?? blog?.user?.email ?? blog?.created_by?.email;
          const bname = blog?.author?.name ?? blog?.user?.name ?? blog?.created_by?.name;
          const uidMatch = currentUser?.id && bid && String(currentUser.id) === String(bid);
          const emailMatch = currentUser?.email && bemail && String(currentUser.email).toLowerCase() === String(bemail).toLowerCase();
          const nameMatch = currentUser?.name && bname && String(currentUser.name).toLowerCase() === String(bname).toLowerCase();
          return Boolean(uidMatch || emailMatch || nameMatch);
        };
        setMyBlogsCount(allBlogs.filter(blogAuthorMatches).length);
        setBlogs(allBlogs.slice(0, 5));
        // Build Top Courses: not enrolled yet, sorted by most enrollments
        const normalizeEnrollCount = (x) =>
          Number(
            x?.enrollments_count ?? x?.students ?? x?.total_enrollments ?? x?.enrollments ?? x?.learners_count ?? 0
          );
        const isEnrolled = (x) => Boolean(x?.is_enrolled ?? x?.enrolled ?? false);
        const coursesAll = Array.isArray(c) ? c : [];
        const topNotEnrolled = coursesAll
          .filter((course) => !isEnrolled(course))
          .sort((a, b) => normalizeEnrollCount(b) - normalizeEnrollCount(a))
          .slice(0, 6);
        setCourses(topNotEnrolled);
        setEnrolledCoursesCount(coursesAll.filter(isEnrolled).length);
        const suggestions = Array.isArray(allUsers)
          ? allUsers.filter((u) => {
              const isSelf = currentUser?.id && u?.id && String(currentUser.id) === String(u.id);
              return !isSelf && !u?.connected;
            })
          : [];
        setConnections(suggestions.slice(0, 6));
      } catch {
        if (mounted) setError("Failed to load home data");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [currentUser?.id]);

  const stats = useMemo(
    () => ({
      myBlogs: myBlogsCount,
      enrolledCourses: enrolledCoursesCount,
    }),
    [myBlogsCount, enrolledCoursesCount]
  );

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Hero */}
      <Hero onBlogsClick={() => navigate("/blogs")} onCoursesClick={() => navigate("/courses")} />

      {/* Stats */}
      <Stats items={[
        { label: "My Blogs", value: stats.myBlogs },
        { label: "Enrolled Courses", value: stats.enrolledCourses },
      ]} />

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Blogs + Connections */}
        <div className="space-y-6 lg:col-span-2">
          <PostsSection title="Posts" source="all" showComposer={true} />

          {/* Recent Blogs */}
          <RecentBlogs
            loading={loading}
            blogs={blogs}
            onOpen={(id) => navigate(`/blogs/${id}`)}
          />

          {/* (Activity Time removed as requested) */}
        </div>

        {/* Right: Trending + Top Courses */}
        <aside className="lg:col-span-1 space-y-4 sticky top-20 self-start">
          <TrendingNews
            news={news}
            onOpen={(url) => window.open(url, "_blank", "noopener,noreferrer")}
          />
          <TopCourses
            loading={loading}
            courses={courses}
            onOpen={(id) => navigate(`/courses/${id}`)}
          />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
