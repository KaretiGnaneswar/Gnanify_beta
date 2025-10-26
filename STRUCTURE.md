# Gnanify Beta - Project Structure

## 📁 Folder Organization

### `/src/components/`
Organized into logical categories for better maintainability:

#### `/ui/` - Reusable UI Components
- **`/buttons/`** - Button components (Button.jsx)
- **`/cards/`** - Card components (Card.jsx)
- **`/forms/`** - Form components (Input.jsx)
- **`/layout/`** - Layout components (Navbar, Footer, etc.)
- **`/modals/`** - Modal components (LogoutConfirmModal.jsx)

#### `/features/` - Feature-specific Components
- **`/auth/`** - Authentication components (LoginForm, SignUp, AuthModal)
- **`/blogs/`** - Blog-related components (BlogCard, CreateBlogModal)
- **`/courses/`** - Course components (CourseCard, VideoPlayer, LectureList)
- **`/connections/`** - Connection components (UserCard, ConnectButton)
- **`/compiler/`** - Compiler components (to be added)
- **`/resume/`** - Resume components (to be added)

#### `/common/` - Shared Components
- **`/error/`** - Error handling (ErrorBoundary.jsx)
- **`/loading/`** - Loading components (LoadingSpinner.jsx)
- **`/navigation/`** - Navigation components (RoleBasedNavigation.jsx)

### `/src/services/`
API service layer with proper organization:
- **`auth.js`** - Authentication API calls
- **`blogs.js`** - Blog API calls
- **`courses.js`** - Course API calls
- **`connections.js`** - Connection API calls
- **`leaderboard.js`** - Leaderboard API calls
- **`payments.razorpay.js`** - Payment processing
- **`resume.js`** - Resume API calls
- **`technews.js`** - Tech news API calls

### `/src/lib/`
Core utilities and configurations:
- **`/api/`** - API client and error handling
- **`/auth/`** - Authentication utilities
- **`config.js`** - Application configuration
- **`AnalyticsListener.jsx`** - Analytics tracking

### `/src/pages/`
Page components organized by feature:
- **`/Home/`** - HomePage.jsx
- **`/Blogs/`** - BlogHomePage.jsx, BlogIndetailPage.jsx
- **`/Courses/`** - CoursesPage.jsx, CourseDetailPage.jsx
- **`/Connections/`** - ConnectionsPage.jsx, ConnectionDetailPage.jsx
- **`/Resume/`** - ResumeListPage.jsx, ResumeBuilderPage.jsx, etc.
- **`/Profile/`** - ProfilePage.jsx
- **`/Settings/`** - SettingsPage.jsx
- **`/TechNews/`** - TechNewsPage.jsx
- **`/Compiler/`** - CompilerPage.jsx
- **`/TimeTable/`** - timetable.jsx

## 🔧 Key Features

### API Integration
- Centralized API client with error handling
- Token-based authentication
- Automatic retry logic for failed requests
- Proper error boundaries

### Component Architecture
- Reusable UI components
- Feature-based organization
- Proper TypeScript support
- Clean import/export structure

### Routing
- Protected routes for authenticated users
- Public routes for landing pages
- Lazy loading for better performance
- Nested routing structure

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create `.env.local` with:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_NODE_ENV=development
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## 📝 Component Usage

### Importing Components
```javascript
// Import from index file
import { Button, Card, Input } from '@/components';

// Or import specific components
import Button from '@/components/ui/buttons/Button';
import CourseCard from '@/components/features/courses/CourseCard';
```

### Using Services
```javascript
import { authApi, coursesApi } from '@/services';

// Authentication
const user = await authApi.login({ email, password });

// Courses
const courses = await coursesApi.list();
```

## 🔄 Backend Integration

The frontend is configured to work with the Django backend at `http://localhost:8000/api`. All API endpoints are properly configured and ready for integration.

### API Endpoints Used:
- `/auth/login/` - User login
- `/auth/signup/` - User registration
- `/auth/profile/` - User profile
- `/courses/` - Course management
- `/blogs/` - Blog management
- `/connections/` - User connections
- `/leaderboard/` - Leaderboard data

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Responsive design** for all screen sizes
- **Dark theme** support
- **Custom components** with consistent design system

## 📱 Features

- ✅ User Authentication & Authorization
- ✅ Course Management & Video Player
- ✅ Blog System with Comments
- ✅ User Connections & Networking
- ✅ Resume Builder
- ✅ Tech News Integration
- ✅ Compiler Integration
- ✅ Leaderboard System
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Loading States
