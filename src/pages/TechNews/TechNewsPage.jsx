import React, { useEffect, useMemo, useState } from "react";
import { techNewsApi } from "@/services/technews";

const tabs = [
  { key: "trending", title: "Trending" },
  { key: "startups", title: "Startups" },
  { key: "layoffs", title: "Layoffs" },
];

export default function TechNewsPage() {
  const [active, setActive] = useState("trending");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [trending, setTrending] = useState([]);

  const timeAgo = (iso) => {
    try {
      const then = new Date(iso).getTime();
      const diff = Math.max(0, Date.now() - then) / 1000;
      if (diff < 60) return `${Math.floor(diff)}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch {
      return "";
    }
  };

  const fetchers = useMemo(
    () => ({
      trending: async () => techNewsApi.trending(),
      startups: async () => techNewsApi.startups(),
      layoffs: async () => techNewsApi.layoffs(),
    }),
    []
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchers[active]();
        if (mounted) setItems(data);
      } catch {
        if (mounted) setError("Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [active, fetchers]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await techNewsApi.trending();
        if (mounted) setTrending(data.slice(0, 5));
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 transition-colors duration-300 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-3xl font-bold">Tech News</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                active === t.key
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-gray-100 dark:bg-neutral-900 border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-neutral-800"
              }`}
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
          <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search headlines…"
              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-700 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 mt-4 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Loading Skeleton */}
          {loading ? (
            <div className="mt-4 grid gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-neutral-900 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 grid gap-3">
              {items
                .filter((it) =>
                  it.title?.toLowerCase().includes(query.toLowerCase())
                )
                .map((it) => (
                  <div
                    key={it.id}
                    className="p-5 rounded-xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors cursor-pointer line-clamp-2">
                          {it.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700">
                            {it.source}
                          </span>
                          {it.points != null && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700">
                              ⬆ {it.points} points
                            </span>
                          )}
                          {it.comments != null && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700">
                              💬 {it.comments}
                            </span>
                          )}
                          {it.time && (
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-700">
                              ⏱ {timeAgo(it.time)}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        className="h-9 px-3 rounded-md bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 shrink-0"
                        onClick={() => {}}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                ))}
              {!error &&
                items.filter((it) =>
                  it.title?.toLowerCase().includes(query.toLowerCase())
                ).length === 0 && (
                  <div className="text-gray-500 dark:text-gray-400">
                    No results.
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Right: Trending Blogs */}
        <aside>
          <div className="sticky top-20 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-sm font-semibold">
              Trending Blogs
            </div>
            <div className="p-3 space-y-2">
              {trending.map((tb) => (
                <div
                  key={tb.id}
                  className="rounded-md p-3 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                    {tb.title}
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <span>{tb.source}</span>
                    {tb.points != null && <span>• {tb.points} points</span>}
                    {tb.time && <span>• {timeAgo(tb.time)}</span>}
                  </div>
                </div>
              ))}
              {trending.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  No trending items.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
