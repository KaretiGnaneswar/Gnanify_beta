import { MapPin, DollarSign, Clock, Bookmark, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function JobCard({ job, navigate }) {
  return (
    <div className={`bg-white dark:bg-neutral-800 rounded-lg ${job.isFeatured ? 'border-l-4 border-blue-500' : ''}`}>
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
            {job.company.charAt(0)}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 
                className="text-lg font-semibold hover:text-blue-500 cursor-pointer"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{job.company}</p>
            </div>
            {job.isFeatured && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                Featured
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {job.salary}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {job.type} • {job.posted}
            </span>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{job.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {job.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
              Apply Now
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-gray-700 dark:text-gray-300 dark:border-neutral-600 text-sm">
              <Bookmark className="w-3 h-3" /> Save
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-gray-700 dark:text-gray-300 dark:border-neutral-600 text-sm">
              <Share2 className="w-3 h-3" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
