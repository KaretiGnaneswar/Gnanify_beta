// src/components/features/Profile/StatsSection.jsx
export default function StatsSection({ profile }) {
  const stats = [
    { label: 'Email', value: profile.email },
    { label: 'Name', value: profile.name },
    { label: 'Role', value: profile.role },
    { label: 'Approved Contributor', value: profile.is_approved_contributor ? 'Yes' : 'No' },
    { label: 'Rank', value: profile.rank ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="text-gray-400 text-sm">{s.label}</div>
          <div className="text-white font-medium">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
