// src/components/features/Profile/AvatarSection.jsx
import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

export default function AvatarSection({ profile, setProfile }) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');
  const [editName, setEditName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name || '');

  const handleAvatarFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      setAvatarUrl(url);
      setProfile((p) => ({ ...(p || {}), avatar_url: url }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card">
      <div className="card-body flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-gray-800">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                {String(profile.name || 'G').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center px-3 py-1.5 rounded-md bg-neutral-800 border border-white/10 text-sm text-white cursor-pointer hover:bg-neutral-700">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleAvatarFile(e.target.files?.[0])} />
              Change photo
            </label>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-white text-lg font-semibold flex items-center gap-2">
            {!editName ? (
              <>
                <span>{profile.name || '-'}</span>
                <button type="button" onClick={() => setEditName(true)} className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-neutral-800 border border-white/10 hover:bg-neutral-700">
                  <FiEdit3 className="text-neutral-300" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <input value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} className="inp" placeholder="Your name" />
                <button type="button" onClick={() => { setProfile((p) => ({ ...(p || {}), name: nameDraft })); setEditName(false); }} className="px-3 py-1.5 rounded-md bg-orange-400 text-black text-sm font-semibold hover:bg-orange-500">
                  Save
                </button>
                <button type="button" onClick={() => { setNameDraft(profile?.name || ''); setEditName(false); }} className="px-3 py-1.5 rounded-md bg-neutral-800 text-white border border-white/10 text-sm hover:bg-neutral-700">
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="text-neutral-400 break-all">{profile.email}</div>
          <div className="mt-2 text-sm text-neutral-400">{profile.role}</div>
        </div>
      </div>
    </div>
  );
}
