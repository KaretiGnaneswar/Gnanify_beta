# Gnanify - API Documentation

## 📋 **Base URL**
```
http://localhost:8000/api
```

## 🔐 **Authentication**

### Sign Up
- **POST** `/auth/signup/`
  - Create a new user account
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123",
      "first_name": "John",
      "last_name": "Doe"
    }
    ```

### Login
- **POST** `/auth/login/`
  - Authenticate and get access token
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```

## 👤 **User Profile**

### Get Profile
- **GET** `/auth/profile/`
  - Get current user's profile
  - Requires authentication

### Update Profile
- **PATCH** `/auth/profile/details/`
  - Update profile information
  - **Request Body**:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "bio": "Software Developer"
    }
    ```

### Update Social Links
- **PATCH** `/auth/profile/social/`
  - Update social media links
  - **Request Body**:
    ```json
    {
      "twitter": "https://twitter.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe"
    }
    ```

## 📚 **Courses**

### Categories
- **GET** `/courses/categories/`
  - List all course categories
  - **Query Params**: None

- **POST** `/courses/categories/`
  - Create new category (Admin only)
  - **Request Body**:
    ```json
    {
      "name": "Programming",
      "description": "Programming and software development"
    }
    ```

### Courses
- **GET** `/courses/`
  - List all courses
  - **Query Params**:
    - `category`: Filter by category ID
    - `difficulty`: Filter by difficulty level
    - `search`: Search in title and description

- **POST** `/courses/`
  - Create new course (Contributor/Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Python for Beginners",
      "description": "Learn Python from scratch",
      "category": 1,
      "difficulty": "beginner",
      "is_free": true
    }
    ```

### Course Details
- **GET** `/courses/{course_id}/`
  - Get course details

- **POST** `/courses/{course_id}/like/`
  - Like a course

- **POST** `/courses/{course_id}/dislike/`
  - Dislike a course

### Enrollment
- **POST** `/courses/{course_id}/enroll/`
  - Enroll in a course
  - Requires authentication

- **POST** `/courses/{course_id}/unenroll/`
  - Unenroll from a course
  - Requires authentication

### Lessons
- **GET** `/courses/{course_id}/lessons/`
  - List all lessons in a course

- **POST** `/courses/{course_id}/lessons/`
  - Create new lesson (Contributor/Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Introduction to Python",
      "description": "Getting started with Python",
      "order": 1
    }
    ```

### Subtopics
- **GET** `/lessons/{lesson_id}/subtopics/`
  - List all subtopics in a lesson

- **POST** `/lessons/{lesson_id}/subtopics/`
  - Create new subtopic (Contributor/Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Variables and Data Types",
      "content": "Learn about Python variables...",
      "order": 1
    }
    ```

## 📝 **Blogs**

- **GET** `/blogs/`
  - List all published blogs
  - **Query Params**:
    - `search`: Search in title and content
    - `author`: Filter by author ID

- **POST** `/blogs/`
  - Create new blog post
  - **Request Body**:
    ```json
    {
      "title": "My First Blog Post",
      "content": "This is the content...",
      "is_published": true
    }
    ```

- **GET** `/blogs/{blog_id}/`
  - Get blog post details

- **POST** `/blogs/{blog_id}/react/`
  - Like/dislike a blog post
  - **Request Body**:
    ```json
    {
      "reaction": "like"  // or "dislike"
    }
    ```

- **GET** `/blogs/{blog_id}/comments/`
  - Get comments for a blog post

- **POST** `/blogs/{blog_id}/comments/`
  - Add comment to blog post
  - **Request Body**:
    ```json
    {
      "content": "Great post!"
    }
    ```

- **DELETE** `/blogs/{blog_id}/`
  - Delete blog post (Author/Admin only)

## 🏆 **Leaderboard**

- **GET** `/leaderboard/global/`
  - Get global leaderboard
  - **Query Params**:
    - `limit`: Number of results (default: 10)

- **GET** `/leaderboard/weekly/`
  - Get weekly leaderboard

- **GET** `/leaderboard/user-ranking/`
  - Get current user's ranking
  - Requires authentication

