import React from "react";

export default function StatsSection({ profile }) {
  const stats = [
    { label: "Email", value: profile.email },
    { label: "Name", value: profile.name },
    { label: "Role", value: profile.role },
    { label: "Approved Contributor", value: profile.is_approved_contributor ? "Yes" : "No" },
    { label: "Rank", value: profile.rank ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="
            bg-white dark:bg-gray-900
            border border-gray-300 dark:border-gray-700
            rounded-xl p-5
            shadow-sm hover:shadow-md
            hover:border-orange-400/70
            transition-all duration-300
          "
        >
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase mb-1">
            {s.label}
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {s.value || "—"}
          </div>
        </div>
      ))}
    </div>
  );
}
