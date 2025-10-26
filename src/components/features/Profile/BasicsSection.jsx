import { useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

export default function BasicsSection({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [headlineDraft, setHeadlineDraft] = useState(profile.headline || '');
  const [aboutDraft, setAboutDraft] = useState(profile.about || '');
  const [locationDraft, setLocationDraft] = useState(profile.location || '');

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">About & Basic Info</h2>
          <button onClick={() => setEdit((v) => !v)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 border border-white/10 text-white hover:bg-neutral-700">
            <FiEdit3 /> {edit ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {!edit ? (
          <div className="space-y-3">
            <div>
              <div className="text-gray-400 text-xs uppercase">Headline</div>
              <div className="text-white text-sm">{profile.headline || '—'}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase">About</div>
              <div className="text-neutral-300 whitespace-pre-wrap text-sm">{profile.about || '—'}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase">Location</div>
              <div className="text-white text-sm">{profile.location || '—'}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <input value={headlineDraft} onChange={(e) => setHeadlineDraft(e.target.value)} className="inp" placeholder="Headline" />
            <textarea value={aboutDraft} onChange={(e) => setAboutDraft(e.target.value)} className="inp" placeholder="About yourself" />
            <input value={locationDraft} onChange={(e) => setLocationDraft(e.target.value)} className="inp" placeholder="Location" />
            <div className="flex gap-2">
              <button onClick={() => { setProfile((p) => ({ ...(p || {}), headline: headlineDraft, about: aboutDraft, location: locationDraft })); setEdit(false); }} className="px-4 py-2 bg-orange-400 rounded-md text-black font-semibold">Save</button>
              <button onClick={() => setEdit(false)} className="px-4 py-2 bg-gray-700 rounded-md text-white">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

