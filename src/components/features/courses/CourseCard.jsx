import { useNavigate } from 'react-router-dom';
import PriceTag from './PriceTag';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  
  // Handle the course data structure from the API
  const courseId = course.id || course._id;
  const title = course.title || '';
  const description = course.description || '';
  const thumbnail = course.thumbnail || course.image || '/images/placeholder-course.jpg';
  const instructor = course.instructor || course.created_by?.name || 'Unknown Instructor';
  const level = course.level || 'Beginner';
  const rating = course.rating || 0;
  const students = course.students || course.student_count || 0;
  const tags = course.tags || course.categories || [];
  const price = course.price || 0;
  const currency = course.currency || 'USD';
  
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md overflow-hidden flex flex-col">
      <img src={thumbnail} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4 flex-1 flex flex-col">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="text-lg font-semibold text-white hover:underline text-left line-clamp-2"
        >
          {title}
        </button>
        <div className="text-sm text-gray-300 mt-1">By {instructor}</div>
        <div className="text-xs text-gray-400 mt-1">{level} • ⭐ {rating} • {students.toLocaleString()} students</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags?.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-200 border border-white/10">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <PriceTag price={price} currency={currency} />
        </div>
      </div>
    </div>
  );
}
