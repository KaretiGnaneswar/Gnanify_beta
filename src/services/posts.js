// Dummy posts service with localStorage persistence
// Key: gn_posts_v1

const STORAGE_KEY = 'gn_posts_v1';

function seedPosts() {
  const now = Date.now();
  return [
    {
      id: 'p_101',
      author: {
        id: 'u_2',
        name: 'Neha Sharma',
        title: 'Data Scientist @ InsightAI',
        company: 'InsightAI',
        avatarUrl: 'https://i.pravatar.cc/100?img=32',
      },
      text: 'Wrapped up a model monitoring pipeline today. Next up: adding drift alerts and dashboards!',
      image: '',
      createdAt: new Date(now - 1000 * 60 * 60 * 4).toISOString(),
      likes: 18,
      dislikes: 0,
      reposts: 2,
      shares: 3,
      comments: [
        { id: 'c_101_1', author: { name: 'Aarav Patel', avatarUrl: 'https://i.pravatar.cc/100?img=15' }, text: 'Nice! Keen to see the drift dashboards.', createdAt: new Date(now - 1000 * 60 * 30).toISOString() },
        { id: 'c_101_2', author: { name: 'Karthik R', avatarUrl: 'https://i.pravatar.cc/100?img=5' }, text: 'Monitoring saves lives in prod 😄', createdAt: new Date(now - 1000 * 60 * 20).toISOString() },
      ],
    },
    {
      id: 'p_102',
      author: {
        id: 'u_1',
        name: 'Aarav Patel',
        title: 'Frontend Engineer @ PixelWorks',
        company: 'PixelWorks',
        avatarUrl: 'https://i.pravatar.cc/100?img=15',
      },
      text: 'Migrated our app to React 18 + suspense. Performance gains are solid!',
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1200&auto=format&fit=crop',
      createdAt: new Date(now - 1000 * 60 * 60 * 20).toISOString(),
      likes: 42,
      dislikes: 1,
      reposts: 5,
      shares: 7,
      comments: [
        { id: 'c_102_1', author: { name: 'Neha Sharma', avatarUrl: 'https://i.pravatar.cc/100?img=32' }, text: 'Love the new concurrent features!', createdAt: new Date(now - 1000 * 60 * 60 * 18).toISOString() },
      ],
    },
    {
      id: 'p_103',
      author: {
        id: 'u_3',
        name: 'Karthik R',
        title: 'Backend Engineer @ CloudForge',
        company: 'CloudForge',
        avatarUrl: 'https://i.pravatar.cc/100?img=5',
      },
      text: 'Published a guide on resilient message processing with Kafka + retries + DLQs.',
      image: '',
      createdAt: new Date(now - 1000 * 60 * 60 * 36).toISOString(),
      likes: 27,
      dislikes: 0,
      reposts: 3,
      shares: 4,
      comments: [],
    },
    {
      id: 'p_104',
      author: {
        id: 'u_4',
        name: 'Priya Verma',
        title: 'ML Engineer @ VisionLabs',
        company: 'VisionLabs',
        avatarUrl: 'https://i.pravatar.cc/100?img=49',
      },
      text: 'Tried out a new data augmentation strategy for small vision datasets. Promising results!',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      createdAt: new Date(now - 1000 * 60 * 60 * 48).toISOString(),
      likes: 12,
      dislikes: 0,
      reposts: 1,
      shares: 2,
      comments: [
        { id: 'c_104_1', author: { name: 'Aarav Patel', avatarUrl: 'https://i.pravatar.cc/100?img=15' }, text: 'Curious which techniques you used!', createdAt: new Date(now - 1000 * 60 * 60 * 44).toISOString() },
      ],
    },
  ];
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStored(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr || []));
  } catch {}
}

function mergeSeed(source) {
  const seed = seedPosts();
  const map = new Map();
  [...(Array.isArray(source) ? source : []), ...seed].forEach((p) => {
    if (p && p.id) map.set(p.id, p);
  });
  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function listPosts() {
  const merged = mergeSeed(readStored());
  writeStored(merged);
  return merged;
}

export function createPost({ author, text, image }) {
  const current = listPosts();
  const post = {
    id: `p_${Date.now()}`,
    author,
    text: String(text || ''),
    image: String(image || ''),
    createdAt: new Date().toISOString(),
    likes: 0,
    dislikes: 0,
    reposts: 0,
    shares: 0,
    comments: [],
  };
  const next = [post, ...current];
  writeStored(next);
  return post;
}

function mutateCount(id, field) {
  const list = listPosts();
  const next = list.map((p) => (p.id === id ? { ...p, [field]: Number(p[field] || 0) + 1 } : p));
  writeStored(next);
  return next.find((p) => p.id === id);
}

export const reactApi = {
  like: (id) => mutateCount(id, 'likes'),
  dislike: (id) => mutateCount(id, 'dislikes'),
  repost: (id) => mutateCount(id, 'reposts'),
  share: (id) => mutateCount(id, 'shares'),
};
