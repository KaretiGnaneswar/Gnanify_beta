import { Briefcase, Bookmark, Share2 } from 'lucide-react';
import JobSkills from './JobSkills';

export default function JobHeader({ job, navigate }) {
  return (
    <div className="mb-8 w-full">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-14 h-14 bg-gray-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden">
          {job.logo ? (
            <img 
              src={job.logo} 
              alt={job.company}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold">{job.company.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">{job.company}</p>
          <p className="text-gray-500 dark:text-gray-400">{job.location}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6 text-sm">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
          {job.experience}
        </span>
        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
          {job.matchedSkills} out of {job.totalSkills} preferred skills are a match
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
          Apply Now
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
          <Bookmark className="w-4 h-4" /> Save
        </button>
        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-gray-700 dark:text-gray-300 dark:border-neutral-600 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
      <JobSkills job={job} />
    </div>
  );
}
