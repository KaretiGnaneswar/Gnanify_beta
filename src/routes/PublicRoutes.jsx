import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import StartPage from '@/pages/StartPage'

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
