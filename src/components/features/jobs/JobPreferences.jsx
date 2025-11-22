import { MapPin, DollarSign } from 'lucide-react';

export default function JobPreferences() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 space-y-6">
      <h3 className="text-lg font-semibold">Preferences</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Looking for</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900/30 dark:text-blue-300">
              Internships
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm dark:bg-neutral-700 dark:text-gray-300">
              Jobs
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Preferred job role</h4>
          <button className="w-full text-left px-4 py-2 border border-dashed rounded-lg text-gray-500 dark:text-gray-400 dark:border-neutral-600">
            Add
          </button>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Preferred work location
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Pune', 'Mumbai', 'Hyderabad', 'Chennai', 'Bangalore'].map(location => (
              <span key={location} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm dark:bg-neutral-700 dark:text-gray-300">
                {location}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> Preferred salary (for jobs)
          </h4>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm dark:bg-neutral-700 dark:text-gray-300">
            ₹6,00,000
          </span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
        <h3 className="text-lg font-semibold mb-4">Join webinar for career growth</h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>Powered by </span>
          <span className="font-medium">Coding Ninjas</span>
        </div>
        <div className="text-sm text-blue-500 dark:text-blue-400 mb-4">
          Entry closes in 5h
        </div>
        
        <div className="bg-gray-50 dark:bg-neutral-700/30 rounded-lg p-4 mb-4">
          <h4 className="font-medium mb-1">Amazon SDE tips to crack GenAI Technical Interviews</h4>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>Coding Ninjas</div>
            <div>Interview Preparation • Career Guidance</div>
            <div>11 Nov, 8:30 PM</div>
            <div>161 Enrolled</div>
          </div>
        </div>
        
        <button className="text-sm text-blue-500 dark:text-blue-400 font-medium">
          View detail
        </button>
      </div>
    </div>
  );
}
