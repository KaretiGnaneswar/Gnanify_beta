import React, { useEffect, useState } from 'react';
import { acceptConnectionRequest, rejectConnectionRequest, getPendingRequestFromUser } from '@/services/connections';

export default function IncomingActionButtons({ userId, onDone }) {
  const [requestId, setRequestId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getPendingRequestFromUser(userId);
        if (!alive) return;
        setRequestId(res?.id || null);
      } catch {
        if (alive) setRequestId(null);
      }
    })();
    return () => { alive = false; };
  }, [userId]);

  if (!requestId) return null;

  const accept = async () => {
    setLoading(true);
    try {
      await acceptConnectionRequest(requestId);
      onDone?.('accepted');
    } finally {
      setLoading(false);
    }
  };

  const ignore = async () => {
    setLoading(true);
    try {
      await rejectConnectionRequest(requestId);
      onDone?.('rejected');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={accept}
        disabled={loading}
        className="h-9 px-4 rounded-md text-sm font-semibold bg-orange-400 text-black hover:bg-orange-500 disabled:opacity-60"
      >
        Accept
      </button>
      <button
        onClick={ignore}
        disabled={loading}
        className="h-9 px-4 rounded-md text-sm font-semibold bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700 disabled:opacity-60"
      >
        Ignore
      </button>
    </div>
  );
}
