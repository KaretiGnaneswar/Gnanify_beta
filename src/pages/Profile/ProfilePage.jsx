// src/pages/Profile/ProfilePage.jsx
import { useEffect, useState } from 'react';
import { getProfile } from '@/services/auth';
import AvatarSection from '@/components/features/Profile/AvatarSection';
// import BasicsSection from '@/components/features/Profile/BasicsSection';
import StatsSection from '@/components/features/Profile/StatsSection';
import ExperienceSection from '@/components/features/Profile/ExperienceSection';
import SocialLinksSection from '@/components/features/Profile/SocialLinksSection';
import ProfileContribution from '@/components/features/Profile/ProfileContribution';
import ProjectSection from '@/components/features/Profile/ProjectSextion';

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
      } catch (err) {
        console.error(err);
        if (mounted) setError('Failed to load profile. Please login.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <p className="p-4 text-gray-500 dark:text-gray-400">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-500 dark:text-red-400">{error}</p>;
  if (!profile) return <p className="p-4 text-gray-500 dark:text-gray-400">No profile data.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <AvatarSection profile={profile} setProfile={setProfile} />
      {/* <BasicsSection profile={profile} setProfile={setProfile} /> */}
      <StatsSection profile={profile} />
      <SocialLinksSection profile={profile} setProfile={setProfile} />
      <ExperienceSection profile={profile} setProfile={setProfile} />
      <ProjectSection profile={profile} setProfile={setProfile} />
      <ProfileContribution />
    </div>
  );
}
