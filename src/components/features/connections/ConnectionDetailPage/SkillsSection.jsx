import React from 'react';

export default function SkillsSection({ skills = [] }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.length ? (
            skills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-white/10">
                {s}
              </span>
            ))
          ) : (
            <span className="text-neutral-400 text-sm">—</span>
          )}
        </div>
      </div>
    </div>
  );
}
