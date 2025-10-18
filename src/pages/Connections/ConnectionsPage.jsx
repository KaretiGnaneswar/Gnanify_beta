import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/Connections/SearchBar';
import UserCard from '@/components/Connections/UserCard';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';

export default function ConnectionsPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const runSearch = async () => {
    setLoading(true);
    try {
      const client = createServiceClient(config.apiBaseUrl, {
        getToken: () => localStorage.getItem('auth_token'),
      });
      const path = `/connections/users/${query ? `?q=${encodeURIComponent(query)}` : ''}`;
      const data = await client.get(path);
      const mapped = (data?.results || []).map((u) => ({
        id: u.id,
        name: u.name || (u.email ? u.email.split('@')[0] : 'User'),
        title: u.role === 'admin' ? 'Admin' : (u.role === 'contributor' ? 'Contributor' : 'Member'),
        location: '',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name || u.email || 'User')}`,
        connected: false,
        skills: [],
      }));
      setUsers(mapped);
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
