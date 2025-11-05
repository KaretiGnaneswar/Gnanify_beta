import React from 'react';

export default function PostCard({ post, onLike, onDislike, onRepost, onShare }) {
  const p = post;
  const commentsCount = Array.isArray(p.comments) ? p.comments.length : 0;
  const likes = Number(p.likes || 0);
  const dislikes = Number(p.dislikes || 0);
  const reposts = Number(p.reposts || 0);
  const shares = Number(p.shares || 0);
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={p.author?.avatarUrl || '/default-avatar.png'}
            alt={p.author?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {p.author?.name || 'User'}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {(p.author?.title || '').toString()} {p.author?.company ? `• ${p.author.company}` : ''}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">{new Date(p.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-gray-500">•••</div>
            </div>
          </div>
        </div>

        {p.text && (
          <div className="mt-3 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {p.text}
          </div>
        )}

        {p.image && (
          <img src={p.image} alt="post" className="mt-3 w-full rounded-lg object-cover max-h-96" />
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span>👍 {likes}</span>
            <span>👎 {dislikes}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>💬 {commentsCount}</span>
            <span>🔁 {reposts}</span>
            <span>↗️ {shares}</span>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-200 dark:border-gray-800" />

        <div className="mt-1 grid grid-cols-4 gap-1">
          <button onClick={() => onLike?.(p.id)} className="py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300">Like</button>
          <button onClick={() => onDislike?.(p.id)} className="py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300">Comment</button>
          <button onClick={() => onRepost?.(p.id)} className="py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300">Repost</button>
          <button onClick={() => onShare?.(p.id)} className="py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300">Share</button>
        </div>

        {Array.isArray(p.comments) && p.comments.length > 0 && (
          <div className="mt-3 space-y-3">
            {p.comments.slice(0, 2).map((c) => (
              <div key={c.id} className="flex items-start gap-2">
                <img src={c.author?.avatarUrl || '/default-avatar.png'} alt={c.author?.name} className="w-7 h-7 rounded-full object-cover" />
                <div className="rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2">
                  <div className="text-xs font-medium text-gray-900 dark:text-white">{c.author?.name || 'User'}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{c.text}</div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))}
            {p.comments.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">View all {p.comments.length} comments</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
