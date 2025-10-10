import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/landing/RightNavbar";
import LoginPage from "./pages/StartPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <AppLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
