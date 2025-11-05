import React from 'react';

export default function AboutSection({ about }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">About</h2>
        <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{about || '—'}</p>
      </div>
    </div>
  );
}
