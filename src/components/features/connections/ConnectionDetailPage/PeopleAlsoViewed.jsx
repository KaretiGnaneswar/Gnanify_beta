import React from 'react';

export default function PeopleAlsoViewed({ suggestions, navigate }) {
  return (
    <div className="card sticky top-20">
      <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">People also viewed</div>
      <div className="p-3 space-y-3">
        {suggestions.length > 0 ? (
          suggestions.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/connections/${p.id}`)}
              className="w-full text-left rounded-md p-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={p.avatarUrl} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="text-sm text-white font-medium truncate">{p.name}</div>
                  <div className="text-[11px] text-neutral-400 truncate">{p.title}</div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-neutral-400 text-sm">No suggestions.</div>
        )}
      </div>
    </div>
  );
}
