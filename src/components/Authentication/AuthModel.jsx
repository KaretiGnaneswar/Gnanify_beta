import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUp";

const AuthModal = ({ onAuthSuccess, onClose }) => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (token) => {
    if (onAuthSuccess) onAuthSuccess(token);
    if (onClose) onClose();
  };

  const handleSignup = (token) => {
    if (onAuthSuccess) onAuthSuccess(token);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
      <div className="relative w-full max-w-md">
        <button
          className="absolute top-0 right-0 text-gray-300 hover:text-white font-bold text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        {showLogin ? (
          <LoginForm
            onLogin={handleLogin}
            switchToSignup={() => setShowLogin(false)}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            switchToLogin={() => setShowLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
