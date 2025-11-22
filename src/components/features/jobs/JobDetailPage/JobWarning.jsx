import { AlertCircle } from 'lucide-react';

export default function JobWarning() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 dark:bg-yellow-900/20 dark:border-yellow-500">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
        <div>
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">Beware of Scammers</h3>
          <p className="text-yellow-700 dark:text-yellow-300">We don't charge any money for job offers</p>
        </div>
      </div>
    </div>
  );
}
