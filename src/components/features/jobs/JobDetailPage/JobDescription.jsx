import { FileText } from 'lucide-react';

export default function JobDescription({ job }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" /> Job Description
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{job.description}</p>
      
      <h3 className="font-medium mb-3 text-lg">Responsibilities:</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
        {job.responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <h3 className="font-medium mb-3 text-lg">Requirements:</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
        {job.requirements.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
