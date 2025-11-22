import { Search } from 'lucide-react';

export default function JobsSearchFilters({
  searchTerm,
  setSearchTerm
}) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Job title, skills, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg
            bg-white dark:bg-neutral-800
            border-gray-300 dark:border-neutral-600
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
    </div>
  );
}
