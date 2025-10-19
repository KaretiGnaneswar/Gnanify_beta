import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeApi } from '@/services/resume';

export default function ResumeListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await resumeApi.list();
        if (mounted) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError('Failed to load resumes');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Resumes</h1>
        <button
          onClick={() => navigate('/dashboard/resume/new')}
          className="px-4 py-2 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
        >
          New Resume
        </button>
      </div>

      {loading && <div className="mt-3 text-gray-400">Loading…</div>}
      {error && <div className="mt-3 text-red-400 text-sm">{error}</div>}

      {!loading && !error && (
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <div key={r.id} className="rounded border border-white/10 bg-gray-900/40 p-4">
              <div className="text-white font-medium truncate">{r.title}</div>
              <div className="text-xs text-gray-400 mt-1">Template: {r.template_key}</div>
              <div className="text-xs text-gray-500">Updated: {r.updated_at ? new Date(r.updated_at).toLocaleString() : '-'}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => navigate(`/dashboard/resume/${r.id}/edit`)} className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Edit</button>
                <button onClick={async () => {
                  if (!confirm('Delete this resume?')) return;
                  await resumeApi.del(r.id);
                  setItems((prev) => prev.filter((x) => x.id !== r.id));
                }} className="px-3 py-1 rounded bg-red-600/20 text-red-300 border border-red-500/40 text-sm hover:bg-red-600/30">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-gray-400">No resumes yet. Click New Resume to start.</div>
          )}
        </div>
      )}
    </div>
  );
}
