import React from 'react';
import { useNavigate } from 'react-router-dom';
import PriceTag from './PriceTag';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md overflow-hidden flex flex-col">
      <img src={course.thumbnail} alt={course.title} className="h-40 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <button
          onClick={() => navigate(`/dashboard/courses/${course.id}`)}
          className="text-lg font-semibold text-white hover:underline text-left line-clamp-2"
        >
          {course.title}
        </button>
        <div className="text-sm text-gray-300 mt-1">By {course.instructor}</div>
        <div className="text-xs text-gray-400 mt-1">{course.level} • ⭐ {course.rating} • {course.students.toLocaleString()} students</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {course.tags?.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-200 border border-white/10">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <PriceTag price={course.price} currency={course.currency} />
        </div>
      </div>
    </div>
  );
}
