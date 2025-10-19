import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { AppRoutes } from "@/routes/AppRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { AnalyticsListener } from "@/lib/AnalyticsListener";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const Main = () => {
  const { isAuthed } = useAuth();
  return isAuthed ? <AppRoutes /> : <PublicRoutes />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AnalyticsListener />
          <Main />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;
