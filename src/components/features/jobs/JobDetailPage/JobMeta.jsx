export default function JobMeta({ job }) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
      <p>This job was posted by {job.postedBy}</p>
      <p>Job Source: {job.source}</p>
      <p>Job ID: {job.id}</p>
      <button className="text-orange-500 hover:underline mt-2">Report Job</button>
    </div>
  );
}
