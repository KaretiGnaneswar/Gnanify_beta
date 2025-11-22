import { Briefcase } from 'lucide-react';

export default function JobsHeader() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Briefcase className="w-6 h-6 text-blue-500" />
      <h1 className="text-2xl font-semibold">Jobs</h1>
    </div>
  );
}
