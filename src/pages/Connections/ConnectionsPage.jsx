import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/features/connections/SearchBar';
import { UserCard } from '@/components';
import { listConnections } from '@/services/connections.dummy';

export default function ConnectionsPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const runSearch = async () => {
    setLoading(true);
    try {
      const data = await listConnections(query);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Connections</h1>
      </div>

      <SearchBar value={query} onChange={setQuery} onSubmit={runSearch} />

      {loading ? (
        <div className="text-gray-400">Loading connections…</div>
      ) : users.length === 0 ? (
        <div className="text-gray-400">No results found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}
    </div>
  );
}
