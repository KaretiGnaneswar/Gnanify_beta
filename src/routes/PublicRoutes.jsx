import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from '@/pages/StartPage'

function isAuthed() {
  try { return !!localStorage.getItem('auth_token') } catch { return false }
}

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={isAuthed() ? <Navigate to="/dashboard" replace /> : <StartPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
