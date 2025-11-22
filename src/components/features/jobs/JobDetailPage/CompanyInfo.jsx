import { Users } from 'lucide-react';

export default function CompanyInfo({ job }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" /> About Company
      </h2>
      <div className="bg-gray-50 dark:bg-neutral-700/30 rounded-lg p-5">
        <p className="text-gray-700 dark:text-gray-300 mb-4">{job.aboutCompany}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {job.employees && (
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">Company Size</h3>
              <p className="text-gray-700 dark:text-gray-300">{job.employees} employees</p>
            </div>
          )}
          {job.founded && (
            <div>
              <h3 className="text-gray-500 dark:text-gray-400">Founded</h3>
              <p className="text-gray-700 dark:text-gray-300">{job.founded}</p>
            </div>
          )}
          {job.website && (
            <div className="col-span-2">
              <h3 className="text-gray-500 dark:text-gray-400">Website</h3>
              <a 
                href={job.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {job.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
