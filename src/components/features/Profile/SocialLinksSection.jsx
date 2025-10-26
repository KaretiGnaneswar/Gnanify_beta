// src/components/features/Profile/SocialLinksSection.jsx
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { updateSocial } from '@/services/auth';

export default function SocialLinksSection({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(profile.social || {});

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = Object.fromEntries(Object.entries(form).filter(([, v]) => v.trim()));
      const res = await updateSocial(payload);
      setProfile((p) => ({ ...(p || {}), social: res.social || {} }));
      setEdit(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Tech Social Links</h2>
        <button onClick={() => setEdit((v) => !v)} className="inline-flex items-center gap-2 px-3 py-1 bg-orange-400 text-black rounded-md">
          <FiEdit3 /> {edit ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {!edit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(profile.social || {}).map(([key, value]) => (
            <div key={key} className="bg-gray-800 rounded-xl p-3 border border-gray-700">
              <div className="text-gray-400 text-xs uppercase">{key}</div>
              {value ? (
                <a href={value} target="_blank" rel="noreferrer" className="text-orange-400 hover:text-orange-300 break-all text-sm">{value}</a>
              ) : (
                <div className="text-gray-500 text-sm">Not provided</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.keys(form).map((key) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-gray-400 text-xs uppercase">{key}</label>
              <input
                type="url"
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={`https://${key}.com/username`}
                className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white"
              />
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-orange-400 rounded-md text-black">{saving ? 'Saving…' : 'Save'}</button>
            <button onClick={() => setEdit(false)} className="px-4 py-2 bg-gray-700 rounded-md text-white">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
