import { useState } from 'react';
import { FiEdit3, FiCamera, FiCheck, FiX } from 'react-icons/fi';
import { updateProfile } from '@/services/auth';
import { toast } from 'react-hot-toast';

export default function AvatarSection({ profile, setProfile }) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '');
  const [editName, setEditName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name || '');
  const [uploading, setUploading] = useState(false);

  const handleAvatarFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || '');
      setAvatarUrl(url);
      setProfile((p) => ({ ...(p || {}), avatar_url: url }));
      setUploading(false);
    };
    setUploading(true);
    reader.readAsDataURL(file);
  };

  return (
    <div className="card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Avatar */}
        <div className="relative w-28 h-28 shrink-0 group mx-auto sm:mx-0">
          <div className="w-full h-full rounded-full overflow-hidden border border-neutral-200 dark:border-white/10 shadow-lg bg-neutral-200 dark:bg-neutral-800">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-neutral-500 dark:text-neutral-300">
                {String(profile.name || 'G').charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Upload Overlay */}
          <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
            <FiCamera className="text-white text-xl mb-1" />
            <span className="text-xs text-white font-medium">
              {uploading ? 'Uploading...' : 'Change'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleAvatarFile(e.target.files?.[0])}
            />
          </label>
        </div>

        {/* Info Section */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {!editName ? (
              <>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white tracking-wide">
                  {profile.name || 'Unnamed User'}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditName(true)}
                  className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  title="Edit name"
                >
                  <FiEdit3 className="text-neutral-500 dark:text-neutral-300" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="inp !py-1.5 !px-2 text-sm w-40"
                  placeholder="Your name"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      console.log('Sending update with:', { name: nameDraft });
                      // Try sending just the name directly
                      const response = await updateProfile({ name: nameDraft });
                      console.log('Update response:', response);
                      setProfile((p) => ({ ...(p || {}), name: nameDraft }));
                      setEditName(false);
                      toast.success('Profile updated successfully');
                    } catch (error) {
                      console.error('Full error object:', error);
                      console.error('Error response data:', error.response?.data);
                      
                      // Try to extract a meaningful error message
                      let errorMessage = 'Failed to update profile';
                      if (error.response?.data) {
                        // Handle different possible error response formats
                        if (error.response.data.error) {
                          errorMessage = error.response.data.error;
                        } else if (error.response.data.message) {
                          errorMessage = error.response.data.message;
                        } else if (error.response.data.detail) {
                          errorMessage = error.response.data.detail;
                        }
                      } else if (error.message) {
                        errorMessage = error.message;
                      }
                      
                      console.error('Error updating profile:', errorMessage);
                      toast.error(errorMessage);
                    }
                  }}
                  className="p-1.5 bg-orange-500 hover:bg-orange-600 rounded-md text-white dark:text-black transition"
                  title="Save"
                  disabled={!nameDraft.trim()}
                >
                  <FiCheck size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNameDraft(profile?.name || '');
                    setEditName(false);
                  }}
                  className="p-1.5 rounded-md border bg-white hover:bg-neutral-100 text-neutral-900 transition dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-white/10 dark:text-white"
                  title="Cancel"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="mt-1 text-neutral-600 dark:text-neutral-400 text-sm break-all">
            {profile.email || 'No email provided'}
            {profile.is_verified && (
              <span className="ml-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-1.5 py-0.5 rounded">
                Verified
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 italic">
            {profile.role || 'Member'}
          </div>

          {profile.headline && (
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-sm">{profile.headline}</p>
          )}
        </div>
      </div>
    </div>
  );
}
