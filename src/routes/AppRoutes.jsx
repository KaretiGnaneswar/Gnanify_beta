import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/landing/RightNavbar';

const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const ResumeListPage = lazy(() => import('@/pages/Resume/ResumeListPage'));
const ResumeTemplatePicker = lazy(() => import('@/pages/Resume/ResumeTemplatePicker'));
const ResumeBuilderPage = lazy(() => import('@/pages/Resume/ResumeBuilderPage'));
const TechNewsPage = lazy(() => import('@/pages/TechNews/TechNewsPage'));
const CompilerPage = lazy(() => import('@/pages/Compiler/CompilerPage'));
const ProfilePage = lazy(() => import('@/pages/Profile/ProfilePage'));
const CoursesPage = lazy(() => import('@/pages/Courses/CoursesPage'));
const CourseDetailPage = lazy(() => import('@/pages/Courses/CourseDetailPage'));
const ConnectionsPage = lazy(() => import('@/pages/Connections/ConnectionsPage'));
const ConnectionDetailPage = lazy(() => import('@/pages/Connections/ConnectionDetailPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const BlogHomePage = lazy(() => import('@/pages/Blogs/BlogHomePage'));
const BlogIndetailPage = lazy(() => import('@/pages/Blogs/BlogIndetailPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>
        {/* Root layout for all authenticated pages */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="compiler" element={<CompilerPage />} />
          <Route path="resume">
            <Route index element={<ResumeListPage />} />
            <Route path="new" element={<ResumeTemplatePicker />} />
            <Route path=":id/edit" element={<ResumeBuilderPage />} />
          </Route>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="blogs" element={<BlogHomePage />} />
          <Route path="blogs/:id" element={<BlogIndetailPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="connections/:id" element={<ConnectionDetailPage />} />
          <Route path="technews" element={<TechNewsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback: redirect any unknown path to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
