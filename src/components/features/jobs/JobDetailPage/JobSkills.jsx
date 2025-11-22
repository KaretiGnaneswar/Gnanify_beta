export default function JobSkills({ job }) {
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2">
        Skills Match 
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          ({job.matchedSkills}/{job.totalSkills} skills match)
        </span>
      </h2>
      
      <div className="mb-3">
        <div className="relative w-full h-1 bg-gray-100 rounded-full dark:bg-neutral-700">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" 
            style={{ width: `${Math.round((job.matchedSkills/job.totalSkills)*100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {job.skills.map((skill) => (
          <span 
            key={skill} 
            className={`px-2 py-0.5 rounded-full text-xs ${
              skill === job.skills[0] 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-neutral-700'
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span className="text-blue-500">Blue</span> indicates skills you have
      </p>
    </section>
  );
}
