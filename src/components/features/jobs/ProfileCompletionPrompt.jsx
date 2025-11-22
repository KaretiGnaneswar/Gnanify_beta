export default function ProfileCompletionPrompt() {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-neutral-700 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold">
          <span className="text-red-500">Urgent!</span> Profile not visible!
        </h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
          73%
        </span>
      </div>
      
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">Add missing info to begin job search</p>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">+10% Industry</span>
          <button className="text-xs text-blue-500 dark:text-blue-400">Add</button>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 dark:text-gray-400">+8% Key Skill</span>
          <button className="text-xs text-blue-500 dark:text-blue-400">Add</button>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-200 dark:border-neutral-700">
        <h4 className="text-xs font-medium mb-1">Profile analytics</h4>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-lg font-bold">1</p>
            <p className="text-2xs text-gray-500 dark:text-gray-400">Profile Views</p>
          </div>
          <div>
            <p className="text-lg font-bold">13</p>
            <p className="text-2xs text-gray-500 dark:text-gray-400">Recruiter Actions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
