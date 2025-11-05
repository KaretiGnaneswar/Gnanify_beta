import React from 'react';
import PostCard from '@/components/features/posts/PostCard';

export default function PostsFeed({ posts, onLike, onDislike, onRepost, onShare }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Posts</h2>
      {posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm">No posts yet.</div>
      ) : (
        posts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onLike={onLike}
            onDislike={onDislike}
            onRepost={onRepost}
            onShare={onShare}
          />
        ))
      )}
    </div>
  );
}
