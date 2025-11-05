import React from 'react';

export default function SkillsSection({ skills = [] }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.length ? (
            skills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-white/10">
                {s}
              </span>
            ))
          ) : (
            <span className="text-neutral-600 dark:text-neutral-400 text-sm">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
