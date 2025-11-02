import { useState } from "react";
import { FiEdit3, FiSave, FiX } from "react-icons/fi";
import { updateSocial } from "@/services/auth";

export default function SocialLinksSection({ profile, setProfile }) {
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(profile.social || {});

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v.trim())
      );
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
    <div className="rounded-2xl shadow-lg p-6 mt-6 bg-white/90 dark:bg-neutral-900/70 border border-neutral-200 dark:border-white/10 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-wide">
          Tech Social Links
        </h2>

        <button
          onClick={() => setEdit((v) => !v)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition"
        >
          <FiEdit3 /> {edit ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* View Mode */}
      {!edit ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(profile.social || {}).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-white/10 rounded-xl p-4 hover:border-orange-400/60 transition"
            >
              <div className="text-xs uppercase text-neutral-500 dark:text-gray-400 mb-1">
                {key}
              </div>
              {value ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-500 hover:text-orange-400 break-all text-sm font-medium transition"
                >
                  {value}
                </a>
              ) : (
                <div className="text-gray-500 text-sm italic">Not provided</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(form).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs uppercase text-neutral-500 dark:text-gray-400">
                  {key}
                </label>
                <input
                  type="url"
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  placeholder={`https://${key}.com/username`}
                  className="inp w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:from-orange-600 hover:to-orange-500 transition disabled:opacity-60"
            >
              <FiSave /> {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEdit(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
