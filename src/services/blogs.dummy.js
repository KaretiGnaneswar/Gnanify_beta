// Dummy blogs service. Replace with real API when backend is ready.

const MOCK_BLOGS = [
  {
    id: 'b_1',
    title: 'Getting Started with React 18',
    content: 'React 18 introduces concurrent rendering features, automatic batching, and more...',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&auto=format&fit=crop',
    likes_count: 24,
    comments_count: 5,
    created_at: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: 'b_2',
    title: 'TypeScript Tips for Large Codebases',
    content: 'When your app grows, strict typing, path aliases, and generics can keep sanity...',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop',
    likes_count: 42,
    comments_count: 12,
    created_at: new Date(Date.now() - 7200 * 1000).toISOString(),
  },
  {
    id: 'b_3',
    title: 'Building Microservices with Node.js',
    content: 'Designing service boundaries, communication patterns, and observability...',
    cover_image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80&auto=format&fit=crop',
    likes_count: 15,
    comments_count: 3,
    created_at: new Date(Date.now() - 86400 * 1000).toISOString(),
  },
];

export async function getBlogs() {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_BLOGS;
}
