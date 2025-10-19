import React, { useEffect, useMemo, useState } from 'react';
import { techNewsApi } from '@/services/technews';

const tabs = [
  { key: 'trending', title: 'Trending' },
  { key: 'startups', title: 'Startups' },
  { key: 'layoffs', title: 'Layoffs' },
];

export default function TechNewsPage() {
  const [active, setActive] = useState('trending');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [trending, setTrending] = useState([]);

  const timeAgo = (iso) => {
    try {
      const then = new Date(iso).getTime();
      const diff = Math.max(0, Date.now() - then) / 1000;
      if (diff < 60) return `${Math.floor(diff)}s ago`;
      if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
      return `${Math.floor(diff/86400)}d ago`;
    } catch { return ''; }
  };

  const fetchers = useMemo(() => ({
    trending: async () => techNewsApi.trending(),
    startups: async () => techNewsApi.startups(),
    layoffs: async () => techNewsApi.layoffs(),
  }), []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchers[active]();
        if (mounted) setItems(data);
      } catch (e) {
        if (mounted) setError('Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [active, fetchers]);

  // Load sidebar trending once (dummy service)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await techNewsApi.trending();
        if (mounted) setTrending(data.slice(0, 5));
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Tech News</h1>
        <div className="flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${active === t.key ? 'bg-orange-400 text-black border-orange-400' : 'bg-gray-900/40 border-white/10 text-white hover:bg-gray-800/60'}`}
              onClick={() => setActive(t.key)}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        {/* Left: main feed */}
        <div className="lg:col-span-2">
          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 max-w-sm">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search headlines…"
                className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Content */}
          {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}

          {loading ? (
            <div className="mt-4 grid gap-3">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="rounded border border-white/10 bg-gray-900/40 p-4 animate-pulse">
                  <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="mt-2 h-3 bg-gray-700/30 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {items
                .filter(it => it.title?.toLowerCase().includes(query.toLowerCase()))
                .map(it => (
                <div
                  key={it.id}
                  className="group rounded-xl border border-white/10 bg-gray-900/40 p-4 hover:bg-gray-800/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-white font-medium group-hover:text-orange-300 transition-colors">{it.title}</div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800/70 border border-white/10">
                          <span className="text-[10px]">●</span> {it.source}
                        </span>
                        {it.points != null && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800/70 border border-white/10">⬆ {it.points} points</span>
                        )}
                        {it.comments != null && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800/70 border border-white/10">💬 {it.comments}</span>
                        )}
                        {it.time && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-800/70 border border-white/10">⏱ {timeAgo(it.time)}</span>
                        )}
                      </div>
                    </div>
                    {/* Placeholder action */}
                    <button
                      className="h-9 px-3 rounded-md bg-orange-400 text-black text-sm font-semibold hover:bg-orange-500"
                      onClick={() => { /* future: open details modal */ }}
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
              {!error && items.filter(it => it.title?.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <div className="text-gray-400">No results.</div>
              )}
            </div>
          )}
        </div>

        {/* Right: Trending Blogs */}
        <aside>
          <div className="rounded-xl border border-white/10 bg-gray-900/40">
            <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Trending Blogs</div>
            <div className="p-3 space-y-2">
              {trending.map(tb => (
                <div key={tb.id} className="rounded-md p-3 bg-gray-800/40 border border-white/10">
                  <div className="text-sm text-white font-medium line-clamp-2">{tb.title}</div>
                  <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                    <span>{tb.source}</span>
                    {tb.points != null && <span>• {tb.points} points</span>}
                    {tb.time && <span>• {timeAgo(tb.time)}</span>}
                  </div>
                </div>
              ))}
              {trending.length === 0 && (
                <div className="text-gray-400 text-sm">No trending items.</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
