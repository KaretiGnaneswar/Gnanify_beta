// Dummy trending news service
// Returns a small list of tech/career headlines for the sidebar

export function listTrendingNews() {
  const now = Date.now();
  return [
    {
      id: 'n_1',
      title: 'Open-source LLMs gain enterprise adoption momentum',
      source: 'TechDaily',
      url: 'https://example.com/news/oss-llms',
      createdAt: new Date(now - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'n_2',
      title: 'Frontend 2025: React Server Components in production',
      source: 'Frontend Weekly',
      url: 'https://example.com/news/rsc-prod',
      createdAt: new Date(now - 1000 * 60 * 90).toISOString(),
    },
    {
      id: 'n_3',
      title: 'MLOps best practices: monitoring and evaluation',
      source: 'ML Monitor',
      url: 'https://example.com/news/mlops-eval',
      createdAt: new Date(now - 1000 * 60 * 160).toISOString(),
    },
    {
      id: 'n_4',
      title: 'TypeScript 6.0 beta: faster builds, improved types',
      source: 'Dev Insider',
      url: 'https://example.com/news/ts-6-beta',
      createdAt: new Date(now - 1000 * 60 * 240).toISOString(),
    },
  ];
}
