import React from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react"; // Share icon
import ConnectButton from "./ConnectButton";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const followersCount = Number(
    user?.followersCount ?? user?.followers ?? 0
  );
  const mutualsCount = Number(
    user?.mutualsCount ??
      (Array.isArray(user?.mutuals)
        ? user.mutuals.length
        : user?.mutualConnections ?? 0)
  );

  const collegeName = String(
    user?.college || user?.education || user?.institution || "Unknown college"
  );

  return (
    <div
      className="
        rounded-2xl 
        bg-white/70 dark:bg-gray-900/40 
        backdrop-blur-xl p-5 
        flex gap-5 relative
        shadow-sm
      "
    >
      {/* SHARE ICON TOP RIGHT */}
      <button
        className="
          absolute top-3 right-3 
          text-neutral-500 dark:text-neutral-300 
          hover:text-blue-600 dark:hover:text-blue-400
        "
      >
        <Share2 size={18} />
      </button>

      {/* USER IMAGE */}
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-16 h-16 rounded-full object-cover shadow-md"
      />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* NAME */}
        <button
          onClick={() => navigate(`/connections/${user.id}`)}
          className="
            text-xl font-semibold 
            text-neutral-900 dark:text-white 
            hover:underline text-left truncate
          "
        >
          {user.name}
        </button>

        <div className="text-sm text-neutral-700 dark:text-gray-300 truncate">
          {user.title}
        </div>

        <div className="text-xs text-neutral-500 dark:text-gray-400">
          {user.location}
        </div>

        {/* TAGS */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <Tag>{followersCount} followers</Tag>
          <Tag>{mutualsCount} mutuals</Tag>
          <Tag className="truncate max-w-[60%]">{collegeName}</Tag>
        </div>

        {/* SKILLS */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(user.skills?.slice(0, 3) || []).map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
          {Array.isArray(user.skills) && user.skills.length > 3 && (
            <Tag>+{user.skills.length - 3} more</Tag>
          )}
        </div>

        {/* CONNECT BUTTON AT BOTTOM */}
        <div className="mt-4">
          <ConnectButton userId={user.id} initialConnected={user.connected} />
        </div>
      </div>
    </div>
  );
}

function Tag({ children, className = "" }) {
  return (
    <span
      className={`
        px-3 py-1 rounded-full 
        bg-neutral-100/70 dark:bg-neutral-800/60 
        text-neutral-700 dark:text-neutral-300
        shadow-sm text-xs
        ${className}
      `}
    >
      {children}
    </span>
  );
}
