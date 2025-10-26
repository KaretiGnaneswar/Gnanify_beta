import { useEffect, useState } from 'react';
import { getProfile, updateSocial } from '@/services/auth';
import AvatarSection from './AvatarSection';
import BasicsSection from './BasicsSection';
import StatsSection from './StatsSection';
import SocialLinksSection from './SocialLinksSection';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getProfile();
        if (mounted) setProfile(data);
      } catch {
        if (mounted) setError('Failed to load profile');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <AvatarSection profile={profile} setProfile={setProfile} />
      <BasicsSection profile={profile} setProfile={setProfile} />
      <StatsSection profile={profile} />
      <SocialLinksSection profile={profile} setProfile={setProfile} />
    </div>
  );
}
