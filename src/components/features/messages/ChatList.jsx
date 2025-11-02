import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function ChatList({
  query,
  setQuery,
  filter,
  setFilter,
  listItems,
  selectedId,
  setSelectedId,
}) {
  return (
    <div className="card md:col-span-1 overflow-hidden">
      <div className="card-body p-0">
        <div className="p-3 border-b border-neutral-200 dark:border-white/10 flex items-center gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="inp w-full pl-9"
              placeholder="Search"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                filter==='all'
                  ? 'bg-orange-400 text-black'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >All</button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-md text-sm ${
                filter==='unread'
                  ? 'bg-orange-400 text-black'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >Unread</button>
          </div>
        </div>
        <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 11rem)' }}>
          {listItems.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full text-left px-3 py-2 border-b border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${selectedId === c.id ? 'bg-neutral-100 dark:bg-neutral-900' : ''}`}
            >
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium truncate text-neutral-900 dark:text-white">{c.name}</div>
                    <div className="text-[10px] text-neutral-400 whitespace-nowrap">{new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div className="text-xs text-neutral-400 truncate">{c.last}</div>
                </div>
                {c.unread ? (
                  <span className="text-[10px] bg-orange-400 text-black font-semibold px-2 py-0.5 rounded-full">{c.unread}</span>
                ) : null}
              </div>
            </button>
          ))}
          {listItems.length === 0 && (
            <div className="p-3 text-neutral-400 text-sm">No chats found</div>
          )}
        </div>
      </div>
    </div>
  );
}
