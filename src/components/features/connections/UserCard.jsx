import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectButton from './ConnectButton';

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const followersCount = Number(user?.followersCount ?? user?.followers ?? 0);
  const mutualsCount = Number(
    user?.mutualsCount ?? (Array.isArray(user?.mutuals) ? user.mutuals.length : (user?.mutualConnections ?? 0)) ?? 0
  );
  const collegeName = String(user?.college || user?.education || user?.institution || 'Unknown college');
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-gray-900/40 backdrop-blur-md p-4 flex gap-4 items-start shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-50 dark:hover:bg-gray-900/60 transition-all min-h-[180px]">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-white/10"
      />
      <div className="flex-1 min-w-0">
        <button
          onClick={() => navigate(`/connections/${user.id}`)}
          className="text-lg font-semibold text-neutral-900 dark:text-white hover:underline text-left truncate"
          title={user.name}
        >
          {user.name}
        </button>
        <div className="text-sm text-neutral-700 dark:text-gray-300 truncate" title={user.title}>{user.title}</div>
        <div className="text-xs text-neutral-500 dark:text-gray-400">{user.location}</div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-white/10">
            {followersCount} followers
          </span>
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-white/10">
            {mutualsCount} mutuals
          </span>
          <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-white/10 truncate max-w-[50%]">
            {collegeName}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(user.skills?.slice(0, 3) || []).map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 dark:bg-gray-800 dark:text-gray-200 dark:border-white/10">
              {s}
            </span>
          ))}
          {Array.isArray(user.skills) && user.skills.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-gray-800 dark:text-gray-300 dark:border-white/10">
              +{user.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
      <ConnectButton userId={user.id} initialConnected={user.connected} />
    </div>
  );
}
