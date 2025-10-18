import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { createServiceClient } from '@/lib/api/client';
import { config } from '@/lib/config';
import ProfileHeader from '@/components/Connections/ProfileHeader';

export default function ConnectionDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewer, setViewer] = useState(null);
  const [modal, setModal] = useState({ open: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const client = createServiceClient(config.apiBaseUrl, {
          getToken: () => localStorage.getItem('auth_token'),
        });
        // Fetch viewer profile to determine reciprocity hints
        const me = await client.get('/core/profile/');
        const u = await client.get(`/connections/users/${id}/`);
        const mapped = u && {
          id: u.id,
          name: u.name || (u.email ? u.email.split('@')[0] : 'User'),
          title: u.role === 'admin' ? 'Admin' : (u.role === 'contributor' ? 'Contributor' : 'Member'),
          location: '',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(u.name || u.email || 'User')}`,
          connected: false,
          headline: '',
          about: '',
          skills: [],
          social: u.social || {},
        };
        if (mounted) {
          setUser(mapped);
          setViewer(me || null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-4 text-gray-400">Loading profile…</div>;
  if (!user)
    return (
      <div className="p-4">
        <Link to="/dashboard/connections" className="text-blue-500 hover:underline">← Back to Connections</Link>
        <div className="mt-4 text-gray-300">Profile not found.</div>
      </div>
    );

  return (
    <div className="p-4 space-y-6">
      <Link to="/dashboard/connections" className="text-blue-500 hover:underline">← Back to Connections</Link>

      <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6">
        <ProfileHeader user={user} />
      </div>

      {/* Social icon actions */}
      <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Quick Social</h2>
        <div className="flex flex-wrap gap-3">
          {(() => {
            const allowed = [
              'github','linkedin','leetcode','codeforces','codechef',
              'hackerrank','stackoverflow','portfolio','website','twitter','medium','devto',
            ];
            const labels = {
              github: 'GitHub', linkedin: 'LinkedIn', leetcode: 'LeetCode', codeforces: 'Codeforces', codechef: 'CodeChef',
              hackerrank: 'HackerRank', stackoverflow: 'Stack Overflow', portfolio: 'Portfolio', website: 'Website',
              twitter: 'Twitter', medium: 'Medium', devto: 'Dev.to',
            };
            const icons = {
              github: '🐙', linkedin: '🔗', leetcode: '🧩', codeforces: '⚙️', codechef: '🍽️',
              hackerrank: '🏆', stackoverflow: '🧠', portfolio: '🌐', website: '🕸️',
              twitter: '𝕏', medium: 'Ⓜ️', devto: 'DEV',
            };
            const their = user.social || {};
            const mine = (viewer && viewer.social) || {};

            const onIconClick = (key) => {
              const link = their[key];
              const iHave = typeof mine[key] === 'string' && mine[key].trim().length > 0;
              if (link) {
                window.open(link, '_blank', 'noopener');
              } else {
                const label = labels[key] || key;
                if (!iHave) {
                  setModal({ open: true, message: `Add your ${label} in your profile to see their ${label}.` });
                } else {
                  setModal({ open: true, message: `${label} not provided by this user.` });
                }
              }
            };

            return allowed.map((key) => (
              <button
                key={key}
                onClick={() => onIconClick(key)}
                className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-white/10 hover:bg-gray-700 transition-colors text-sm"
                title={labels[key] || key}
              >
                <span className="mr-2 align-middle">{icons[key] || '🔗'}</span>
                <span className="align-middle hidden sm:inline">{labels[key] || key}</span>
              </button>
            ));
          })()}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6">
        <h2 className="text-lg font-semibold text-white mb-2">About</h2>
        <p className="text-gray-300 whitespace-pre-wrap">{user.about}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-gray-900/40 backdrop-blur-md p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills?.map((s) => (
            <span key={s} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-200 border border-white/10">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl border border-white/10 w-96 max-w-[90vw] p-5">
            <div className="text-sm text-gray-200 mb-4">{modal.message}</div>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
                onClick={() => setModal({ open: false, message: '' })}
              >
                Close
              </button>
              <button
                className="px-3 py-1 rounded-md bg-orange-400 text-black font-semibold hover:bg-orange-500"
                onClick={() => { setModal({ open: false, message: '' }); navigate('/dashboard/profile'); }}
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
