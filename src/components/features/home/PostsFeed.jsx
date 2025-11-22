import React from 'react';
import PostCard from '@/components/features/posts/PostCard';
import PostAdCard from '@/components/features/posts/PostAdCard';
import PostHouseAdCard from '@/components/features/posts/PostHouseAdCard';

export default function PostsFeed({ posts, onLike, onDislike, onFunny, onInsightful, onRepost, onShare, onComment, onAuthorClick, onReactionsClick, currentReactions }) {
  const AD_AFTER_INDEX = 9; // after the 10th post
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Posts</h2>
      <PostAdCard title="Sponsored" slot="YOUR_SLOT_ID" />
      <PostHouseAdCard title="Gnanify Sponsored" />
      {posts.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-sm">No posts yet.</div>
      ) : (
        posts.map((p, idx) => (
          <React.Fragment key={p.id}>
            <PostCard
              post={p}
              currentReaction={currentReactions?.[p.id]}
              onLike={onLike}
              onDislike={onDislike}
              onFunny={onFunny}
              onInsightful={onInsightful}
              onRepost={onRepost}
              onShare={onShare}
              onComment={onComment}
              onAuthorClick={onAuthorClick}
              onReactionsClick={onReactionsClick}
            />
            {idx === AD_AFTER_INDEX && (
              <PostAdCard title="Sponsored" slot="YOUR_SLOT_ID" />
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
}
