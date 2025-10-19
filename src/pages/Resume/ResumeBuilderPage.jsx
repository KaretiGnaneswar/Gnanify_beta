import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resumeApi } from '@/services/resume';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';

export default function ResumeBuilderPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  // Prefill from core profile on first load if empty
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await resumeApi.get(id);
        if (!mounted) return;
        let d = data;
        if (d && (!d.basics || Object.keys(d.basics).length === 0)) {
          try {
            const client = createServiceClient(config.apiBaseUrl, {
              getToken: () => localStorage.getItem('auth_token'),
            });
            const profile = await client.get('/core/profile/');
            d = {
              ...d,
              basics: {
                full_name: profile?.name || '',
                email: profile?.email || '',
                location: '',
                phone: '',
                summary: '',
                links: profile?.social || {},
              },
            };
          } catch {}
        }
        setDoc(d);
      } catch (e) {
        setError('Failed to load resume');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const update = async (patch) => {
    setSaving(true);
    const updated = await resumeApi.update(id, patch);
    setDoc(updated);
    setSaving(false);
  };

  const onChangeBasics = (field, value) => update({ basics: { ...(doc?.basics || {}), [field]: value } });

  const onDownloadPdf = async () => {
    setDownloading(true);
    try {
      // Try server-side PDF export first
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`${config.apiBaseUrl}/resume/${id}/export/`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('server_export_failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc?.title?.replace(/\s+/g, '_') || 'Resume'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return;
    } catch (e) {
      // Fallback to client print-to-PDF of the preview
      try {
        const html = previewRef.current ? previewRef.current.innerHTML : '';
        const win = window.open('', 'PRINT', 'height=900,width=700');
        if (!win) return;
        win.document.write(`<!doctype html><html><head><title>${doc?.title || 'Resume'}</title>
        <style>
          @page { size: A4; margin: 16mm; }
          body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #111; }
          .name { font-size: 24px; font-weight: 700; }
          .meta { font-size: 12px; color: #444; margin-top: 4px; }
          .summary { font-size: 13px; margin-top: 12px; white-space: pre-wrap; }
        </style></head><body>`);
        win.document.write(html);
        win.document.write('</body></html>');
        win.document.close();
        win.focus();
        win.onload = () => { win.print(); win.close(); };
      } finally {
        // swallow fallback errors silently
      }
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="p-4 text-gray-400">Loading…</div>;
  if (error) return <div className="p-4 text-red-400">{error}</div>;
  if (!doc) return <div className="p-4 text-gray-400">Not found</div>;

  return (
    <div className="p-4 grid gap-6 lg:grid-cols-3">
      {/* Forms */}
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded border border-white/10 bg-gray-900/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Basics</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={onDownloadPdf}
                disabled={downloading}
                className="h-9 w-9 flex items-center justify-center rounded bg-orange-400 text-black hover:bg-orange-500 disabled:opacity-60"
                title={downloading ? 'Preparing…' : 'Download PDF'}
                aria-label="Download PDF"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 3a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 8.707 10.293L11 12.586V4a1 1 0 0 1 1-1z"/>
                  <path d="M5 15a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1z"/>
                </svg>
              </button>
              <div className="text-xs text-gray-400">{saving ? 'Saving…' : 'Saved'}</div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Full Name</label>
              <input value={doc?.basics?.full_name || ''} onChange={(e) => onChangeBasics('full_name', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input value={doc?.basics?.email || ''} onChange={(e) => onChangeBasics('email', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Phone</label>
              <input value={doc?.basics?.phone || ''} onChange={(e) => onChangeBasics('phone', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Location</label>
              <input value={doc?.basics?.location || ''} onChange={(e) => onChangeBasics('location', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-300 mb-1">Summary</label>
              <textarea value={doc?.basics?.summary || ''} onChange={(e) => onChangeBasics('summary', e.target.value)} rows={4} className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white" />
            </div>
          </div>
        </div>

        {/* TODO: Add sections for Experience, Education, Projects, Skills with modular components */}
        <div className="rounded border border-white/10 bg-gray-900/40 p-4 text-gray-400 text-sm">More sections coming next (Experience, Education, Projects, Skills)…</div>
      </div>

      {/* Preview */}
      <aside className="space-y-3">
        <div className="text-sm text-gray-300">Live Preview ({doc.template_key})</div>
        <div ref={previewRef} className="rounded-xl border border-white/10 bg-white text-black p-6">
          <div className="name">{doc?.basics?.full_name || 'Your Name'}</div>
          <div className="meta">{doc?.basics?.email || 'email@example.com'}{doc?.basics?.phone ? ` • ${doc?.basics?.phone}` : ''}</div>
          <div className="summary">{doc?.basics?.summary || ''}</div>
        </div>
      </aside>
    </div>
  );
}
