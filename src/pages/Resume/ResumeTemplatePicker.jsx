import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeApi } from '@/services/resume';

export default function ResumeTemplatePicker() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await resumeApi.templates();
        if (mounted) setTemplates(res?.templates || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onPick = async (tpl) => {
    const created = await resumeApi.create({ title: 'Untitled Resume', template_key: tpl.key });
    navigate(`/resume/${created.id}/edit`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-3">Choose a Template</h1>
      {loading && <div className="text-gray-400">Loading…</div>}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <button key={t.key} onClick={() => onPick(t)} className="rounded border border-white/10 bg-gray-900/40 p-4 text-left hover:bg-gray-800/50">
              <div className="text-white font-medium">{t.name}</div>
              <div className="text-gray-400 text-sm mt-1">{t.desc}</div>
            </button>
          ))}
          {templates.length === 0 && <div className="text-gray-400">No templates available.</div>}
        </div>
      )}
    </div>
  );
}
