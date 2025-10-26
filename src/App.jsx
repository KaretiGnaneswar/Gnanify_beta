import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components";
import { AppRoutes } from "@/routes/AppRoutes";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { AnalyticsListener } from "@/lib/AnalyticsListener";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const Main = () => {
  const { isAuthed } = useAuth();
  // Do not auto-redirect here; let routes handle navigation and components navigate explicitly after login
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
