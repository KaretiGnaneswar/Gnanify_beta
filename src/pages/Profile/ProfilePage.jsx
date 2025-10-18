import React, { useEffect, useState } from 'react';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    github: '', linkedin: '', leetcode: '', codeforces: '', codechef: '',
    hackerrank: '', stackoverflow: '', portfolio: '', website: '',
    twitter: '', medium: '', devto: '',
  });

  useEffect(() => {
    let mounted = true;
    const client = createServiceClient(config.apiBaseUrl, {
      getToken: () => localStorage.getItem('auth_token'),
    });
    (async () => {
      try {
        const data = await client.get('/core/profile/');
        if (mounted) {
          setProfile(data);
          const s = data?.social || {};
          setForm({
            github: s.github || '',
            linkedin: s.linkedin || '',
            leetcode: s.leetcode || '',
            codeforces: s.codeforces || '',
            codechef: s.codechef || '',
            hackerrank: s.hackerrank || '',
            stackoverflow: s.stackoverflow || '',
            portfolio: s.portfolio || '',
            website: s.website || '',
            twitter: s.twitter || '',
            medium: s.medium || '',
            devto: s.devto || '',
          });
        }
      } catch (e) {
        if (mounted) setError('Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      {profile ? (
        <>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm">Email</div>
              <div className="text-white font-medium break-all">{profile.email}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm">Name</div>
              <div className="text-white font-medium">{profile.name || '-'}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm">Role</div>
              <div className="text-white font-medium capitalize">{profile.role}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm">Approved Contributor</div>
              <div className="text-white font-medium">{profile.is_approved_contributor ? 'Yes' : 'No'}</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="text-gray-400 text-sm">Rank</div>
              <div className="text-white font-medium">{profile.rank ?? 0}</div>
            </div>
          </div>

          <div className="mt-6 max-w-4xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-white">Tech Social Links</h2>
              <button
                onClick={() => setEdit((e) => !e)}
                className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
              >
                {edit ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {!edit ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(profile.social || {}).map(([key, value]) => (
                  <div key={key} className="bg-gray-800 rounded-xl p-3 border border-gray-700">
                    <div className="text-gray-400 text-xs uppercase tracking-wider">{key}</div>
                    {value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-orange-400 hover:text-orange-300 break-all text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-gray-500 text-sm">Not provided</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <form
                className="bg-gray-900/40 border border-white/10 rounded-xl p-4 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    setSaving(true);
                    const client = createServiceClient(config.apiBaseUrl, {
                      getToken: () => localStorage.getItem('auth_token'),
                    });
                    // Only send fields with values to keep payload small
                    const payload = Object.fromEntries(
                      Object.entries(form).filter(([, v]) => typeof v === 'string')
                    );
                    const res = await client.patch('/core/profile/social/', payload);
                    const social = res?.social || {};
                    setProfile((p) => ({ ...(p || {}), social }));
                    setEdit(false);
                  } catch {
                    setError('Failed to save');
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.keys(form).map((key) => (
                    <div key={key} className="flex flex-col gap-1">
                      <label className="text-gray-400 text-xs uppercase tracking-wider" htmlFor={`f_${key}`}>{key}</label>
                      <input
                        id={`f_${key}`}
                        type="url"
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={`https://${key}.com/username`}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800/70 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={saving}
                    className="px-4 py-2 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500 disabled:opacity-60"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No profile data.</p>
      )}
    </div>
  );
}
