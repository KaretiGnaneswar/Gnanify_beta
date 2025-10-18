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
  },
];

export async function listConnections(query = '') {
  await new Promise((r) => setTimeout(r, 250));
  const q = query.trim().toLowerCase();
  if (!q) return MOCK_CONNECTIONS;
  return MOCK_CONNECTIONS.filter(
    (u) => u.name.toLowerCase().includes(q) || u.title.toLowerCase().includes(q)
  );
}

export async function getProfile(id) {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_CONNECTIONS.find((u) => u.id === id) || null;
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
