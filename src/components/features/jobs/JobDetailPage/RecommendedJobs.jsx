import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import PropTypes from 'prop-types';

export default function RecommendedJobs({ jobs = [], loading = false }) {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Recommended Jobs</h2>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b border-gray-200 dark:border-neutral-700 pb-4 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-neutral-700 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="w-1/2 h-3 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
                <div className="w-full h-3 bg-gray-200 dark:bg-neutral-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Safe check for jobs array
  const hasJobs = Array.isArray(jobs) && jobs.length > 0;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Recommended Jobs</h2>
      {hasJobs ? (
        jobs.map((job) => (
          <div key={job.id} className="border-b border-gray-200 dark:border-neutral-700 pb-4 last:border-0 last:pb-0 group">
            <div 
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => navigate(`/jobs/${job.id}`)}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-neutral-700 rounded-full flex items-center justify-center overflow-hidden">
                {job.logo ? (
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '';
                    }}
                  />
                ) : (
                  <span className="text-sm font-bold">{job.company.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm group-hover:text-blue-500 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs">{job.company}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  {job.experience} • {job.location}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <button 
                  className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Bookmark className="w-3 h-3" /> Save
                </button>
                <button 
                  className="text-xs text-blue-500 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No recommended jobs found
        </p>
      )}
    </div>
  );
}

RecommendedJobs.propTypes = {
  jobs: PropTypes.array,
  loading: PropTypes.bool
};

RecommendedJobs.defaultProps = {
  jobs: [],
  loading: false
};