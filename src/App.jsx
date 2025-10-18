// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AppLayout from "./components/landing/RightNavbar";
// import LoginPage from "./pages/StartPage";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
//         />
//         <Route
//           path="/dashboard/*"
//           element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="*"
//           element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { AppRoutes } from "@/routes/AppRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";

const App = () => {
  const [isAuthed, setIsAuthed] = useState(() => {
    try { return !!localStorage.getItem("auth_token"); } catch { return false; }
  });

  useEffect(() => {
    const handler = () => {
      try { setIsAuthed(!!localStorage.getItem("auth_token")); } catch { setIsAuthed(false); }
    };
    window.addEventListener('storage', handler);
    window.addEventListener('auth:changed', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('auth:changed', handler);
    };
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        {isAuthed ? <AppRoutes /> : <PublicRoutes />}
      </ErrorBoundary>
    </Router>
  );
};

export default App;
