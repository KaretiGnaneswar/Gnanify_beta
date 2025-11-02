import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  fetchCourses,
  fetchCategories,
  likeCourse,
  dislikeCourse,
  enrollInCourse
} from '@/services/courses';

export default function CoursesPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  const loadCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { search: query, category, difficulty };
      const data = await fetchCourses(params);
      setCourses(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  const handleLike = async (id) => {
    try {
      await likeCourse(id);
      loadCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async (id) => {
    try {
      await dislikeCourse(id);
      loadCourses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (id) => {
    try {
      await enrollInCourse(id);
      alert('Successfully enrolled!');
      loadCourses();
    } catch (err) {
      alert(`Enrollment failed: ${err.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Courses</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Explore courses and improve your skills. Filter, like, and enroll easily.
        </p>
      </div>

      {/* Search Bar + Filters */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <button
            onClick={loadCourses}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-400 dark:border-red-500 rounded-lg text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12 text-gray-500 dark:text-gray-400">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mr-3"></div>
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No courses found. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                By {course.created_by_name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                {course.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>{course.category_name || 'General'}</span>
                <span className="capitalize">{course.difficulty || 'Beginner'}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(course.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      course.is_liked ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    👍 {course.likes_count || 0}
                  </button>
                  <button
                    onClick={() => handleDislike(course.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      course.is_disliked ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    👎 {course.dislikes_count || 0}
                  </button>
                </div>

                {course.is_enrolled ? (
                  <span className="text-green-500 text-sm font-medium">✓ Enrolled</span>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    {course.is_free ? 'Enroll Free' : `Enroll $${course.price || 0}`}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
