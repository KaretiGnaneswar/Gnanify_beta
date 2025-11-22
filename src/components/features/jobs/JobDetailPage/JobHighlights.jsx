export default function JobHighlights({ job }) {
  return (
    <div className="mb-8">
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        <span className="font-medium">Posted {job.posted}</span>
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {job.applicants}
      </p>
      {job.earlyApplicant && (
        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm dark:bg-green-900/30 dark:text-green-300">
          Early Applicant
        </span>
      )}
    </div>
  );
}
