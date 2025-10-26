import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import SearchBar from '@/components/features/courses/SearchBar';
import { CourseCard } from '@/components';
import { fetchCourses, fetchCategories, likeCourse, dislikeCourse, enrollInCourse } from '@/services/courses';

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
      const params = {
        search: query,
        category: category,
        difficulty: difficulty,
      };
      
      const data = await fetchCourses(params);
      setCourses(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  const handleSearch = () => {
    loadCourses();
  };

  const handleLike = async (courseId) => {
    try {
      await likeCourse(courseId);
      loadCourses(); // Refresh courses to get updated like counts
    } catch (error) {
      console.error('Error liking course:', error);
    }
  };

  const handleDislike = async (courseId) => {
    try {
      await dislikeCourse(courseId);
      loadCourses(); // Refresh courses to get updated dislike counts
    } catch (error) {
      console.error('Error disliking course:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId);
      alert('Successfully enrolled in the course!');
      loadCourses(); // Refresh courses to show enrollment status
    } catch (error) {
      alert(`Enrollment failed: ${error.message}`);
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="section-title">Courses</h1>
        <p className="text-neutral-400">Explore courses and enhance your skills. Use filters to find what you're looking for.</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card">
          <div className="card-body">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-neutral-400">Loading courses...</span>
            </div>
          </div>
        </div>
      ) : courses.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-8">
            <p className="text-neutral-400 text-lg">No courses found.</p>
            <p className="text-neutral-500 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="mb-4">
              <p className="text-neutral-400">
                Found {courses.length} course{courses.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors">
                  <div className="space-y-4">
                    {/* Course Header */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">
                        By {course.created_by_name}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>⭐ {course.average_rating || 0} ({course.total_ratings || 0})</span>
                        <span>👥 {course.enrollments_count || 0}</span>
                        <span>📚 {course.total_lessons || 0} lessons</span>
                      </div>
                    </div>

                    {/* Course Description */}
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-semibold">
                          {course.category_name || 'Uncategorized'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400 capitalize">
                          {course.difficulty || 'Beginner'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-semibold">
                          {course.is_free ? 'Free' : `$${course.price || 0}`}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLike(course.id)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            course.is_liked 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          👍 {course.likes_count || 0}
                        </button>
                        <button
                          onClick={() => handleDislike(course.id)}
                          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                            course.is_disliked 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          👎 {course.dislikes_count || 0}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {course.is_enrolled ? (
                          <span className="text-green-400 text-sm font-semibold">✓ Enrolled</span>
                        ) : (
                          <button
                            onClick={() => handleEnroll(course.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            {course.is_free ? 'Enroll Free' : `Enroll $${course.price || 0}`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
