export default function JobInfo({ job }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <h3 className="font-medium mb-2">Job Type:</h3>
        <p className="text-gray-700 dark:text-gray-300">{job.jobType}</p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Industry:</h3>
        <p className="text-gray-700 dark:text-gray-300">{job.industry}</p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Function:</h3>
        <p className="text-gray-700 dark:text-gray-300">{job.function}</p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Employment Type:</h3>
        <p className="text-gray-700 dark:text-gray-300">{job.type}</p>
      </div>
    </div>
  );
}
