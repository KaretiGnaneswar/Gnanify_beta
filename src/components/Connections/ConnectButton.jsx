import React, { useEffect, useState } from 'react';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';

// status: 'none' | 'pending' | 'connected'
export default function ConnectButton({ userId, initialConnected }) {
  const [status, setStatus] = useState(initialConnected ? 'connected' : 'none');
  const [loading, setLoading] = useState(false);

  // Initialize button state from backend connection status
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const client = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        const s = await client.get(`/connections/status/${userId}/`);
        const map = {
          connected: 'connected',
          pending_outgoing: 'pending',
          pending_incoming: 'pending',
          none: 'none',
          self: 'connected',
        };
        const next = map[s?.status] ?? 'none';
        if (mounted) setStatus(next);
      } catch {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [userId]);

  // When status is pending, poll periodically to see if it became connected
  useEffect(() => {
    if (status !== 'pending') return;
    let alive = true;
    const client = createServiceClient(config.apiBaseUrl, {
      getToken: () => localStorage.getItem('auth_token'),
    });
    const tick = async () => {
      try {
        const s = await client.get(`/connections/status/${userId}/`);
        const next = s?.status === 'connected' ? 'connected' : (s?.status === 'none' ? 'none' : 'pending');
        if (alive && next !== status) setStatus(next);
      } catch {}
    };
    const id = setInterval(tick, 5000);
    // also do an immediate check once
    tick();
    return () => { alive = false; clearInterval(id); };
  }, [status, userId]);

  // Listen for global updates (e.g., when accept happens elsewhere in the UI)
  useEffect(() => {
    const handler = async () => {
      try {
        const client = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        const s = await client.get(`/connections/status/${userId}/`);
        const map = { connected: 'connected', pending_outgoing: 'pending', pending_incoming: 'pending', none: 'none', self: 'connected' };
        setStatus(map[s?.status] ?? 'none');
      } catch {}
    };
    window.addEventListener('connections:updated', handler);
    return () => window.removeEventListener('connections:updated', handler);
  }, [userId]);

  const onClick = async () => {
    if (status !== 'none') return; // if pending/connected, do nothing
    try {
      setLoading(true);
      const client = createServiceClient(config.apiBaseUrl, {
        getToken: () => localStorage.getItem('auth_token'),
      });
      // Send a connection request; backend increases following_count for current user
      await client.post('/connections/requests/', { to_user_id: userId });
      setStatus('pending');
    } finally {
      setLoading(false);
    }
  };

  const isConnected = status === 'connected';
  const isPending = status === 'pending';

  return (
    <button
      onClick={onClick}
      disabled={loading || isPending || isConnected}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
        isConnected || isPending
          ? 'bg-gray-700 text-white'
          : 'bg-orange-400 text-black hover:bg-orange-500'
      } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      title={isPending ? 'Request sent' : isConnected ? 'Connected' : 'Connect'}
    >
      {loading ? 'Please wait…' : isPending ? 'Requested' : isConnected ? 'Connected' : 'Connect'}
    </button>
  );
}
