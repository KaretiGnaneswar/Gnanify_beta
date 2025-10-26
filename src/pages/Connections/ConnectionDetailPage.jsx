import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile as getConnectionProfile, listConnections } from '@/services/connections.dummy';

export default function ConnectionDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getConnectionProfile(id);
        if (mounted) {
          setUser(u);
          setConnected(!!u?.connected);
          // sidebar suggestions
          const all = await listConnections('');
          setSuggestions((all || []).filter((p) => p.id !== u.id).slice(0, 5));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-4 text-gray-400">Loading profile…</div>;
  if (!user)
    return (
      <div className="p-4 text-gray-300">Profile not found.</div>
    );

  return (
    <div className="p-0">
      {/* Cover */}
      <div className="h-36 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800" />

      {/* Header card overlapping the cover */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="card">
          <div className="card-body">
            <div className="flex items-start gap-4">
              <div className="-mt-12">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 bg-neutral-800">
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xl font-semibold text-white">{user.name}</div>
                    <div className="text-sm text-neutral-300">{user.title}</div>
                    <div className="text-xs text-neutral-400 mt-1">{user.location || '—'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConnected((v) => !v)}
                      className={`h-9 px-4 rounded-md text-sm font-semibold ${connected ? 'bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700' : 'bg-orange-400 text-black hover:bg-orange-500'}`}
                    >
                      {connected ? 'Connected' : 'Connect'}
                    </button>
                    <button
                      onClick={() => navigate('/messages')}
                      className="h-9 px-4 rounded-md text-sm font-semibold bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700"
                    >
                      Message
                    </button>
                  </div>
                </div>
                {user.headline ? (
                  <div className="mt-3 text-sm text-neutral-300">{user.headline}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content two-column layout */}
      <div className="max-w-6xl mx-auto px-4 mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left: About + Skills */}
        <div className="space-y-6 lg:col-span-2">
          <div className="card">
            <div className="card-body">
              <h2 className="text-lg font-semibold text-white mb-3">Social</h2>
              {(() => {
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
                const social = user.social || {};
                const entries = Object.entries(social).filter(([, v]) => typeof v === 'string' && v.trim());
                if (entries.length === 0) return <div className="text-neutral-400 text-sm">No social links provided.</div>;
                return (
                  <div className="flex flex-wrap gap-2">
                    {entries.map(([key, href]) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-md bg-neutral-900 border border-white/10 text-sm text-white hover:bg-neutral-800"
                        title={labels[key] || key}
                      >
                        <span className="mr-1 align-middle">{icons[key] || '🔗'}</span>
                        <span className="align-middle">{labels[key] || key}</span>
                      </a>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="text-lg font-semibold text-white mb-2">About</h2>
              <p className="text-neutral-300 whitespace-pre-wrap">{user.about || '—'}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills?.length ? user.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-200 border border-white/10">{s}</span>
                )) : <span className="text-neutral-400 text-sm">—</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Right: People also viewed */}
        <aside className="space-y-3">
          <div className="card sticky top-20">
            <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">People also viewed</div>
            <div className="p-3 space-y-3">
              {suggestions.map((p) => (
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
              ))}
              {suggestions.length === 0 && (
                <div className="text-neutral-400 text-sm">No suggestions.</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
