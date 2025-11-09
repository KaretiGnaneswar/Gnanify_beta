import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PostComposer from '@/components/features/posts/PostComposer';
import PostsFeed from '@/components/features/home/PostsFeed';
import LikesModal from '@/components/features/posts/LikesModal';
import { useAuth } from '@/context/AuthContext';
import {
  listPosts,
  listMyPosts,
  listPostsByAuthor,
  createPost,
  addComment,
  reactApi,
  getReactors,
} from '@/services/posts';

export default function PostsSection({
  title = 'Posts',
  source = 'all',
  showComposer = false,
}) {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [myReactions, setMyReactions] = useState({});
  const [likesOpen, setLikesOpen] = useState(false);
  const [likers, setLikers] = useState([]); // legacy single list (kept for fallback)
  const [likesLoading, setLikesLoading] = useState(false);
  const [likesTitle, setLikesTitle] = useState('Reactions');
  const [reactionsMap, setReactionsMap] = useState({ like: [], dislike: [], funny: [], insightful: [] });
  const [activeTab, setActiveTab] = useState('all');

  const header = useMemo(() => title, [title]);

  async function load() {
    try {
      setLoading(true);
      setError('');
      let data = [];
      if (source === 'all') data = await listPosts();
      else if (source === 'my') data = await listMyPosts();
      else if (source && typeof source === 'object' && source.authorId) data = await listPostsByAuthor(source.authorId);
      const list = Array.isArray(data) ? data : [];
      setPosts(list);
      // Seed current user's single reaction per post from backend `myReaction`
      const initialReactions = {};
      for (const p of list) {
        if (p && p.id) initialReactions[p.id] = p.myReaction || null;
      }
      setMyReactions(initialReactions);
    } catch {
      setError('⚠️ Failed to load posts');
    } finally {
      setLoading(false);
    }
  }

  async function onReactionsClick(postId, type) {
    try {
      setLikesLoading(true);
      // fetch all reaction lists in parallel so modal can show tabs without extra requests
      const [likes, dislikes, funny, insightful] = await Promise.all([
        getReactors(postId, 'like').catch(() => []),
        getReactors(postId, 'dislike').catch(() => []),
        getReactors(postId, 'funny').catch(() => []),
        getReactors(postId, 'insightful').catch(() => []),
      ]);
      const map = { like: likes || [], dislike: dislikes || [], funny: funny || [], insightful: insightful || [] };
      setReactionsMap(map);
      // keep single list also for backward render safety
      setLikers(map[type] || []);
      const titles = {
        like: '👍 Liked by',
        dislike: '👎 Disliked by',
        funny: '😄 Found Funny by',
        insightful: '💡 Found Insightful by',
      };
      setLikesTitle(titles[type] || 'Reactions');
      setActiveTab(type || 'all');
      setLikesOpen(true);
    } catch {
      setReactionsMap({ like: [], dislike: [], funny: [], insightful: [] });
      setLikers([]);
      setActiveTab('all');
      setLikesOpen(true);
    } finally {
      setLikesLoading(false);
    }
  }

  function onUserFromLikesClick(user) {
    const uid = user?.id;
    const cid = currentUser?.id;
    if (cid && uid && String(cid) === String(uid)) navigate('/profile');
    else if (uid) navigate(`/connections/${uid}`);
    setLikesOpen(false);
  }

  useEffect(() => {
    load();
  }, [JSON.stringify(source)]);

  async function handleCreatePost({ text, image }) {
    try {
      await createPost({ text, image });
      await load();
    } catch {}
  }

  // Optimistic reaction handler
  function applyOptimisticReaction(postId, nextReaction) {
    const prevReaction = myReactions[postId];
    setPosts((cur) =>
      cur.map((p) => {
        if (p.id !== postId) return p;
        let reactions = {
          likes: +p.likes || 0,
          dislikes: +p.dislikes || 0,
          funny: +p.funny || 0,
          insightful: +p.insightful || 0,
        };
        if (prevReaction) reactions[`${prevReaction}s`] = Math.max(0, reactions[`${prevReaction}s`] - 1);
        if (nextReaction) reactions[`${nextReaction}s`] += 1;
        return { ...p, ...reactions };
      })
    );
    setMyReactions((r) => ({ ...r, [postId]: nextReaction }));
    return prevReaction;
  }

  function revertReaction(postId, prevReaction) {
    setMyReactions((r) => ({ ...r, [postId]: prevReaction }));
  }

  async function onLike(id) {
    const prev = applyOptimisticReaction(id, 'like');
    try {
      const updated = await reactApi.like(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setMyReactions((r) => ({ ...r, [id]: updated.myReaction || 'like' }));
    } catch {
      revertReaction(id, prev);
    }
  }
  async function onDislike(id) {
    const prev = applyOptimisticReaction(id, 'dislike');
    try {
      const updated = await reactApi.dislike(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setMyReactions((r) => ({ ...r, [id]: updated.myReaction || 'dislike' }));
    } catch {
      revertReaction(id, prev);
    }
  }
  async function onFunny(id) {
    const prev = applyOptimisticReaction(id, 'funny');
    try {
      const updated = await reactApi.funny(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setMyReactions((r) => ({ ...r, [id]: updated.myReaction || 'funny' }));
    } catch {
      revertReaction(id, prev);
    }
  }
  async function onInsightful(id) {
    const prev = applyOptimisticReaction(id, 'insightful');
    try {
      const updated = await reactApi.insightful(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setMyReactions((r) => ({ ...r, [id]: updated.myReaction || 'insightful' }));
    } catch {
      revertReaction(id, prev);
    }
  }

  async function onRepost(id) {
    try {
      const updated = await reactApi.repost(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    } catch {}
  }

  async function onShare(id) {
    try {
      const updated = await reactApi.share(id);
      setPosts((cur) => cur.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    } catch {}
  }

  async function onComment(postId, text) {
    try {
      await addComment(postId, text);
      setPosts((cur) =>
        cur.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: [
                  ...(p.comments || []),
                  {
                    id: `tmp_${Date.now()}`,
                    author: {
                      name:
                        currentUser?.name ||
                        currentUser?.email ||
                        'You',
                      avatarUrl: currentUser?.avatarUrl || '',
                    },
                    text,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : p
        )
      );
    } catch {}
  }

  function onAuthorClick(author) {
    const aid = author?.id ?? author?.userId ?? author?.uid;
    const cid = currentUser?.id;
    if (cid && aid && String(cid) === String(aid)) navigate('/profile');
    else if (aid) navigate(`/connections/${aid}`);
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {header}
        </h2>
      </div>

      {/* Post Composer */}
      {showComposer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <PostComposer currentUser={currentUser} onCreate={handleCreatePost} />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-gray-100 dark:bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <PostsFeed
          posts={posts}
          currentReactions={myReactions}
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
      )}

      {/* Likes Modal */}
      <LikesModal
        isOpen={likesOpen}
        onClose={() => setLikesOpen(false)}
        reactions={reactionsMap}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onUserClick={onUserFromLikesClick}
        title={likesTitle || 'Reactions'}
      />
    </motion.div>
  );
}
