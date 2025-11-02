import React from 'react';
import { FiPhone, FiVideo, FiInfo } from 'react-icons/fi';

export default function ChatHeader({ current, isTyping }) {
  return (
    <div className="px-4 py-3 border-b border-neutral-200 dark:border-white/10 flex items-center justify-between gap-3">
      {current ? (
        <div className="flex items-center gap-3 min-w-0">
          <img src={current.avatar} alt={current.name} className="w-9 h-9 rounded-full object-cover" />
          <div className="min-w-0">
            <div className="font-medium truncate text-neutral-900 dark:text-white">{current.name}</div>
            <div className="text-[11px] text-neutral-400">{isTyping ? 'typing…' : 'online'}</div>
          </div>
        </div>
      ) : (
        <div className="text-neutral-400 text-sm">Select a conversation</div>
      )}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Audio call"><FiPhone /></button>
        <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Video call"><FiVideo /></button>
        <button className="w-9 h-9 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/10 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center" title="Info"><FiInfo /></button>
      </div>
    </div>
  );
}
