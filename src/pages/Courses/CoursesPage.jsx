import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/Courses/SearchBar';
import CourseCard from '@/components/Courses/CourseCard';
import { listCourses } from '@/services/courses.dummy';

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [onlyFree, setOnlyFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const runSearch = async () => {
    setLoading(true);
    try {
      const data = await listCourses({ query, onlyFree });
      setCourses(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Courses</h1>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={runSearch}
        onlyFree={onlyFree}
        onToggleFree={(v) => {
          setOnlyFree(v);
          // re-run search immediately when toggling
          setTimeout(runSearch, 0);
        }}
      />

      {loading ? (
        <div className="text-gray-400">Loading courses…</div>
      ) : courses.length === 0 ? (
        <div className="text-gray-400">No courses found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
