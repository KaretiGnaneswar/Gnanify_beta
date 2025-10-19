import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectButton from './ConnectButton';

export default function UserCard({ user }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-4 flex gap-4 items-start hover:bg-gray-900/60 transition-colors">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10"
      />
      <div className="flex-1 min-w-0">
        <button
          onClick={() => navigate(`/connections/${user.id}`)}
          className="text-lg font-semibold text-white hover:underline text-left truncate"
          title={user.name}
        >
          {user.name}
        </button>
        <div className="text-sm text-gray-300 truncate" title={user.title}>{user.title}</div>
        <div className="text-xs text-gray-400">{user.location}</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {user.skills?.slice(0, 5).map((s) => (
            <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-200 border border-white/10">
              {s}
            </span>
          ))}
        </div>
      </div>
      <ConnectButton userId={user.id} initialConnected={user.connected} />
    </div>
  );
}
