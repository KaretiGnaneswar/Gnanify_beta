import React, { useState } from 'react';
import ConnectButton from './ConnectButton';
import { unfollowUser } from '@/services/connections';

export default function ProfileHeader({ user }) {
  const [loading, setLoading] = useState(false);

  const onUnfollow = async () => {
    setLoading(true);
    try {
      await unfollowUser(user.id);
      if (typeof window !== 'undefined') {
        try { window.dispatchEvent(new Event('connections:updated')); } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-white/10"
      />
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white truncate">{user.name}</h1>
        <div className="text-neutral-700 dark:text-gray-300 truncate" title={user.title}>{user.title}</div>
        <div className="text-sm text-neutral-500 dark:text-gray-400">{user.location}</div>
        <div className="mt-3 flex items-center gap-2">
          <ConnectButton userId={user.id} initialConnected={user.connected} />
          {user?.connected && (
            <button
              onClick={onUnfollow}
              disabled={loading}
              className={`px-3 py-1 rounded-md text-sm font-medium border border-neutral-200 text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors dark:border-white/10 dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              title="Unfollow"
            >
              {loading ? 'Please wait…' : 'Unfollow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