## 🔄 **Response Formats**

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    // Additional error details
  }
}
```

## 🔒 **Authentication**
Include the JWT token in the Authorization header for protected endpoints:
```
Authorization: Bearer your.jwt.token.here
```

## 📡 **Pagination**
List endpoints support pagination:
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 10)

Example: `/api/endpoint/?page=2&page_size=5`

## 🔍 **Search & Filtering**
- Use `search` parameter for full-text search
- Filter by specific fields: `?field=value`
- Sort results: `?ordering=field` or `?ordering=-field` for descending

## 🔧 **Admin & Contributor Endpoints**

### Promote to Contributor
- **POST** `/auth/promote-contributor/{user_id}/`
  - Promote a user to contributor (Admin only)

### Create Admin
- **POST** `/auth/create-admin/`
  - Create a new admin user (Admin only)
  - **Request Body**:
    ```json
    {
      "email": "admin@example.com",
      "password": "admin123",
      "first_name": "Admin",
      "last_name": "User"
    }
    ```

### 📚 **Course APIs**
- **GET** `/api/courses/` - List all courses
- **POST** `/api/courses/` - Create new course (contributors only)
- **GET** `/api/courses/{id}/` - Get course details
- **PATCH** `/api/courses/{id}/` - Update course (contributors only)
- **DELETE** `/api/courses/{id}/` - Delete course (contributors only)

### 🤝 **Connection APIs**
- **GET** `/api/connections/` - List all users
- **GET** `/api/connections/search/` - Search users
- **POST** `/api/connections/requests/` - Send connection request
- **GET** `/api/connections/requests/incoming/` - Get incoming requests
- **GET** `/api/connections/requests/outgoing/` - Get outgoing requests
- **POST** `/api/connections/requests/{id}/accept/` - Accept request
- **POST** `/api/connections/requests/{id}/reject/` - Reject request
- **GET** `/api/connections/my/` - Get my connections
- **DELETE** `/api/connections/{id}/` - Remove connection

### 🏆 **Leaderboard APIs**
- **GET** `/api/leaderboard/` - Get full leaderboard
- **GET** `/api/leaderboard/user/{id}/` - Get user rank
- **GET** `/api/leaderboard/top/` - Get top users

## 🛠 **Updated Components**

### **Authentication Components**
- ✅ `LoginForm.jsx` - Uses real login API
- ✅ `SignUp.jsx` - Uses real signup API
- ✅ `AuthModal.jsx` - Integrated with real auth flow

### **Blog Components**
- ✅ `BlogCard.jsx` - Displays real blog data
- ✅ `CreateBlogModal.jsx` - Creates real blogs
- ✅ `BlogHomePage.jsx` - Lists real blogs
- ✅ `BlogIndetailPage.jsx` - Shows real blog details

### **Course Components**
- ✅ `CourseCard.jsx` - Displays real course data
- ✅ `CoursesPage.jsx` - Lists real courses
- ✅ `CourseDetailPage.jsx` - Shows real course details

### **Profile Components**
- ✅ `ProfilePage.jsx` - Shows real user profile
- ✅ Social links integration
- ✅ Profile updates

### **Connection Components**
- ✅ `UserCard.jsx` - Displays real user data
- ✅ `ConnectionsPage.jsx` - Lists real users
- ✅ `ConnectionDetailPage.jsx` - Shows real user profiles

## 🔧 **Service Layer**

### **Auth Service** (`/services/auth.js`)
```javascript
import { login, signup, getProfile, updateProfile, updateSocial } from '@/services/auth';
```

### **Blog Service** (`/services/blogs.js`)
```javascript
import { getBlogs, createBlog, getBlog, reactToBlog, getBlogComments, addBlogComment } from '@/services/blogs';
```

### **Course Service** (`/services/courses.js`)
```javascript
import { listCourses, getCourse, getLectures, getAssignments } from '@/services/courses';
```

### **Connection Service** (`/services/connections.js`)
```javascript
import { getUsers, searchUsers, sendConnectionRequest, getConnectionRequests, acceptConnectionRequest } from '@/services/connections';
```

### **Leaderboard Service** (`/services/leaderboard.js`)
```javascript
import { getLeaderboard, getUserRank, getTopUsers } from '@/services/leaderboard';
```

## 🎯 **Key Features Working**

### ✅ **User Authentication**
- User registration with email/password
- User login with token-based auth
- Profile management with social links
- Role-based access (user, contributor, admin)

### ✅ **Blog System**
- Create, read, update, delete blogs
- Like/dislike functionality
- Comments system
- Real-time updates

### ✅ **Course System**
- Browse all courses
- Course details with video content
- Search and filter courses
- Enrollment system (ready for implementation)

### ✅ **User Connections**
- Search and discover users
- Send/accept connection requests
- View user profiles
- Social networking features

### ✅ **Leaderboard System**
- User rankings and scores
- Top performers display
- Achievement tracking

## 🚀 **Getting Started**

### **1. Start Backend Server**
```bash
cd gnanify_backend
python manage.py runserver
```

### **2. Start Frontend Server**
```bash
cd Gnanify_beta
npm run dev
```

### **3. Test API Integration**
```javascript
import { testApiIntegration } from '@/lib/api/test';
testApiIntegration(); // Run in browser console
```

## 🔍 **API Testing**

### **Test Individual Services**
```javascript
// Test authentication
import { getProfile } from '@/services/auth';
const profile = await getProfile();

// Test blogs
import { getBlogs } from '@/services/blogs';
const blogs = await getBlogs();

// Test courses
import { listCourses } from '@/services/courses';
const courses = await listCourses();
```

### **Test API Integration**
```javascript
import { testApiIntegration } from '@/lib/api/test';
const results = await testApiIntegration();
console.log(results);
```

## 📊 **Data Flow**

1. **User Authentication** → Token stored in localStorage
2. **API Requests** → Include Bearer token in headers
3. **Data Fetching** → Real-time data from Django backend
4. **State Management** → React state with API data
5. **UI Updates** → Components render with real data

## 🎉 **What's Working Now**

- ✅ **Complete User Authentication Flow**
- ✅ **Real Blog System with CRUD Operations**
- ✅ **Course Management and Display**
- ✅ **User Connections and Networking**
- ✅ **Profile Management with Social Links**
- ✅ **Leaderboard and Rankings**
- ✅ **Search and Discovery Features**
- ✅ **Responsive Design for All Devices**
- ✅ **Error Handling and Loading States**
- ✅ **Token-based Security**

## 🔧 **Configuration**

### **Environment Variables**
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_NODE_ENV=development
```

### **API Client Configuration**
- Automatic token inclusion
- Error handling and retries
- Request/response logging
- Timeout management

## 🎯 **Next Steps**

Your Gnanify Beta is now fully functional with:
- Real user authentication
- Complete blog system
- Course management
- User connections
- Profile management
- Leaderboard system

All APIs are integrated and working with your Django backend! 🚀
