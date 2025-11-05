import React, { useState } from 'react';

export default function PostComposer({ currentUser, onCreate }) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState('');

  function handlePost() {
    if (!postText.trim()) return;
    onCreate?.({ text: postText.trim(), image: postImage.trim() });
    setPostText('');
    setPostImage('');
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={currentUser?.avatarUrl || '/default-avatar.png'}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Start a post"
              className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 min-h-[72px]"
            />
            <div className="mt-2 flex items-center gap-2">
              <input
                type="url"
                value={postImage}
                onChange={(e) => setPostImage(e.target.value)}
                placeholder="Optional image URL"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              />
              <button
                onClick={handlePost}
                disabled={!postText.trim()}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  postText.trim()
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
