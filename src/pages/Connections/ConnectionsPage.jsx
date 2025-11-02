import React, { useEffect, useState } from 'react';
import { getUsers } from '@/services/connections';
import { UserCard } from '@/components';
import { FiUsers } from 'react-icons/fi';

export default function ConnectionsPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    
    const fetchConnections = async () => {
      try {
        const res = await getUsers();
        if (mounted) setUsers(res || []);
      } catch (err) {
        console.error('Failed to fetch connections:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchConnections();
    
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-neutral-900 dark:text-white">
          <FiUsers className="text-orange-500 dark:text-orange-400" /> My Connections
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
          {users.length} {users.length === 1 ? 'connection' : 'connections'} in your network
        </p>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl animate-pulse border bg-neutral-200/60 border-neutral-200 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 dark:border-white/10"
            />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 text-neutral-600 dark:text-neutral-400 border-2 border-dashed rounded-2xl border-neutral-300 dark:border-white/10">
          <img
            src="https://illustrations.popsy.co/gray/people-connection.svg"
            alt="no connections"
            className="w-40 opacity-70 mb-4"
          />
          <p className="text-lg font-medium text-neutral-900 dark:text-white mb-2">No connections yet</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-500 max-w-md">
            Start building your network by connecting with other professionals in your field
          </p>
          <button className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
            Find People to Connect With
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {users.map((user) => (
            <div
              key={user.id}
              className="group rounded-xl p-5 transition-all duration-300 border bg-white border-neutral-200 hover:shadow-lg hover:shadow-orange-500/10 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800 dark:border-white/10"
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}