import { useState } from 'react';
import { FiEdit3, FiSave, FiX } from 'react-icons/fi';

export default function BasicsSection({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [headlineDraft, setHeadlineDraft] = useState(profile.headline || '');
  const [aboutDraft, setAboutDraft] = useState(profile.about || '');
  const [locationDraft, setLocationDraft] = useState(profile.location || '');

  const handleSave = () => {
    setProfile((p) => ({
      ...(p || {}),
      headline: headlineDraft,
      about: aboutDraft,
      location: locationDraft,
    }));
    setEdit(false);
  };

  return (
    <div className="card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-wide">About & Basic Info</h2>
        <button
          onClick={() => setEdit((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-white transition"
        >
          <FiEdit3 />
          {edit ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {!edit ? (
        <div className="space-y-4 text-sm">
          <div>
            <div className="text-neutral-500 dark:text-gray-400 uppercase text-xs mb-1">Headline</div>
            <div className="text-neutral-900 dark:text-neutral-100 font-medium">
              {profile.headline || 'No headline added yet.'}
            </div>
          </div>
          <div>
            <div className="text-neutral-500 dark:text-gray-400 uppercase text-xs mb-1">About</div>
            <div className="text-neutral-700 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
              {profile.about || 'No about section added yet.'}
            </div>
          </div>
          <div>
            <div className="text-neutral-500 dark:text-gray-400 uppercase text-xs mb-1">Location</div>
            <div className="text-neutral-900 dark:text-neutral-100 font-medium">
              {profile.location || 'Not specified'}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn">
          <input
            value={headlineDraft}
            onChange={(e) => setHeadlineDraft(e.target.value)}
            placeholder="Enter your professional headline"
            className="inp"
          />
          <textarea
            value={aboutDraft}
            onChange={(e) => setAboutDraft(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            className="inp"
          />
          <input
            value={locationDraft}
            onChange={(e) => setLocationDraft(e.target.value)}
            placeholder="Your location"
            className="inp"
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-md text-white font-medium transition"
            >
              <FiSave /> Save
            </button>
            <button
              onClick={() => setEdit(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border bg-white hover:bg-neutral-100 text-neutral-900 transition dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-white/10 dark:text-white"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
