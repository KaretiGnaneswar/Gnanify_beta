// Dummy service for Courses feature. Replace with real API calls when backend is ready.

let MOCK_COURSES = [
  {
    id: 'c_1',
    title: 'Modern React with TypeScript',
    instructor: 'Aarav Patel',
    instructorId: 'u_1',
    rating: 4.7,
    students: 12450,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&auto=format&fit=crop',
    price: 0,
    currency: 'INR',
    tags: ['React', 'TypeScript', 'Vite'],
    level: 'Beginner',
    description:
      'Learn React 18 with TypeScript, hooks, and modern tooling like Vite and ESLint. Build production-quality apps.',
    lectures: [
      {
        id: 'l_1_1',
        title: 'Welcome and Course Overview',
        duration: '06:32',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        freePreview: true,
        notesPdfUrl: 'https://arxiv.org/pdf/2107.03374.pdf',
      },
      {
        id: 'l_1_2',
        title: 'React + TS Project Setup with Vite',
        duration: '12:48',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        freePreview: true,
        notesPdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
      },
      {
        id: 'l_1_3',
        title: 'Components, Props, and State',
        duration: '15:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/2203.15556.pdf',
      },
      {
        id: 'l_1_4',
        title: 'Hooks Deep Dive: useEffect & useMemo',
        duration: '19:24',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/2005.14165.pdf',
      },
      {
        id: 'l_1_5',
        title: 'State Management Patterns',
        duration: '16:03',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/2302.13971.pdf',
      },
    ],
    assignments: [
      {
        id: 'a_1_1',
        title: 'Assignment 1: React Fundamentals',
        afterLectures: ['l_1_1', 'l_1_2'],
        description: 'Complete exercises on JSX, components, and props.',
        mcqs: [
          {
            id: 'a_1_1_q1',
            text: 'JSX stands for…',
            options: ['Java Syntax eXtension', 'JavaScript XML', 'JSON eXtended', 'JS eXperience'],
            correctIndex: 1,
          },
          {
            id: 'a_1_1_q2',
            text: 'Which hook runs after every render by default?',
            options: ['useMemo', 'useEffect', 'useRef', 'useCallback'],
            correctIndex: 1,
          },
          {
            id: 'a_1_1_q3',
            text: 'Props are…',
            options: ['Mutable inputs', 'Immutable inputs', 'Global state', 'Context only'],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'a_1_2',
        title: 'Assignment 2: Hooks & State',
        afterLectures: ['l_1_3', 'l_1_4'],
        description: 'Practice useState, useEffect, and memoization.',
        mcqs: [
          {
            id: 'a_1_2_q1',
            text: 'useMemo is used to…',
            options: ['Store DOM refs', 'Defer expensive calculations', 'Fetch data', 'Update state'],
            correctIndex: 1,
          },
          {
            id: 'a_1_2_q2',
            text: 'Which dependency array causes an effect to run only once?',
            options: ['[count]', '[]', '[props]', 'No array'],
            correctIndex: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'c_2',
    title: 'Node.js Microservices Masterclass',
    instructor: 'Karthik R',
    instructorId: 'u_3',
    rating: 4.8,
    students: 8650,
    thumbnail: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&q=80&auto=format&fit=crop',
    price: 2999,
    currency: 'INR',
    tags: ['Node.js', 'Microservices', 'Docker', 'Kafka'],
    level: 'Intermediate',
    description:
      'Design and build scalable microservices with Node.js. Includes Docker, Kafka, and best practices for production.',
    lectures: [
      {
        id: 'l_2_1',
        title: 'Introduction to Microservices',
        duration: '09:05',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        freePreview: true,
        notesPdfUrl: 'https://arxiv.org/pdf/2201.11903.pdf',
      },
      {
        id: 'l_2_2',
        title: 'Service Communication Patterns',
        duration: '18:22',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/2001.08361.pdf',
      },
      {
        id: 'l_2_3',
        title: 'Observability & Monitoring',
        duration: '14:36',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/2010.11929.pdf',
      },
    ],
    assignments: [
      {
        id: 'a_2_1',
        title: 'Assignment 1: Service Boundaries',
        afterLectures: ['l_2_1', 'l_2_2'],
        description: 'Design service boundaries and define contracts.',
        mcqs: [
          {
            id: 'a_2_1_q1',
            text: 'A microservice should be…',
            options: ['Highly coupled', 'Loosely coupled', 'Monolithic', 'Shared DB schema'],
            correctIndex: 1,
          },
          {
            id: 'a_2_1_q2',
            text: 'Which is NOT a communication pattern?',
            options: ['Request/Response', 'Pub/Sub', 'Event Sourcing', 'Cron Scheduling'],
            correctIndex: 3,
          },
        ],
      },
      {
        id: 'a_2_2',
        title: 'Assignment 2: Observability',
        afterLectures: ['l_2_3'],
        description: 'Add metrics, tracing, and logging instrumentation.',
        mcqs: [
          {
            id: 'a_2_2_q1',
            text: 'Tracing correlates…',
            options: ['API docs', 'Log lines', 'Requests across services', 'Database migrations'],
            correctIndex: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'c_3',
    title: 'Python for Data Science and ML',
    instructor: 'Neha Sharma',
    instructorId: 'u_2',
    rating: 4.6,
    students: 22340,
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80&auto=format&fit=crop',
    price: 1999,
    currency: 'INR',
    tags: ['Python', 'Pandas', 'ML'],
    level: 'Beginner',
    description:
      'Practical data science with Python. Analyze data, build ML models, and deploy them to production.',
    lectures: [
      {
        id: 'l_3_1',
        title: 'Getting Started with Python',
        duration: '07:45',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        freePreview: true,
        notesPdfUrl: 'https://arxiv.org/pdf/1810.04805.pdf',
      },
      {
        id: 'l_3_2',
        title: 'Data Analysis with Pandas',
        duration: '17:58',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        freePreview: false,
        notesPdfUrl: 'https://arxiv.org/pdf/1905.10444.pdf',
      },
    ],
    assignments: [
      {
        id: 'a_3_1',
        title: 'Assignment 1: Python Basics',
        afterLectures: ['l_3_1'],
        description: 'Practice variables, control flow, and functions.',
        mcqs: [
          {
            id: 'a_3_1_q1',
            text: 'Which is a mutable data type?',
            options: ['tuple', 'list', 'str', 'int'],
            correctIndex: 1,
          },
          {
            id: 'a_3_1_q2',
            text: 'Pandas is primarily used for…',
            options: ['Web dev', 'Data analysis', '3D graphics', 'Networking'],
            correctIndex: 1,
          },
        ],
      },
      {
        id: 'a_3_2',
        title: 'Assignment 2: DataFrames',
        afterLectures: ['l_3_2'],
        description: 'Manipulate DataFrames and perform aggregations.',
        mcqs: [
          {
            id: 'a_3_2_q1',
            text: 'To select a column you use…',
            options: ['df.column', 'df[col]', 'df.select(col)', 'df.pick(col)'],
            correctIndex: 1,
          },
        ],
      },
    ],
  }
];

export async function listCourses({ query = '', onlyFree = false } = {}) {
  await new Promise((r) => setTimeout(r, 250));
  const q = query.trim().toLowerCase();
  let arr = MOCK_COURSES;
  if (onlyFree) arr = arr.filter((c) => c.price === 0);
  if (!q) return arr;
  return arr.filter(
    (c) => c.title.toLowerCase().includes(q) || c.tags.join(' ').toLowerCase().includes(q)
  );
}

export async function getCourse(id) {
  await new Promise((r) => setTimeout(r, 150));
  return MOCK_COURSES.find((c) => c.id === id) || null;
}

export async function getLectures(courseId) {
  await new Promise((r) => setTimeout(r, 120));
  const c = MOCK_COURSES.find((x) => x.id === courseId);
  return c?.lectures || [];
}

export async function getAssignments(courseId) {
  await new Promise((r) => setTimeout(r, 100));
  const c = MOCK_COURSES.find((x) => x.id === courseId);
  return c?.assignments || [];
}

export async function enrollFree(id) {
  await new Promise((r) => setTimeout(r, 200));
  return { success: true, courseId: id };
}

export async function purchaseCourse(id) {
  await new Promise((r) => setTimeout(r, 400));
  // This would return a payment URL or success in a real app
  return { success: true, courseId: id, orderId: `order_${Date.now()}` };
}
