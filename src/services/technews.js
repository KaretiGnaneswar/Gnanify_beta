// Dummy Tech News service returning static data for frontend-only prototyping.
// Replace with real API calls or backend proxy later.

const nowIso = () => new Date().toISOString();

const sampleTrending = [
  { id: 't1', title: 'OpenAI releases new multimodal model', source: 'Hacker News', points: 523, comments: 198, time: nowIso(), url: '#' },
  { id: 't2', title: 'Rust 1.82 arrives with improved tooling', source: 'Hacker News', points: 311, comments: 76, time: nowIso(), url: '#' },
  { id: 't3', title: 'Vite 6 beta boosts DX and performance', source: 'Hacker News', points: 205, comments: 44, time: nowIso(), url: '#' },
];

const sampleStartups = [
  { id: 's1', title: 'AcmeAI raises $20M to simplify LLM ops', source: 'Dev.to', comments: 12, time: nowIso(), author: 'Jane Doe', url: '#' },
  { id: 's2', title: 'EdgeDB Cloud goes GA with new features', source: 'Dev.to', comments: 8, time: nowIso(), author: 'John Roe', url: '#' },
];

const sampleLayoffs = [
  { id: 'l1', title: 'TechCorp announces restructuring and layoffs', source: 'Hacker News', points: 180, comments: 350, time: nowIso(), url: '#' },
  { id: 'l2', title: 'Fintech startup cuts 15% amid market slowdown', source: 'Hacker News', points: 120, comments: 90, time: nowIso(), url: '#' },
];

export const techNewsApi = {
  trending: async () => sampleTrending,
  startups: async () => sampleStartups,
  layoffs: async () => sampleLayoffs,
};
