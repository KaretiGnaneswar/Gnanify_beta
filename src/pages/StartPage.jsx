import React, { useState } from "react";
import Navbar from "../components/StartingPage/Navbar";
import Hero from "../components/StartingPage/Hero";
import Features from "../components/StartingPage/Features";
import AboutUs from "../components/StartingPage/AboutUs";
import OurTeam from "../components/StartingPage/OurTeam";
import Footer from "../components/StartingPage/Footer";
import AuthModal from "../components/Authentication/AuthModel";
import HowItWorks from "../components/StartingPage/HowItWorks";

const StartPage = () => {
  const [showAuth, setShowAuth] = useState(false);

  const handleAuthClick = () => {
    setShowAuth(true);
  };

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  const handleAuthSuccess = (token) => {
    console.log("User logged in/signup with token:", token);
    // You can store token or redirect here
    setShowAuth(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      {/* Navbar */}
      <Navbar onLoginClick={handleAuthClick} />

      {/* Main sections */}
      <Hero />
      <Features />
      <AboutUs />
        <HowItWorks />
      <OurTeam />
      <Footer />

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onAuthSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />
      )}
    </div>
  );
};

export default StartPage;
