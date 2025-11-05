import React from 'react';

export default function SocialLinks({ social = {} }) {
  const labels = {
    github: 'GitHub', linkedin: 'LinkedIn', leetcode: 'LeetCode', codeforces: 'Codeforces', codechef: 'CodeChef',
    hackerrank: 'HackerRank', stackoverflow: 'Stack Overflow', portfolio: 'Portfolio', website: 'Website',
    twitter: 'Twitter', medium: 'Medium', devto: 'Dev.to',
  };
  const icons = {
    github: '🐙', linkedin: '🔗', leetcode: '🧩', codeforces: '⚙️', codechef: '🍽️',
    hackerrank: '🏆', stackoverflow: '🧠', portfolio: '🌐', website: '🕸️',
    twitter: '𝕏', medium: 'Ⓜ️', devto: 'DEV',
  };

  const entries = Object.entries(social).filter(([, v]) => typeof v === 'string' && v.trim());
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">Social</h2>
        {entries.length === 0 ? (
          <div className="text-neutral-600 dark:text-neutral-400 text-sm">No social links provided.</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {entries.map(([key, href]) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md text-sm bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800"
                title={labels[key] || key}
              >
                <span className="mr-1 align-middle">{icons[key] || '🔗'}</span>
                <span className="align-middle">{labels[key] || key}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
