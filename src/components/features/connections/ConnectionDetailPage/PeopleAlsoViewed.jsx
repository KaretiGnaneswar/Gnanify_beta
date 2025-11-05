import React from 'react';
import { UserCard } from '@/components';

export default function PeopleAlsoViewed({ suggestions, navigate }) {
  return (
    <div className="card sticky top-20">
      <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/10 text-sm font-semibold text-neutral-900 dark:text-white">People also viewed</div>
      <div className="p-3">
        {suggestions.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {suggestions.map((user) => (
              <div
                key={user.id}
                className="min-w-[320px] max-w-[320px] snap-start group rounded-xl p-5 transition-all duration-300 border bg-white border-neutral-200 hover:shadow-lg hover:shadow-orange-500/10 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 dark:border-white/10"
              >
                <UserCard user={user} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-600 dark:text-neutral-400 text-sm">No suggestions.</div>
        )}
      </div>
    </div>
  );
}
