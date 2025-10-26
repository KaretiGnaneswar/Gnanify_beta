// Dummy service for Connections feature. Replace with real API when backend is ready.
// This module centralizes mock data and actions.

let MOCK_CONNECTIONS = [
  {
    id: 'u_1',
    name: 'Aarav Patel',
    title: 'Frontend Engineer @ PixelWorks',
    location: 'Bengaluru, IN',
    avatarUrl: 'https://i.pravatar.cc/100?img=15',
    connected: false,
    headline: 'React • TypeScript • TailwindCSS',
    about:
      'Passionate frontend engineer crafting delightful user experiences with modern web technologies. Mentor and OSS contributor.',
    skills: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Accessibility'],
    social: {
      github: 'https://github.com/aaravpatel',
      linkedin: 'https://www.linkedin.com/in/aaravpatel',
      leetcode: 'https://leetcode.com/aarav',
      codeforces: 'https://codeforces.com/profile/aarav',
      codechef: 'https://www.codechef.com/users/aarav',
      hackerrank: 'https://www.hackerrank.com/aarav',
      stackoverflow: 'https://stackoverflow.com/users/101/aarav',
      portfolio: 'https://aarav.dev',
      website: 'https://blog.aarav.dev',
      twitter: 'https://twitter.com/aarav__dev',
      medium: 'https://medium.com/@aarav',
      devto: 'https://dev.to/aarav',
    },
  },
  {
    id: 'u_2',
    name: 'Neha Sharma',
    title: 'Data Scientist @ InsightAI',
    location: 'Hyderabad, IN',
    avatarUrl: 'https://i.pravatar.cc/100?img=32',
    connected: true,
    headline: 'ML • LLMs • MLOps',
    about:
      'Building production-grade ML systems. Interested in responsible AI, evaluation, and monitoring.',
    skills: ['Python', 'PyTorch', 'LangChain', 'Kubeflow', 'Airflow'],
    social: {
      github: 'https://github.com/nehasharma',
      linkedin: 'https://www.linkedin.com/in/neha-sharma',
      leetcode: 'https://leetcode.com/neha',
      codeforces: 'https://codeforces.com/profile/neha',
      codechef: 'https://www.codechef.com/users/neha',
      hackerrank: 'https://www.hackerrank.com/neha',
      stackoverflow: 'https://stackoverflow.com/users/102/neha',
      portfolio: 'https://neha.ai',
      website: 'https://notes.neha.ai',
      twitter: 'https://twitter.com/neha__ml',
      medium: 'https://medium.com/@neha',
      devto: 'https://dev.to/neha',
    },
  },
  {
    id: 'u_3',
    name: 'Karthik R',
    title: 'Backend Engineer @ CloudForge',
    location: 'Remote',
    avatarUrl: 'https://i.pravatar.cc/100?img=5',
    connected: false,
    headline: 'Node • Postgres • Microservices',
    about:
      'Designing resilient distributed systems with a focus on observability and DX.',
    skills: ['Node.js', 'Postgres', 'Kafka', 'gRPC', 'Docker'],
    social: {
      github: 'https://github.com/karthikr',
      linkedin: 'https://www.linkedin.com/in/karthik-r',
      leetcode: 'https://leetcode.com/karthik',
      codeforces: 'https://codeforces.com/profile/karthik',
      codechef: 'https://www.codechef.com/users/karthik',
      hackerrank: 'https://www.hackerrank.com/karthik',
      stackoverflow: 'https://stackoverflow.com/users/103/karthik',
      portfolio: 'https://karthik.engineer',
      website: 'https://blog.karthik.engineer',
      twitter: 'https://twitter.com/karthik_backend',
      medium: 'https://medium.com/@karthik',
      devto: 'https://dev.to/karthik',
    },
  },
];

function shape(u) {
  if (!u) return u;
  return {
    id: u.id,
    name: u.name,
    title: u.title,
    location: u.location || '—',
    avatarUrl: u.avatarUrl,
    connected: !!u.connected,
    headline: u.headline || '',
    about: u.about || '',
    skills: Array.isArray(u.skills) ? u.skills : [],
    social: u.social || {},
  };
}

export async function listConnections(query = '') {
  await new Promise((r) => setTimeout(r, 250));
  const q = query.trim().toLowerCase();
  const src = MOCK_CONNECTIONS.map(shape);
  if (!q) return src;
  return src.filter(
    (u) => u.name.toLowerCase().includes(q) || u.title.toLowerCase().includes(q)
  );
}

export async function getProfile(id) {
  await new Promise((r) => setTimeout(r, 200));
  const u = MOCK_CONNECTIONS.find((x) => x.id === id) || null;
  return shape(u);
}

export async function connect(id) {
  await new Promise((r) => setTimeout(r, 200));
  MOCK_CONNECTIONS = MOCK_CONNECTIONS.map((u) => (u.id === id ? { ...u, connected: true } : u));
  return { success: true };
}

export async function disconnect(id) {
  await new Promise((r) => setTimeout(r, 200));
  MOCK_CONNECTIONS = MOCK_CONNECTIONS.map((u) => (u.id === id ? { ...u, connected: false } : u));
  return { success: true };
}
