import { config } from '@/lib/config';
import * as Dummy from './courses.dummy';

// The config.apiBaseUrl already includes /api, so we don't need to add it again
const API_BASE_URL = `${config.apiBaseUrl}/courses`;

const USE_DUMMY = false;
const ENROLLED_IDS = new Set();

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

// Categories API
export const fetchCategories = async () => {
  if (USE_DUMMY) {
    return [
      { id: 'cat_general', name: 'General' },
      { id: 'cat_programming', name: 'Programming' },
      { id: 'cat_data', name: 'Data Science' }
    ];
  }
  try {
    // Updated to use the correct path: /api/courses/categories/
    const response = await fetch(`${config.apiBaseUrl}/courses/categories/`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      // First, read the response text once
      const errorText = await response.text();
      const error = new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
      error.status = response.status;
      
      // Try to parse it as JSON, if it fails, use the raw text
      try {
        error.details = JSON.parse(errorText);
      } catch (e) {
        error.details = { message: errorText };
      }
      
      console.error('API Error:', error);
      throw error;
    }
    
    // If response is ok, parse and normalize to an array
    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
};


// Courses API
export const fetchCourses = async (params = {}) => {
  if (USE_DUMMY) {
    const query = params.search || params.query || '';
    const onlyFree = params.onlyFree || false;
    let list = await Dummy.listCourses({ query, onlyFree });
    if (params.category) {
      const cat = String(params.category).toLowerCase();
      list = list.filter((c) => String(c.category_name || '').toLowerCase().includes(cat));
    }
    if (params.difficulty) {
      const d = String(params.difficulty).toLowerCase();
      list = list.filter((c) => String(c.difficulty || '').toLowerCase().includes(d));
    }
    return list.map((c) => ({
      ...c,
      is_enrolled: ENROLLED_IDS.has(c.id),
    }));
  }
  const queryParams = new URLSearchParams();
  
  // Map frontend parameters to backend parameters
  if (params.query) queryParams.append('search', params.query);
  if (params.onlyFree !== undefined) queryParams.append('is_free', params.onlyFree);
  
  // Add other parameters if needed
  if (params.category) queryParams.append('category', params.category);
  if (params.difficulty) queryParams.append('difficulty', params.difficulty);
  if (params.status) queryParams.append('status', params.status);
  
  try {
    // Backend expects /api/courses/courses/
    const response = await fetch(`${API_BASE_URL}/courses/?${queryParams}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      // First, read the response text once
      const errorText = await response.text();
      const error = new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
      error.status = response.status;
      
      // Try to parse it as JSON, if it fails, use the raw text
      try {
        error.details = JSON.parse(errorText);
      } catch (e) {
        error.details = { message: errorText };
      }
      
      console.error('API Error:', error);
      throw error;
    }
    
    // If response is ok, parse and return the JSON
    const data = await response.json();
    // Handle both the new format (data.data) and old format (direct array)
    return Array.isArray(data) ? data : (data.data || []);
  } catch (error) {
    console.error('Error in fetchCourses:', error);
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
};

export const fetchCourse = async (courseId) => {
  if (USE_DUMMY) {
    return await Dummy.getCourse(courseId);
  }
  try {
    // Backend expects /api/courses/courses/<id>/
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Failed to fetch course: ${response.status} ${response.statusText}`);
      error.status = response.status;
      
      try {
        error.details = JSON.parse(errorText);
      } catch (e) {
        error.details = { message: errorText };
      }
      
      console.error('API Error:', error);
      throw error;
    }
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error in fetchCourse:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    // Backend expects /api/courses/courses/
    const response = await fetch(`${API_BASE_URL}/courses/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Failed to create course: ${response.status} ${response.statusText}`);
      error.status = response.status;
      
      try {
        error.details = JSON.parse(errorText);
      } catch (e) {
        error.details = { message: errorText };
      }
      
      console.error('API Error:', error);
      throw error;
    }
    
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Error in createCourse:', error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(courseData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to update course');
  }
  
  return response.json();
};

// Assignments API (dummy support)
export const fetchAssignments = async (courseId) => {
  if (USE_DUMMY) {
    const list = await Dummy.getAssignments(courseId);
    return (list || []).map((a) => ({
      id: a.id,
      title: a.title,
      afterLectures: a.afterLectures || [],
      description: a.description,
      mcqs: a.mcqs || [],
    }));
  }
  // Backend path unknown yet; return [] to avoid crashes
  return [];
};
export const deleteCourse = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete course');
  }
  
  return true;
};

// Lessons API
export const fetchLessons = async (courseId) => {
  if (USE_DUMMY) {
    const lectures = await Dummy.getLectures(courseId);
    // Map dummy lectures to lessons expected by UI
    return (lectures || []).map((lec, idx) => ({
      id: lec.id,
      title: lec.title,
      description: `Lesson ${idx + 1}: ${lec.title}`,
    }));
  }
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons/`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  
  return response.json();
};

export const createLesson = async (courseId, lessonData) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(lessonData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create lesson');
  }
  
  return response.json();
};

// SubTopics API
export const fetchSubtopics = async (lessonId) => {
  if (USE_DUMMY) {
    // In dummy data, lessonId corresponds to lecture id; build a single subtopic from it
    // We need the courseId to find the lecture; since it's not provided, scan across dummy courses
    const possibleCourses = await Dummy.listCourses();
    for (const c of possibleCourses) {
      const lectures = await Dummy.getLectures(c.id);
      const match = (lectures || []).find((l) => l.id === lessonId);
      if (match) {
        return [{
          id: `${match.id}_sub1`,
          title: match.title,
          description: 'Watch the lecture and review the notes.',
          video_url: match.videoUrl,
          is_preview: !!match.freePreview,
          notes_url: match.notesPdfUrl,
        }];
      }
    }
    return [];
  }
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/subtopics/`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch subtopics');
  }
  
  return response.json();
};

export const createSubTopic = async (lessonId, subtopicData) => {
  const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/subtopics/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(subtopicData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create subtopic');
  }
  
  return response.json();
};

// Enrollment API
export const enrollInCourse = async (courseId) => {
  if (USE_DUMMY) {
    const res = await Dummy.enrollFree(courseId);
    ENROLLED_IDS.add(courseId);
    return res;
  }
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to enroll in course');
  }
  
  return response.json();
};

export const unenrollFromCourse = async (courseId) => {
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/unenroll/`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to unenroll from course');
  }
  
  return true;
};

// Like/Dislike API
export const likeCourse = async (courseId) => {
  if (USE_DUMMY) {
    return { success: true, courseId };
  }
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/like/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to like course');
  }
  
  return response.json();
};

export const dislikeCourse = async (courseId) => {
  if (USE_DUMMY) {
    return { success: true, courseId };
  }
  const response = await fetch(`${API_BASE_URL}/courses/${courseId}/dislike/`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to dislike course');
  }
  
  return response.json();
};

// Categories API
export const createCategory = async (categoryData) => {
  const response = await fetch(`${API_BASE_URL}/categories/`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create category');
  }
  
  return response.json();
};