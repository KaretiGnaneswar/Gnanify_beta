import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConnectionProfile, getUsers, getConnectionStatus } from '@/services/connections';
import ConnectionHeader from '@/components/features/connections/ConnectionDetailPage/ConnectionHeader';
import SocialLinks from '@/components/features/connections/ConnectionDetailPage/SocialLinks';
import AboutSection from '@/components/features/connections/ConnectionDetailPage/AboutSection';
import SkillsSection from '@/components/features/connections/ConnectionDetailPage/SkillsSection';
import PeopleAlsoViewed from '@/components/features/connections/ConnectionDetailPage/PeopleAlsoViewed';
import PostsFeed from '@/components/features/home/PostsFeed';
import PostsSection from '@/components/features/posts/PostsSection';

export default function ConnectionDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const u = await getConnectionProfile(id);
        if (mounted) {
          setUser(u);
          // Derive connection state from backend status
          try {
            const st = await getConnectionStatus(id);
            const map = { connected: true, self: true, pending_outgoing: false, pending_incoming: false, none: false };
            setConnected(!!map[st?.status]);
          } catch {}
          const all = await getUsers();
          setSuggestions((all || []).filter((p) => p.id !== u.id).slice(0, 5));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Posts list and handlers moved to PostsSection for reuse

  if (loading) return <div className="p-4 text-neutral-600 dark:text-gray-400">Loading profile…</div>;
  if (!user) return <div className="p-4 text-neutral-600 dark:text-gray-300">Profile not found.</div>;

  return (
    <div className="p-0 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <div className="h-36 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800" />
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left column ~25% */}
          <aside className="space-y-4 lg:col-span-1">
            <ConnectionHeader user={user} connected={connected} setConnected={setConnected} />
            
          </aside>

          {/* Right column ~75% */}
          <div className="space-y-6 lg:col-span-3 mt-6 lg:mt-0">
            <SocialLinks social={user.social} />
            <AboutSection about={user.about} />
            <SkillsSection skills={user.skills} />
            <PeopleAlsoViewed suggestions={suggestions} navigate={navigate} />
            <div className="space-y-4">
              <PostsSection title={`${(user.name?.split(' ')[0] || 'User')}'s Posts`} source={{ authorId: id }} showComposer={false} />
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
