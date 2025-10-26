import React from 'react';
import ConnectButton from './ConnectButton';

export default function ProfileHeader({ user }) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10"
      />
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-white truncate">{user.name}</h1>
        <div className="text-gray-300 truncate" title={user.title}>{user.title}</div>
        <div className="text-sm text-gray-400">{user.location}</div>
        <div className="mt-3">
          <ConnectButton userId={user.id} initialConnected={user.connected} />
        </div>
      </div>
    </div>
  );
}
