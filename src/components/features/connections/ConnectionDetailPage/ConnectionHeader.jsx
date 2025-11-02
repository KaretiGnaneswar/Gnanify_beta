import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectButton from '@/components/features/connections/ConnectButton';
import { useEffect, useState } from 'react';
import { getConnectionStatus } from '@/services/connections';
import IncomingActionButtons from '@/components/features/connections/IncomingActionButtons';

export default function ConnectionHeader({ user, connected, setConnected }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('none');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getConnectionStatus(user.id);
        if (alive) setStatus(res?.status || 'none');
      } catch {
        if (alive) setStatus('none');
      }
    })();
    return () => { alive = false; };
  }, [user.id]);
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-start gap-4">
          <div className="-mt-12">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 bg-neutral-800">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xl font-semibold text-white">{user.name}</div>
                <div className="text-sm text-neutral-300">{user.title}</div>
                <div className="text-xs text-neutral-400 mt-1">{user.location || '—'}</div>
              </div>
              <div className="flex items-center gap-2">
                {status === 'pending_incoming' ? (
                  <IncomingActionButtons
                    userId={user.id}
                    onDone={async () => {
                      try {
                        const res = await getConnectionStatus(user.id);
                        setStatus(res?.status || 'none');
                        if (res?.status === 'connected' && typeof setConnected === 'function') setConnected(true);
                      } catch {}
                    }}
                  />
                ) : (
                  <>
                    <ConnectButton userId={user.id} initialConnected={connected} />
                    <button
                      onClick={() => navigate(`/messages?user=${encodeURIComponent(user.id)}&name=${encodeURIComponent(user.name)}&avatar=${encodeURIComponent(user.avatarUrl || '')}`)}
                      className="h-9 px-4 rounded-md text-sm font-semibold bg-neutral-800 text-white border border-white/10 hover:bg-neutral-700"
                    >
                      Message
                    </button>
                  </>
                )}
              </div>
            </div>
            {user.headline && <div className="mt-3 text-sm text-neutral-300">{user.headline}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
