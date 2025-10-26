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
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="section-title">Tech News</h1>
        <div className="flex items-center gap-2">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active === t.key ? 'bg-orange-400 text-black border-orange-400' : 'bg-neutral-900 border-white/10 text-white hover:bg-neutral-800'}`}
              onClick={() => setActive(t.key)}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: main feed */}
        <div className="lg:col-span-2">
          {/* Toolbar */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-sm">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search headlines…"
                    className="inp"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {error && (
            <div className="card border-red-500/30 mt-4">
              <div className="card-body text-red-400 text-sm bg-red-950/30">{error}</div>
            </div>
          )}

          {loading ? (
            <div className="mt-4 grid gap-3">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="card-body">
                    <div className="h-4 bg-neutral-700/50 rounded w-3/4"></div>
                    <div className="mt-2 h-3 bg-neutral-700/30 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {items
                .filter(it => it.title?.toLowerCase().includes(query.toLowerCase()))
                .map(it => (
                <div key={it.id} className="card">
                  <div className="card-body flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-white font-medium hover:text-orange-300 transition-colors cursor-pointer line-clamp-2">{it.title}</div>
                      <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10">
                          <span className="text-[10px]">●</span> {it.source}
                        </span>
                        {it.points != null && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10">⬆ {it.points} points</span>
                        )}
                        {it.comments != null && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10">💬 {it.comments}</span>
                        )}
                        {it.time && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-800 border border-white/10">⏱ {timeAgo(it.time)}</span>
                        )}
                      </div>
                    </div>
                    <button
                      className="h-9 px-3 rounded-md bg-orange-400 text-black text-sm font-semibold hover:bg-orange-500 shrink-0"
                      onClick={() => { /* future: open details modal */ }}
                    >
                      Read
                    </button>
                  </div>
                </div>
              ))}
              {!error && items.filter(it => it.title?.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <div className="text-neutral-400">No results.</div>
              )}
            </div>
          )}
        </div>

        {/* Right: Trending Blogs */}
        <aside>
          <div className="card sticky top-20">
            <div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">Trending Blogs</div>
            <div className="p-3 space-y-2">
              {trending.map(tb => (
                <div key={tb.id} className="rounded-md p-3 bg-neutral-900 border border-white/10 hover:bg-neutral-800 transition-colors">
                  <div className="text-sm text-white font-medium line-clamp-2">{tb.title}</div>
                  <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-2">
                    <span>{tb.source}</span>
                    {tb.points != null && <span>• {tb.points} points</span>}
                    {tb.time && <span>• {timeAgo(tb.time)}</span>}
                  </div>
                </div>
              ))}
              {trending.length === 0 && (
                <div className="text-neutral-400 text-sm">No trending items.</div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
