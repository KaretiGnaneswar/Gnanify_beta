import React, { useEffect, useState } from 'react';
import { getConnectionStatus, sendConnectionRequest, cancelOutgoingRequest, removeConnection } from '@/services/connections';

// status: 'none' | 'pending' | 'connected'
export default function ConnectButton({ userId, initialConnected }) {
  const [status, setStatus] = useState(initialConnected ? 'connected' : 'none');
  const [loading, setLoading] = useState(false);
  const [isSelf, setIsSelf] = useState(false);

  // Initialize button state from backend connection status
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await getConnectionStatus(userId);
        setIsSelf(s?.status === 'self');
        const map = {
          connected: 'connected',
          pending_outgoing: 'pending',
          pending_incoming: 'pending',
          none: 'none',
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
    const tick = async () => {
      try {
        const s = await getConnectionStatus(userId);
        setIsSelf(s?.status === 'self');
        const next = s?.status === 'connected' ? 'connected' : (s?.status === 'none' ? 'none' : 'pending');
        if (alive && next !== status) setStatus(next);
      } catch {}
    };
    const id = setInterval(tick, 2000);
    // also do an immediate check once
    tick();
    const onFocus = () => tick();
    const onVisibility = () => { if (!document.hidden) tick(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      alive = false;
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [status, userId]);

  // Listen for global updates (e.g., when accept happens elsewhere in the UI)
  useEffect(() => {
    const handler = async () => {
      try {
        const s = await getConnectionStatus(userId);
        setIsSelf(s?.status === 'self');
        const map = { connected: 'connected', pending_outgoing: 'pending', pending_incoming: 'pending', none: 'none' };
        setStatus(map[s?.status] ?? 'none');
      } catch {}
    };
    window.addEventListener('connections:updated', handler);
    return () => window.removeEventListener('connections:updated', handler);
  }, [userId]);

  const onClick = async () => {
    // Primary button acts only in 'none' state
    if (status !== 'none') return;
    try {
      setLoading(true);
      await sendConnectionRequest(userId);
      setStatus('pending');
    } finally {
      setLoading(false);
    }
  };

  const isConnected = status === 'connected';
  const isPending = status === 'pending';

  // Hide button for own profile
  if (isSelf) return null;

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <button
          disabled
          className={`px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-white opacity-90`}
          title="Request sent"
        >
          Requested
        </button>
        <button
          onClick={async () => {
            setLoading(true);
            try {
              await cancelOutgoingRequest(userId);
              setStatus('none');
            } catch (err) {
              console.error('Cancel request failed:', err);
              // Optionally, show a light inline hint; keeping status as pending
              // You can replace this with your toast system if available
              if (typeof window !== 'undefined') {
                try { window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Unable to cancel right now.' } })); } catch {}
              }
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className={`px-3 py-1 rounded-md text-sm font-medium border border-neutral-200 text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors dark:border-white/10 dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          Cancel request
        </button>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <button
          disabled
          className={`px-3 py-1 rounded-md text-sm font-medium bg-gray-700 text-white opacity-90`}
          title="Already connected"
        >
          Connected
        </button>
        <button
          onClick={async () => {
            setLoading(true);
            try {
              await removeConnection(userId);
              setStatus('none');
            } catch (err) {
              console.error('Unconnect failed:', err);
              if (typeof window !== 'undefined') {
                try { window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Unable to unconnect right now.' } })); } catch {}
              }
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
          className={`px-3 py-1 rounded-md text-sm font-medium border border-neutral-200 text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors dark:border-white/10 dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          Unconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 bg-orange-400 text-black hover:bg-orange-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      title={'Connect'}
    >
      {loading ? 'Please wait…' : 'Connect'}
    </button>
  );
}
